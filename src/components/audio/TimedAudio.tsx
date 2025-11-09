"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface TimedAudioProps {
  src: string;              // audio file path
  start?: number;           // start time in seconds (default 0)
  end?: number;             // end time in seconds (required when loopSegment is true)
  fadeDuration?: number;    // seconds to fade in/out around loop (default 0 = no fade)
  volume?: number;          // base volume (0-1) (default 0.6)
  className?: string;       // positioning classes for the toggle button
  autoPlay?: boolean;       // attempt autoplay muted (default true)
  fixed?: boolean;          // position fixed instead of absolute
  loopSegment?: boolean;    // loop between start & end
  loop?: boolean;           // HTML audio loop for full track
}

export default function TimedAudio({
  src,
  start = 0,
  end,
  fadeDuration = 0,
  volume = 0.6,
  className,
  autoPlay = true,
  fixed = false,
  loopSegment = false,
  loop = false,
}: TimedAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafId = useRef<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Helpers
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const fadeTo = (audio: HTMLAudioElement, target: number, seconds: number) => {
    const from = clamp(audio.volume);
    const to = clamp(target);
    if (from === to || seconds <= 0) {
      audio.volume = to;
      return;
    }
    const startTime = performance.now();
    const durationMs = seconds * 1000;
    function step(now: number) {
      const t = Math.min(1, (now - startTime) / durationMs);
      audio.volume = clamp(from + (to - from) * t);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = start;
    audio.loop = !!loop && !loopSegment; // loop whole file only if not using segment loop
    audio.muted = muted;
    // For smoother intro when looping a short segment, start silent and fade in
    if (loopSegment && fadeDuration > 0) {
      audio.volume = 0;
    } else {
      audio.volume = clamp(volume);
    }
    if (autoPlay) {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          if (loopSegment && fadeDuration > 0) {
            fadeTo(audio, clamp(volume), Math.min(fadeDuration, 0.6));
          }
        })
        .catch(() => {});
    }
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, [loop, loopSegment, start, fadeDuration, volume, autoPlay]);

  // RAF-based seamless loop for short segments
  useEffect(() => {
    if (!loopSegment || end === undefined) return;
    const audio = audioRef.current;
    if (!audio) return;

    const EPS = 0.02; // ~20ms threshold for loop jump
    const tick = () => {
      const a = audioRef.current;
      if (!a) return;
      if (!a.paused) {
        // Fade out near the loop end
        if (fadeDuration > 0 && a.currentTime >= end - fadeDuration && a.currentTime < end) {
          const remaining = Math.max(0, end - a.currentTime);
          const nextVol = clamp(volume * (remaining / fadeDuration));
          a.volume = nextVol;
        }
        // Seamless jump
        if (a.currentTime >= end - EPS) {
          a.currentTime = start;
          if (fadeDuration > 0) {
            a.volume = 0;
            fadeTo(a, clamp(volume), Math.min(fadeDuration, 0.6));
          } else {
            a.volume = clamp(volume);
          }
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loopSegment, end, start, fadeDuration, volume]);

  // Fallback non-looping end handling
  useEffect(() => {
    if (loopSegment) return; // handled by RAF
    const audio = audioRef.current;
    if (!audio) return;
    const handleTime = () => {
      if (end !== undefined) {
        if (fadeDuration > 0 && audio.currentTime >= end - fadeDuration && audio.currentTime < end) {
          const remaining = Math.max(0, end - audio.currentTime);
          const nextVol = clamp(volume * (remaining / fadeDuration));
          audio.volume = nextVol;
        }
        if (audio.currentTime >= end) {
          audio.pause();
          audio.currentTime = start; // reset for potential replay
          audio.volume = clamp(volume);
          setPlaying(false);
        }
      }
    };
    audio.addEventListener("timeupdate", handleTime);
    return () => audio.removeEventListener("timeupdate", handleTime);
  }, [loopSegment, end, fadeDuration, start, volume]);

  // Stop audio on unmount (safety)
  useEffect(() => {
    // announce initial state
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('wiw-audio-mute-change', { detail: { muted } })); } catch {}
    }
    return () => {
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch {}
      }
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    if (next === false) {
      // unmuting
      audio.muted = false;
      if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {});
      setMuted(false);
    } else {
      // muting
      audio.muted = true;
      setMuted(true);
    }
    // notify listeners
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('wiw-audio-mute-change', { detail: { muted: next } })); } catch {}
    }
  };

  const basePosition = fixed ? "fixed right-4 top-20 sm:top-24 md:top-28" : "absolute right-4 top-4";
  const spinClass = !muted && playing ? "animate-[spin_4s_linear_infinite]" : "";

  return (
    <>
      <audio ref={audioRef} src={src} playsInline preload="auto" />
      <button
        onClick={toggleMute}
        className={clsx(
          basePosition,
          "z-50 h-12 w-12 rounded-full bg-foreground/80 text-background flex items-center justify-center shadow-lg ring-1 ring-foreground/20 hover:bg-foreground transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
        title={muted ? "Sound On" : "Sound Off"}
      >
        <div
          className={clsx("h-8 w-8 overflow-hidden rounded-full", spinClass)}
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)" }}
        >
          <Image
            src="/assets/images/people/main/image47.png"
            alt="Audio toggle"
            width={32}
            height={32}
            className="h-full w-full object-cover select-none pointer-events-none"
            draggable={false}
            priority={false}
          />
        </div>
      </button>
    </>
  );
}

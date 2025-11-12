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
  iconSrc?: string;         // new: custom icon path (full CD)
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
  loop = true, // default: full track loops infinitely
  iconSrc = "/assets/images/people/main/image47.png", // default full CD style logo
}: TimedAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafId = useRef<number | null>(null);
  const STORAGE_KEY = "wiw-audio-muted";
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false; // default sound ON
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });
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
    audio.loop = !!loop && !loopSegment;
    audio.muted = muted;
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
        .catch(() => {
          // Autoplay may fail if unmuted; try again on first user gesture
        });
    }
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);

    // Try resume on first user interaction if user preference is unmuted
    const tryResume = () => {
      const a = audioRef.current;
      if (!a) return;
      if (!muted && a.paused) {
        a.play().catch(() => {});
      }
      window.removeEventListener('pointerdown', tryResume);
    };
    window.addEventListener('pointerdown', tryResume, { once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      window.removeEventListener('pointerdown', tryResume);
    };
  }, [loop, loopSegment, start, fadeDuration, volume, autoPlay, muted]);

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

  // Stop audio on unmount (safety) and announce state on mount
  useEffect(() => {
    // announce current mute state
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
      try { window.localStorage.setItem(STORAGE_KEY, 'false'); } catch {}
    } else {
      // muting
      audio.muted = true;
      setMuted(true);
      try { window.localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
    }
    // notify listeners
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('wiw-audio-mute-change', { detail: { muted: next } })); } catch {}
    }
  };

  const basePosition = fixed ? "fixed right-4 top-16 md:top-20" : "absolute right-4 top-16 md:top-20";
  const spinClass = !muted && playing ? "animate-[spin_12s_linear_infinite]" : ""; // slower spin

  return (
    <>
      <audio ref={audioRef} src={src} playsInline preload="auto" />
      <button
        onClick={toggleMute}
        className={clsx(
          basePosition,
          "z-50 h-16 w-16 rounded-full bg-background/70 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg ring-1 ring-foreground/30 hover:bg-background/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
        title={muted ? "Sound On" : "Sound Off"}
      >
        <div
          className={clsx("h-14 w-14 rounded-full overflow-hidden border-2 border-foreground/20", spinClass)}
        >
          <Image
            src={iconSrc}
            alt="Audio toggle"
            width={56}
            height={56}
            className="h-full w-full object-contain select-none pointer-events-none"
            draggable={false}
            priority={false}
          />
        </div>
      </button>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
  }, []); // run once

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
    if (muted) {
      audio.muted = false;
      if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {});
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  const basePosition = fixed ? "fixed right-4 top-20 sm:top-24 md:top-28" : "absolute right-4 top-4";

  return (
    <>
      <audio ref={audioRef} src={src} playsInline preload="auto" />
      <button
        onClick={toggleMute}
        className={clsx(
          basePosition,
          "z-50 h-11 w-11 rounded-full bg-foreground/80 text-background flex items-center justify-center shadow-lg ring-1 ring-foreground/20 hover:bg-foreground transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
        title={muted ? "Sound On" : "Sound Off"}
      >
        {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        <span className="sr-only">{muted ? "Enable audio" : "Mute audio"}</span>
      </button>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface TimedAudioProps {
  src: string;
  start?: number;
  end?: number;
  fadeDuration?: number;
  volume?: number;
  className?: string;
  autoPlay?: boolean;
  fixed?: boolean;
  loopSegment?: boolean;
  loop?: boolean;
  iconSrc?: string;
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
  loop = true,
  iconSrc = "/assets/images/people/main/image47.png",
}: TimedAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafId = useRef<number | null>(null);

  // ALWAYS start unmuted (Option A)
  const [muted, setMuted] = useState<boolean>(false);
  const [playing, setPlaying] = useState(false);

  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  // -----------------------------
  // Fade handling
  // -----------------------------
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

  // -----------------------------
  // Init + ALWAYS PLAY ON REFRESH
  // -----------------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ALWAYS unmuted on mount
    audio.muted = false;
    setMuted(false);

    audio.currentTime = start;
    audio.loop = !!loop && !loopSegment;
    audio.volume =
      loopSegment && fadeDuration > 0 ? 0 : clamp(volume);

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

    // Resume after first user interaction if browser blocks autoplay
    const tryResume = () => {
      if (!audio) return;
      if (!audio.paused) return;
      audio.play().catch(() => {});
      window.removeEventListener("pointerdown", tryResume);
    };
    window.addEventListener("pointerdown", tryResume, { once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", tryResume);
    };
  }, [loop, loopSegment, start, fadeDuration, volume, autoPlay]);

  // -----------------------------
  // Seamless loop segment
  // -----------------------------
  useEffect(() => {
    if (!loopSegment || end === undefined) return;
    const audio = audioRef.current;
    if (!audio) return;

    const EPS = 0.02;

    const tick = () => {
      const a = audioRef.current;
      if (!a) return;

      if (!a.paused) {
        if (fadeDuration > 0 && a.currentTime >= end - fadeDuration) {
          const remaining = Math.max(0, end - a.currentTime);
          a.volume = clamp(volume * (remaining / fadeDuration));
        }

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

  // -----------------------------
  // Segment end fallback
  // -----------------------------
  useEffect(() => {
    if (loopSegment) return;
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => {
      if (end !== undefined) {
        if (fadeDuration > 0 && audio.currentTime >= end - fadeDuration) {
          const remaining = Math.max(0, end - audio.currentTime);
          audio.volume = clamp(volume * (remaining / fadeDuration));
        }

        if (audio.currentTime >= end) {
          audio.pause();
          audio.currentTime = start;
          audio.volume = clamp(volume);
          setPlaying(false);
        }
      }
    };

    audio.addEventListener("timeupdate", handleTime);
    return () => audio.removeEventListener("timeupdate", handleTime);
  }, [loopSegment, end, fadeDuration, start, volume]);

  // -----------------------------
  // Cleanup
  // -----------------------------
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // -----------------------------
  // Toggle mute (NO STORAGE)
  // -----------------------------
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !muted;
    setMuted(next);
    audio.muted = next;

    // If unmuting and paused → play again
    if (!next && audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // -----------------------------
  // Positioning
  // -----------------------------
  const basePosition = fixed
    ? clsx("fixed right-4 bottom-4", "md:right-4 md:top-20")
    : clsx("absolute right-4 bottom-4", "md:right-4 md:top-20");

  const spinClass =
    !muted && playing ? "animate-[spin_12s_linear_infinite]" : "";

  return (
    <>
      <audio ref={audioRef} src={src} playsInline preload="auto" />

      <button
        onClick={toggleMute}
        className={clsx(
          basePosition,
          "z-50 rounded-full bg-background/70 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg ring-1 ring-foreground/30 hover:bg-background/90 transition",
          className,
          "h-10 w-10 md:h-16 md:w-16"
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
      >
        <div
          className={clsx(
            "h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden border-2 border-foreground/20",
            spinClass
          )}
        >
          <Image
            src={iconSrc}
            alt="Audio toggle"
            width={56}
            height={56}
            className="h-full w-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </button>
    </>
  );
}

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
  const STORAGE_KEY = "wiw-audio-muted";

  // Deterministic initial value for SSR/CSR to avoid hydration mismatch
  const [muted, setMuted] = useState<boolean>(false);
  const [playing, setPlaying] = useState(false);

  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  // After mount, sync muted from localStorage and apply to audio
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const storedMuted = saved === "true";
      setMuted(storedMuted);
      if (audioRef.current) {
        audioRef.current.muted = storedMuted;
      }
      // announce current state so other hooks sync
      window.dispatchEvent(
        new CustomEvent("wiw-audio-mute-change", { detail: { muted: storedMuted } })
      );
    } catch {}
    // run once after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  // Init
  // -----------------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = start;
    audio.loop = !!loop && !loopSegment;
    audio.muted = muted;

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

    const tryResume = () => {
      if (!audio) return;
      if (!muted && audio.paused) {
        audio.play().catch(() => {});
      }
      window.removeEventListener("pointerdown", tryResume);
    };
    window.addEventListener("pointerdown", tryResume, { once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", tryResume);
    };
  }, [loop, loopSegment, start, fadeDuration, volume, autoPlay, muted]);

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
  // Basic loop fallback
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
  // Cleanup + announce
  // -----------------------------
  useEffect(() => {
    try {
      window.dispatchEvent(
        new CustomEvent("wiw-audio-mute-change", { detail: { muted } })
      );
    } catch {}

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
  // Toggle Mute
  // -----------------------------
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const next = !muted;

    if (!next) {
      audio.muted = false;
      if (audio.paused)
        audio.play().then(() => setPlaying(true)).catch(() => {});
      setMuted(false);
      window.localStorage.setItem(STORAGE_KEY, "false");
    } else {
      audio.muted = true;
      setMuted(true);
      window.localStorage.setItem(STORAGE_KEY, "true");
    }

    window.dispatchEvent(
      new CustomEvent("wiw-audio-mute-change", { detail: { muted: next } })
    );
  };

  // -----------------------------
  // Positioning
  // -----------------------------
  const basePosition = fixed
    ? clsx(
        "fixed right-4 bottom-4",        // mobile
        "md:right-4 md:top-20"         // desktop
      )
    : clsx(
        "absolute right-4 bottom-4",     // mobile
        "md:right-4 md:top-20"         // desktop
      );

  const spinClass =
    !muted && playing ? "animate-[spin_12s_linear_infinite]" : "";

  return (
    <>
      <audio ref={audioRef} src={src} playsInline preload="auto" />

      <button
        onClick={toggleMute}
        className={clsx(
          basePosition,
          "z-50 rounded-full bg-background/70 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg ring-1 ring-foreground/30 hover:bg-background/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className,
          "h-10 w-10 md:h-16 md:w-16" // ← mobile 40px, desktop 64px
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
        title={muted ? "Sound On" : "Sound Off"}
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
            className="h-full w-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </button>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";

interface TimedAudioProps {
  src: string;                    // Audio file URL
  start?: number;                 // Start time in seconds (default: 0)
  end?: number;                   // End time in seconds (optional)
  fadeDuration?: number;          // Fade in/out duration in seconds (default: 0)
  volume?: number;                // Volume level 0-1 (default: 0.6)
  className?: string;             // Additional CSS classes
  autoPlay?: boolean;             // Auto-play on mount (default: true)
  fixed?: boolean;                // Fixed positioning (default: false)
  loopSegment?: boolean;          // Loop between start/end seamlessly (default: false)
  loop?: boolean;                 // Standard audio loop (default: true)
  iconSrc?: string;               // Icon image source
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
  iconSrc = "/assets/images/people/main/image47.webp",
}: TimedAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafId = useRef<number | null>(null);
  
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Utility: Keep volume between 0 and 1
  // Utility: Keep volume between 0 and 1
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  // Smoothly fade audio volume
  const fadeTo = useCallback((audio: HTMLAudioElement, targetVolume: number, seconds: number) => {
    const fromVolume = clamp(audio.volume);
    const toVolume = clamp(targetVolume);
    
    if (fromVolume === toVolume || seconds <= 0) {
      audio.volume = toVolume;
      return;
    }

    const startTime = performance.now();
    const durationMs = seconds * 1000;

    function animate(now: number) {
      const progress = Math.min(1, (now - startTime) / durationMs);
      audio.volume = clamp(fromVolume + (toVolume - fromVolume) * progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  // Initialize audio and handle autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Setup audio properties
    audio.muted = false;
    audio.currentTime = start;
    audio.loop = loop && !loopSegment;
    audio.volume = loopSegment && fadeDuration > 0 ? 0 : clamp(volume);

    // Auto-play if enabled
    if (autoPlay) {
      audio.play()
        .then(() => {
          setPlaying(true);
          // Fade in if looping segment
          if (loopSegment && fadeDuration > 0) {
            fadeTo(audio, clamp(volume), Math.min(fadeDuration, 0.6));
          }
        })
        .catch(() => {
          // Browser blocked autoplay - wait for user interaction
        });
    }

    // Track play/pause state
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Fallback: Resume on first user interaction if autoplay was blocked
    const resumeOnInteraction = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("pointerdown", resumeOnInteraction);
    };
  }, [loop, loopSegment, start, fadeDuration, volume, autoPlay, fadeTo]);

  // Handle seamless segment looping with smooth transitions
  useEffect(() => {
    if (!loopSegment || end === undefined) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const EPSILON = 0.02; // Small buffer to prevent timing issues

    const checkLoop = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) return;

      // Fade out before end
      if (fadeDuration > 0 && audio.currentTime >= end - fadeDuration) {
        const timeLeft = Math.max(0, end - audio.currentTime);
        audio.volume = clamp(volume * (timeLeft / fadeDuration));
      }

      // Loop back to start
      if (audio.currentTime >= end - EPSILON) {
        audio.currentTime = start;

        // Fade in after loop
        if (fadeDuration > 0) {
          audio.volume = 0;
          fadeTo(audio, clamp(volume), Math.min(fadeDuration, 0.6));
        } else {
          audio.volume = clamp(volume);
        }
      }

      rafId.current = requestAnimationFrame(checkLoop);
    };

    rafId.current = requestAnimationFrame(checkLoop);
    
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loopSegment, end, start, fadeDuration, volume, fadeTo]);

  // Handle segment end without looping
  useEffect(() => {
    if (loopSegment || !end) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      // Fade out before end
      if (fadeDuration > 0 && audio.currentTime >= end - fadeDuration) {
        const timeLeft = Math.max(0, end - audio.currentTime);
        audio.volume = clamp(volume * (timeLeft / fadeDuration));
      }

      // Stop at end
      if (audio.currentTime >= end) {
        audio.pause();
        audio.currentTime = start;
        audio.volume = clamp(volume);
        setPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [loopSegment, end, fadeDuration, start, volume]);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMutedState = !muted;
    setMuted(newMutedState);
    audio.muted = newMutedState;

    // Resume playback when unmuting if paused
    if (!newMutedState && audio.paused) {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  // Button positioning
  const positionClasses = fixed
    ? "fixed right-4 bottom-4 md:right-4 md:top-20"
    : "absolute right-4 bottom-4 md:right-4 md:top-20";

  // Spin animation when playing
  const spinAnimation = !muted && playing ? "animate-[spin_12s_linear_infinite]" : "";

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={src} playsInline preload="auto" />

      {/* Visible control button */}
      <button
        onClick={toggleMute}
        className={clsx(
          positionClasses,
          "z-50 rounded-full bg-background/70 backdrop-blur-sm",
          "flex items-center justify-center shadow-lg",
          "ring-1 ring-foreground/30 hover:bg-background/90",
          "transition-colors h-10 w-10 md:h-16 md:w-16",
          className
        )}
        aria-label={muted ? "Enable audio" : "Mute audio"}
      >
        <div
          className={clsx(
            "h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden",
            "border-2 border-foreground/20",
            spinAnimation
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
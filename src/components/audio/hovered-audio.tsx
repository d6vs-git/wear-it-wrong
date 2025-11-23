"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type UtilAudioSegment = {
  id: string;                   // Unique identifier
  src: string;                  // Audio file URL
  start?: number;               // Start time in seconds
  end?: number;                 // End time in seconds
  volume?: number;              // Volume 0-1 (default: 0.5)
  loopSegment?: boolean;        // Loop between start/end
  fadeDuration?: number;        // Fade in/out duration (default: 0.4s)
};

export function useHoverUtilsAudio(segments: UtilAudioSegment[], noiseSrc: string) {
  const [muted, setMuted] = useState(true);
  const [utilHovering, setUtilHovering] = useState(false);
  
  // Audio element references
  const utilAudioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const oneshotAudioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const noiseRef = useRef<HTMLAudioElement | null>(null);
  
  // State tracking
  const utilLoopRaf = useRef<Record<string, number>>({});
  const hoverActive = useRef<Record<string, boolean>>({});
  const hoverCountRef = useRef(0);
  const interactedRef = useRef(false);

  // Utility: Clamp value between 0 and 1
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

  // Initialize: Load mute state and track user interaction
  useEffect(() => {
    // Track user interaction for autoplay
    const enableInteraction = () => {
      interactedRef.current = true;
    };
    
    window.addEventListener('pointerdown', enableInteraction, { once: true });
    window.addEventListener('keydown', enableInteraction, { once: true });
    window.addEventListener('touchstart', enableInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', enableInteraction);
      window.removeEventListener('keydown', enableInteraction);
      window.removeEventListener('touchstart', enableInteraction);
    };
  }, []);

  // Preload segment audio files
  useEffect(() => {
    segments.forEach(seg => {
      if (!utilAudioRefs.current[seg.id]) {
        const audio = new Audio(seg.src);
        audio.preload = 'auto';
        audio.loop = false;
        audio.volume = seg.volume ?? 0.5;
        audio.muted = muted;
        audio.addEventListener('error', () => {
          console.error('[hover-audio] Failed to load:', seg.id, seg.src);
        });
        utilAudioRefs.current[seg.id] = audio;
      }
    });

    const loopRaf = utilLoopRaf.current;
    return () => {
      Object.values(loopRaf).forEach(id => cancelAnimationFrame(id));
    };
  }, [segments, muted]);

  // Listen for global mute changes (from TimedAudio or other components)
  useEffect(() => {
    const handleMuteChange = (e: CustomEvent) => {
      if (typeof e.detail?.muted === 'boolean') {
        setMuted(e.detail.muted);
      }
    };

    window.addEventListener('wiw-audio-mute-change', handleMuteChange as EventListener);
    return () => {
      window.removeEventListener('wiw-audio-mute-change', handleMuteChange as EventListener);
    };
  }, []);

  // Apply mute state to all audio elements
  useEffect(() => {
    Object.values(utilAudioRefs.current).forEach(audio => {
      audio.muted = muted;
      if (muted) {
        audio.pause();
      }
    });
  }, [muted]);

  // Control background noise based on hover state
  useEffect(() => {
    const noise = noiseRef.current;
    if (!noise) return;

    noise.loop = true;
    const NOISE_VOLUME = 0.12;

    if (!utilHovering || muted) {
      fadeTo(noise, 0, 0.25);
      const timeoutId = setTimeout(() => {
        if (noise.volume === 0) noise.pause();
      }, 280);
      return () => clearTimeout(timeoutId);
    } else {
      noise.muted = false;
      if (noise.paused) {
        noise.play().catch(() => {});
      }
      fadeTo(noise, NOISE_VOLUME, 0.4);
    }
  }, [utilHovering, muted, fadeTo]);

  // Handle seamless segment looping
  const ensureTick = useCallback((id: string, seg: UtilAudioSegment, audio: HTMLAudioElement) => {
    if (!seg.loopSegment || seg.end === undefined) return;

    const { start = 0, end, fadeDuration = 0.4, volume = 0.5 } = seg;

    const tick = () => {
      if (!hoverActive.current[id]) return;
      if (audio.paused) {
        utilLoopRaf.current[id] = requestAnimationFrame(tick);
        return;
      }

      const currentTime = audio.currentTime;

      // Guard lower bound
      if (currentTime < start) {
        audio.currentTime = start;
      }

      // Fade out near end
      if (fadeDuration > 0 && currentTime >= end - fadeDuration && currentTime < end) {
        const timeLeft = Math.max(0, end - currentTime);
        audio.volume = clamp(volume * (timeLeft / fadeDuration));
      }

      // Loop back to start
      if (currentTime >= end - 0.02) {
        audio.currentTime = start;
        audio.volume = volume;
        audio.play().catch(() => {});
      }

      utilLoopRaf.current[id] = requestAnimationFrame(tick);
    };

    if (utilLoopRaf.current[id]) {
      cancelAnimationFrame(utilLoopRaf.current[id]);
    }
    utilLoopRaf.current[id] = requestAnimationFrame(tick);
  }, []);

  // Start playing a segment audio
  const startUtil = useCallback((id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;

    const audio = utilAudioRefs.current[id];
    if (!audio || muted) return;

    interactedRef.current = true;
    hoverActive.current[id] = true;

    if (utilLoopRaf.current[id]) {
      cancelAnimationFrame(utilLoopRaf.current[id]);
    }

    const baseVolume = seg.volume ?? 0.5;
    const startTime = seg.start ?? 0;

    audio.currentTime = startTime;
    audio.muted = false;

    if (seg.loopSegment) {
      // Looping segment: fade in
      audio.volume = 0;
      audio.play()
        .then(() => {
          fadeTo(audio, baseVolume, Math.max(seg.fadeDuration ?? 0.6, 0.4));
        })
        .catch(() => {
          // Autoplay blocked - retry on interaction
          const retry = () => {
            audio.play()
              .then(() => fadeTo(audio, baseVolume, Math.max(seg.fadeDuration ?? 0.6, 0.4)))
              .catch(() => {});
          };
          window.addEventListener('pointerdown', retry, { once: true });
        });
      ensureTick(id, seg, audio);
    } else {
      // One-shot: play once
      audio.volume = baseVolume;
      audio.play().catch(() => {});
    }

    setUtilHovering(true);
  }, [segments, muted, fadeTo, ensureTick]);

  // Stop playing a segment audio
  const stopUtil = useCallback((id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;

    const audio = utilAudioRefs.current[id];
    if (!audio) return;

    hoverActive.current[id] = false;

    if (utilLoopRaf.current[id]) {
      cancelAnimationFrame(utilLoopRaf.current[id]);
    }

    const baseVolume = seg.volume ?? 0.5;
    const startTime = seg.start ?? 0;

    if (seg.loopSegment) {
      // Fade out then stop
      const fadeDuration = Math.max(seg.fadeDuration ?? 0.5, 0.3);
      fadeTo(audio, 0, fadeDuration);
      setTimeout(() => {
        audio.pause();
        audio.currentTime = startTime;
        audio.volume = baseVolume;
        
        // Update hover state after stopping
        const anyPlaying = Object.values(utilAudioRefs.current).some(a => !a.paused);
        setUtilHovering(anyPlaying);
      }, fadeDuration * 1000 + 20);
    } else {
      audio.pause();
      audio.currentTime = startTime;
      audio.volume = baseVolume;
      
      // Update hover state immediately
      const anyPlaying = Object.values(utilAudioRefs.current).some(a => !a.paused);
      setUtilHovering(anyPlaying);
    }
  }, [segments, fadeTo]);

  // Noise-only hover (no audio segment)
  const startHoverNoise = useCallback(() => {
    hoverCountRef.current += 1;
    setUtilHovering(true);
  }, []);

  const stopHoverNoise = useCallback(() => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
    if (hoverCountRef.current === 0) {
      setUtilHovering(false);
    }
  }, []);

  // One-shot audio by direct src
  const ensureOneShotAudio = useCallback((src: string, volume: number = 0.5) => {
    let audio = oneshotAudioRefs.current[src];
    if (!audio) {
      audio = new Audio(src);
      audio.preload = 'auto';
      audio.loop = false;
      audio.muted = muted;
      audio.volume = volume;
      audio.addEventListener('error', () => {
        console.error('[oneshot-audio] Failed to load:', src);
      });
      oneshotAudioRefs.current[src] = audio;
    }
    audio.volume = volume;
    return audio;
  }, [muted]);

  const startOneShotBySrc = useCallback((src: string, volume: number = 0.5) => {
    const audio = ensureOneShotAudio(src, volume);
    audio.currentTime = 0;
    audio.muted = muted;
    if (!muted) {
      audio.play().catch(() => {});
    }
  }, [muted, ensureOneShotAudio]);

  const stopOneShotBySrc = useCallback((src: string) => {
    const audio = oneshotAudioRefs.current[src];
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  // Helper: Get hover handlers for any element
  type HoverHandlerArgs = {
    id?: string;              // Segment ID
    src?: string;             // Direct audio path
    volume?: number;          // Override volume
    disabledOnMobile?: boolean;
    treatAsNoise?: boolean;   // Use noise start/stop
  };

  const isMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const getHoverHandlers = useCallback((args: HoverHandlerArgs) => {
    return {
      onMouseEnter: () => {
        if (args.disabledOnMobile && isMobile()) return;

        if (args.treatAsNoise) {
          startHoverNoise();
        } else if (args.id) {
          startUtil(args.id);
        } else if (args.src) {
          startOneShotBySrc(args.src, args.volume ?? 0.5);
        }
      },
      onMouseLeave: () => {
        if (args.disabledOnMobile && isMobile()) return;

        if (args.treatAsNoise) {
          stopHoverNoise();
        } else if (args.id) {
          stopUtil(args.id);
        } else if (args.src) {
          stopOneShotBySrc(args.src);
        }
      },
    } as const;
  }, [startHoverNoise, stopHoverNoise, startUtil, stopUtil, startOneShotBySrc, stopOneShotBySrc]);

  return {
    noiseRef,
    noiseSrc,
    startUtil,
    stopUtil,
    startHoverNoise,
    stopHoverNoise,
    muted,
    getHoverHandlers,
  } as const;
}
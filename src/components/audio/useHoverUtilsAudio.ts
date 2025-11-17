"use client";

import { useEffect, useRef, useState } from "react";

export type UtilAudioSegment = {
  id: string;
  src: string;
  start?: number;
  end?: number;
  volume?: number;
  loopSegment?: boolean;
  fadeDuration?: number; // used for end fade and mouseleave fade
};

export function useHoverUtilsAudio(segments: UtilAudioSegment[], noiseSrc: string) {
  const [muted, setMuted] = useState<boolean>(true);
  const [utilHovering, setUtilHovering] = useState<boolean>(false);
  const utilAudioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const utilLoopRaf = useRef<Record<string, number>>({});
  const hoverActive = useRef<Record<string, boolean>>({});
  const noiseRef = useRef<HTMLAudioElement | null>(null);
  const hoverCountRef = useRef<number>(0);
  const interactedRef = useRef<boolean>(false);
  // Cache for ad-hoc one-shot audios by src (not part of segments)
  const oneshotAudioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // On mount, sync initial muted with TimedAudio's storage and set interaction listeners
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('wiw-audio-muted');
      if (saved === 'true' || saved === 'false') setMuted(saved === 'true');
    } catch {}
    const enable = () => { interactedRef.current = true; };
    window.addEventListener('pointerdown', enable, { once: true });
    window.addEventListener('keydown', enable, { once: true });
    window.addEventListener('touchstart', enable, { once: true });
    return () => {
      window.removeEventListener('pointerdown', enable as any);
      window.removeEventListener('keydown', enable as any);
      window.removeEventListener('touchstart', enable as any);
    };
  }, []);

  // helper fade
  const fadeTo = (audio: HTMLAudioElement, target: number, seconds: number) => {
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const from = clamp(audio.volume);
    const to = clamp(target);
    if (from === to || seconds <= 0) {
      audio.volume = to;
      return;
    }
    const start = performance.now();
    const dur = seconds * 1000;
    function step(now: number) {
      const t = Math.min(1, (now - start) / dur);
      audio.volume = clamp(from + (to - from) * t);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  // preload util audios
  useEffect(() => {
    segments.forEach(seg => {
      if (!utilAudioRefs.current[seg.id]) {
        const a = new Audio(seg.src);
        a.preload = 'auto';
        a.loop = false;
        a.volume = seg.volume ?? 0.5;
        a.muted = muted;
        a.addEventListener('error', () => {
          console.error('[util-audio] failed to load', seg.id, seg.src);
        });
        utilAudioRefs.current[seg.id] = a;
      }
    });
    return () => {
      Object.values(utilLoopRaf.current).forEach(id => cancelAnimationFrame(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // listen global mute from TimedAudio
  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail && typeof e.detail.muted === 'boolean') setMuted(e.detail.muted);
    };
    window.addEventListener('wiw-audio-mute-change', handler as any);
    return () => window.removeEventListener('wiw-audio-mute-change', handler as any);
  }, []);

  // apply mute to util audios
  useEffect(() => {
    Object.values(utilAudioRefs.current).forEach(a => {
      a.muted = muted;
      if (muted) {
        try { a.pause(); } catch {}
      }
    });
    if (muted) setUtilHovering(false);
  }, [muted]);

  // control noise based on util hovering (if you pass a noiseRef externally)
  useEffect(() => {
    const n = noiseRef.current;
    if (!n) return;
    n.loop = true;
    const NOISE_VOL = 0.12;
    if (!utilHovering || muted) {
      fadeTo(n, 0, 0.25);
      const id = setTimeout(() => { if (n.volume === 0) n.pause(); }, 280);
      return () => clearTimeout(id);
    } else {
      n.muted = false;
      if (n.paused) n.play().catch(() => {});
      fadeTo(n, NOISE_VOL, 0.4);
    }
  }, [utilHovering, muted]);

  const ensureTick = (id: string, seg: UtilAudioSegment, audio: HTMLAudioElement) => {
    if (!seg.loopSegment || seg.end === undefined) return;
    const { start = 0, end, fadeDuration = 0.4, volume = 0.5 } = seg;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));

    const tick = () => {
      // stop ticking if hover ended
      if (!hoverActive.current[id]) return;
      if (audio.paused) {
        utilLoopRaf.current[id] = requestAnimationFrame(tick);
        return;
      }
      const t = audio.currentTime;
      // guard lower bound
      if (t < start) audio.currentTime = start;

      // end-fade (similar to people-section CD logic)
      if (fadeDuration > 0 && t >= end - fadeDuration && t < end) {
        const remaining = Math.max(0, end - t);
        audio.volume = clamp(volume * (remaining / fadeDuration));
      }
      // wrap
      if (t >= end - 0.02) {
        audio.currentTime = start;
        audio.volume = volume; // restore base after wrap
        // keep playing seamlessly
        audio.play().catch(() => {});
      }
      utilLoopRaf.current[id] = requestAnimationFrame(tick);
    };
    if (utilLoopRaf.current[id]) cancelAnimationFrame(utilLoopRaf.current[id]);
    utilLoopRaf.current[id] = requestAnimationFrame(tick);
  };

  const startUtil = (id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;
    const audio = utilAudioRefs.current[id];
    if (!audio || muted) {
      if (!audio) console.debug('[util-audio] no audio element for id', id);
      if (muted) console.debug('[util-audio] muted, skip start for', id);
      return;
    }

    // Treat hover as interaction
    if (!interactedRef.current) interactedRef.current = true;

    hoverActive.current[id] = true;
    if (utilLoopRaf.current[id]) cancelAnimationFrame(utilLoopRaf.current[id]);

    const baseVol = seg.volume ?? 0.5;
    const startAt = seg.start ?? 0;

    audio.currentTime = startAt;
    audio.muted = false;

    if (seg.loopSegment) {
      // Start silent, fade in like people-section CD
      audio.volume = 0;
      audio.play().then(() => {
        fadeTo(audio, baseVol, Math.max(seg.fadeDuration ?? 0.6, 0.4));
      }).catch(err => {
        console.debug('[util-audio] play blocked, will wait and retry', id, err?.name);
        const retry = () => audio.play().then(()=>fadeTo(audio, baseVol, Math.max(seg.fadeDuration ?? 0.6, 0.4))).catch(e => console.debug('[util-audio] retry failed', id, e?.name));
        window.addEventListener('pointerdown', retry, { once: true });
        window.addEventListener('touchstart', retry, { once: true });
        window.addEventListener('keydown', retry, { once: true });
      });
      ensureTick(id, seg, audio);
    } else {
      // One-shot behavior (paper/bark style)
      audio.volume = baseVol;
      audio.currentTime = startAt;
      audio.play().catch(err => {
        console.debug('[util-audio] play blocked for one-shot', id, err?.name);
        const retry = () => audio.play().catch(e => console.debug('[util-audio] retry failed one-shot', id, e?.name));
        window.addEventListener('pointerdown', retry, { once: true });
        window.addEventListener('touchstart', retry, { once: true });
        window.addEventListener('keydown', retry, { once: true });
      });
    }

    setUtilHovering(true);
  };

  const stopUtil = (id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;
    const audio = utilAudioRefs.current[id];
    if (!audio) return;
    hoverActive.current[id] = false;

    if (utilLoopRaf.current[id]) cancelAnimationFrame(utilLoopRaf.current[id]);

    const baseVol = seg.volume ?? 0.5;
    const startAt = seg.start ?? 0;

    if (seg.loopSegment) {
      // Fade out then pause/reset, matching people-section CD behavior
      const outDur = Math.max(seg.fadeDuration ?? 0.5, 0.3);
      fadeTo(audio, 0, outDur);
      window.setTimeout(() => {
        try { audio.pause(); } catch {}
        audio.currentTime = startAt;
        audio.volume = baseVol;
      }, outDur * 1000 + 20);
    } else {
      try { audio.pause(); } catch {}
      audio.currentTime = startAt;
      audio.volume = baseVol;
    }

    // if no audios playing, mark hovering false
    const anyPlaying = Object.values(utilAudioRefs.current).some(a => !a.paused);
    setUtilHovering(anyPlaying);
  };

  // Manual hover-driven noise (no util audio playback required)
  const startHoverNoise = () => {
    hoverCountRef.current += 1;
    setUtilHovering(true);
  };
  const stopHoverNoise = () => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
    if (hoverCountRef.current === 0) setUtilHovering(false);
  };

  // --- One-shot (by direct src) helpers ---
  const ensureOneShotAudio = (src: string, volume: number = 0.5) => {
    let a = oneshotAudioRefs.current[src];
    if (!a) {
      a = new Audio(src);
      a.preload = 'auto';
      a.loop = false;
      a.muted = muted;
      a.volume = volume;
      a.addEventListener('error', () => {
        console.error('[oneshot-audio] failed to load', src);
      });
      oneshotAudioRefs.current[src] = a;
    }
    a.volume = volume;
    return a;
  };

  const startOneShotBySrc = (src: string, volume: number = 0.5) => {
    const a = ensureOneShotAudio(src, volume);
    a.currentTime = 0;
    a.muted = muted;
    if (!muted) a.play().catch(() => {});
  };

  const stopOneShotBySrc = (src: string) => {
    const a = oneshotAudioRefs.current[src];
    if (!a) return;
    try { a.pause(); } catch {}
    a.currentTime = 0;
  };

  // --- Simple, reusable hover handlers API ---
  type HoverHandlerArgs = {
    id?: string; // util segment id
    src?: string; // direct audio path (one-shot)
    volume?: number; // override
    disabledOnMobile?: boolean;
    treatAsNoise?: boolean; // use noise start/stop
  };

  const isMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const getHoverHandlers = (args: HoverHandlerArgs) => {
    return {
      onMouseEnter: () => {
        if (args.disabledOnMobile && isMobile()) return;
        if (args.treatAsNoise) {
          startHoverNoise();
          return;
        }
        if (args.id) {
          startUtil(args.id);
          return;
        }
        if (args.src) {
          startOneShotBySrc(args.src, args.volume ?? 0.5);
        }
      },
      onMouseLeave: () => {
        if (args.disabledOnMobile && isMobile()) return;
        if (args.treatAsNoise) {
          stopHoverNoise();
          return;
        }
        if (args.id) {
          stopUtil(args.id);
          return;
        }
        if (args.src) {
          stopOneShotBySrc(args.src);
        }
      },
    } as const;
  };

  // --- existing returns + new helpers ---
  return {
    noiseRef,
    noiseSrc,
    startUtil,
    stopUtil,
    startHoverNoise,
    stopHoverNoise,
    muted,
    getHoverHandlers, // << spread these into any element
  } as const;
}

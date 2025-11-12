"use client";

import { useEffect, useRef, useState } from "react";

export type UtilAudioSegment = {
  id: string;
  src: string;
  start?: number;
  end?: number;
  volume?: number;
  loopSegment?: boolean;
  fadeDuration?: number;
};

export function useHoverUtilsAudio(segments: UtilAudioSegment[], noiseSrc: string) {
  const [muted, setMuted] = useState<boolean>(true);
  const [utilHovering, setUtilHovering] = useState<boolean>(false);
  const utilAudioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const utilLoopRaf = useRef<Record<string, number>>({});
  const noiseRef = useRef<HTMLAudioElement | null>(null);
  const hoverCountRef = useRef<number>(0);

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
        utilAudioRefs.current[seg.id] = a;
      }
    });
    return () => {
      Object.values(utilLoopRaf.current).forEach(id => cancelAnimationFrame(id));
    };
    // segments stable per page
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

  // control noise based on util hovering
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

  const startUtil = (id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;
    const audio = utilAudioRefs.current[id];
    if (!audio || muted) return;
    if (utilLoopRaf.current[id]) cancelAnimationFrame(utilLoopRaf.current[id]);
    audio.currentTime = seg.start ?? 0;
    audio.volume = seg.volume ?? 0.5;
    audio.muted = false;
    audio.play().catch(() => {});

    if (seg.loopSegment && seg.end !== undefined) {
      const { start = 0, end, fadeDuration = 0, volume = 0.5 } = seg;
      const clamp = (v: number) => Math.max(0, Math.min(1, v));
      const tick = () => {
        if (audio.paused) return;
        const t = audio.currentTime;
        if (fadeDuration > 0 && t >= end - fadeDuration && t < end) {
          const remaining = end - t;
          audio.volume = clamp(volume * (remaining / fadeDuration));
        }
        if (t >= end - 0.02) {
          audio.currentTime = start;
          audio.volume = volume;
        }
        utilLoopRaf.current[id] = requestAnimationFrame(tick);
      };
      utilLoopRaf.current[id] = requestAnimationFrame(tick);
    }
    setUtilHovering(true);
  };

  const stopUtil = (id: string) => {
    const seg = segments.find(s => s.id === id);
    if (!seg) return;
    const audio = utilAudioRefs.current[id];
    if (!audio) return;
    if (utilLoopRaf.current[id]) cancelAnimationFrame(utilLoopRaf.current[id]);
    try { audio.pause(); } catch {}
    audio.currentTime = seg.start ?? 0;
    audio.volume = seg.volume ?? 0.5;

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

  return { noiseRef, noiseSrc, startUtil, stopUtil, startHoverNoise, stopHoverNoise, muted } as const;
}

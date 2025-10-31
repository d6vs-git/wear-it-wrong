import { useMotionValue, animate } from "framer-motion";

export type Wiggle = {
  x: number;
  y: number;
  rot: number;
};

// Smooth, low-lag cursor-driven wiggle using MotionValues (no React re-renders)
export default function useHoverWiggle(intensity = 8) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rot = useMotionValue(0);

  const spring = { type: "spring", stiffness: 260, damping: 20, mass: 0.2 } as const;

  const onMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5

    const nx = py * intensity; // vertical influences y
    const ny = -px * intensity; // horizontal influences x
    const nrot = -px * intensity * 1.2; // slight rotate based on x

    animate(x, nx, spring);
    animate(y, ny, spring);
    animate(rot, nrot, spring);
  };

  const onLeave: React.MouseEventHandler<HTMLElement> = () => {
    animate(x, 0, spring);
    animate(y, 0, spring);
    animate(rot, 0, spring);
  };

  return { x, y, rot, onMove, onLeave };
}

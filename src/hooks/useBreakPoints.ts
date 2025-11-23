import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint("mobile");
      else if (window.innerWidth < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
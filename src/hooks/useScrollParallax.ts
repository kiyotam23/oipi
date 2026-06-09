import { useEffect, useState } from "react";

/** Subtle scroll-linked Y offset for background parallax. */
export function useScrollParallax(speed = 0.06) {
  const [offset, setOffset] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncEnabled = () => setEnabled(!reducedMotion.matches);
    syncEnabled();
    reducedMotion.addEventListener("change", syncEnabled);

    if (reducedMotion.matches) {
      return () => reducedMotion.removeEventListener("change", syncEnabled);
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", syncEnabled);
    };
  }, [speed]);

  return enabled ? offset : 0;
}

import { useEffect, useState } from "react";

export function scrollParallaxOffset(scrollY: number, speed: number, acceleration: number): number {
  if (acceleration <= 0) return scrollY * speed;

  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const s = scrollY;
  // velocity grows with scroll depth: v(s) = speed * (1 + acceleration * s / maxScroll)
  return speed * (s + (acceleration * s * s) / (2 * maxScroll));
}

/** Scroll-linked Y offset. acceleration > 0 eases into faster drift deeper on the page. */
export function useScrollParallax(speed = 0.06, acceleration = 0): number {
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
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(scrollParallaxOffset(window.scrollY, speed, acceleration));
      });
    };

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      reducedMotion.removeEventListener("change", syncEnabled);
    };
  }, [speed, acceleration]);

  return enabled ? offset : 0;
}

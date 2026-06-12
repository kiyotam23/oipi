import { useEffect, useState } from "react";

export interface ElementRect {
  top: number;
  height: number;
  width: number;
  left: number;
}

/** Viewport rect for a selector, kept in sync on scroll/resize. */
export function useElementRect(selector: string): ElementRect | null {
  const [rect, setRect] = useState<ElementRect | null>(null);

  useEffect(() => {
    let raf = 0;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(selector);
        if (!el) return;
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, height: r.height, width: r.width, left: r.left });
      });
    };

    const observeTargets = () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        observer.observe(node);
      });
      sync();
    };

    const observer = new ResizeObserver(sync);

    observeTargets();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const mutation = new MutationObserver(observeTargets);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
      mutation.disconnect();
    };
  }, [selector]);

  return rect;
}

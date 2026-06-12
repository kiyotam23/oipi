import { useEffect, useState } from "react";

export interface SectionRect {
  top: number;
  height: number;
}

/** Viewport rect for a section element, kept in sync on scroll/resize. */
export function useSectionRect(sectionId: string): SectionRect | null {
  const [rect, setRect] = useState<SectionRect | null>(null);

  useEffect(() => {
    let raf = 0;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, height: r.height });
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const el = document.getElementById(sectionId);
    const observer = new ResizeObserver(sync);
    if (el) observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
    };
  }, [sectionId]);

  return rect;
}

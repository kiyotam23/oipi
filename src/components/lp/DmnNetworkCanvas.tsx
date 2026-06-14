"use client";

import { useEffect, useRef } from "react";
import { buildDmnNetwork, drawDmnNetwork } from "@/lib/dmn-network";

export function DmnNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let network = buildDmnNetwork(1, 1);

    const render = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      network = buildDmnNetwork(width, height);
      drawDmnNetwork(ctx, width, height, network);
    };

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) render(width, height);
    });

    observer.observe(canvas);
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) render(rect.width, rect.height);

    return () => observer.disconnect();
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}

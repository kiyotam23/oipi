"use client";

import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { particlesEnabled } from "@/lib/features";
import { heroOverlayParticlesConfig } from "@/lib/particles-config";

interface AreaParticlesOverlayProps {
  id: string;
}

export function AreaParticlesOverlay({ id }: AreaParticlesOverlayProps) {
  const [enabled, setEnabled] = useState(particlesEnabled);
  const options = useMemo(() => heroOverlayParticlesConfig, []);

  useEffect(() => {
    if (!particlesEnabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!reducedMotion.matches);

    const onChange = () => setEnabled(!reducedMotion.matches);
    reducedMotion.addEventListener("change", onChange);
    return () => reducedMotion.removeEventListener("change", onChange);
  }, []);

  if (!enabled) return null;

  return (
    <Particles id={id} className="absolute inset-0 h-full w-full" options={options} />
  );
}

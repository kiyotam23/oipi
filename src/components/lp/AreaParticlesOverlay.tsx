"use client";

import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { particlesEnabled } from "@/lib/features";
import { heroOverlayParticlesConfig } from "@/lib/particles-config";

interface AreaParticlesOverlayProps {
  id: string;
}

export function AreaParticlesOverlay({ id }: AreaParticlesOverlayProps) {
  const reducedMotion = usePrefersReducedMotion();
  const enabled = particlesEnabled && !reducedMotion;
  const options = useMemo(() => heroOverlayParticlesConfig, []);

  if (!enabled) return null;

  return (
    <Particles id={id} className="absolute inset-0 h-full w-full" options={options} />
  );
}

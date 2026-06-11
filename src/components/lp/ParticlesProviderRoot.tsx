"use client";

import type { ReactNode } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import { particlesEnabled } from "@/lib/features";
import { initParticles } from "@/lib/init-particles";

interface ParticlesProviderRootProps {
  children: ReactNode;
}

export function ParticlesProviderRoot({ children }: ParticlesProviderRootProps) {
  if (!particlesEnabled) return children;

  return <ParticlesProvider init={initParticles}>{children}</ParticlesProvider>;
}

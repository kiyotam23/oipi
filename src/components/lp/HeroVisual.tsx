"use client";

import dynamic from "next/dynamic";

const HeroMoleculeViewer = dynamic(
  () => import("./HeroMoleculeViewer").then((mod) => mod.HeroMoleculeViewer),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-full w-full min-h-[inherit] bg-transparent" aria-hidden />
    ),
  },
);

export function HeroVisual() {
  return (
    <HeroMoleculeViewer
      priority
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  );
}

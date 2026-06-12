"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { particlesEnabled } from "@/lib/features";

// ── Config ────────────────────────────────────────────────────────────────────

// Per-asset visual scale correction (manual tuning)
const MOLECULE_ASSETS = [
  { key: "serotonin", src: "/molecules/Serotonin.svg", bias: 1.2 },
  { key: "psilocybin", src: "/molecules/Psilocybin.svg", bias: 1.7 },
  { key: "dmt", src: "/molecules/Dimethyltryptamine.svg", bias: 0.3 },
  { key: "meo-dmt", src: "/molecules/5-MeO-DMT.svg", bias: 2.2 },
  { key: "lsd", src: "/molecules/LSD_Structure_V2.svg", bias: 0.85 },
  { key: "mdma", src: "/molecules/MDMA.svg", bias: 1.4 },
  { key: "ketamine", src: "/molecules/Ketamine.svg", bias: 1.1 },
] as const;

const MOLECULE_SIZE_SCALE = 1.2;
const PARTICLE_MIN = 40;
const PARTICLE_MAX = 56;
const PARTICLE_SIZE = Math.round(64 * MOLECULE_SIZE_SCALE);
const PARTICLE_MIN_DIST = Math.round(88 * MOLECULE_SIZE_SCALE);
const MOLECULE_OPACITY = 0.38;

/** Hero text column (~540px) — right of this is open visual space */
const TEXT_ZONE_RATIO = 0.46;
const RIGHT_ZONE_SPAWN_BIAS = 0.62;

const MOLECULE_BG_CSS = `
.molecule-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.molecule-bg__particle {
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
  transform-origin: center center;
}
.molecule-bg__shape {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  vector-effect: non-scaling-stroke;
  opacity: ${MOLECULE_OPACITY};
}
`;

// ── Types ─────────────────────────────────────────────────────────────────────

type MoleculeKey = (typeof MOLECULE_ASSETS)[number]["key"];

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  scale: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomSeed(): number {
  return Math.floor(Math.random() * 0xffffffff);
}

function moleculeBias(kind: MoleculeKey): number {
  const asset = MOLECULE_ASSETS.find((a) => a.key === kind);
  return asset?.bias ?? 1;
}

/** Each SVG kind appears equally, then order is shuffled. */
function buildShuffledKindQueue(count: number, sessionSeed: number): MoleculeKey[] {
  const keys = MOLECULE_ASSETS.map((a) => a.key);
  const queue: MoleculeKey[] = [];
  for (let i = 0; i < count; i++) {
    queue.push(keys[i % keys.length]);
  }
  const rng = mulberry32(sessionSeed ^ 0x2f6e3a91);
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  return queue;
}

function particleMotion(rng: () => number) {
  return {
    vx: (rng() - 0.5) * 0.32,
    vy: (rng() - 0.5) * 0.32,
    angle: rng() * 360,
    spin: (rng() - 0.5) * 0.08,
  };
}

function spawnPosition(
  rng: () => number,
  w: number,
  h: number,
  zone: "left" | "right",
): { x: number; y: number } {
  const half = PARTICLE_SIZE / 2;
  const split = w * TEXT_ZONE_RATIO;

  const x =
    zone === "right"
      ? Math.max(split, half) + rng() * Math.max(0, w - Math.max(split, half) - half)
      : half + rng() * Math.max(0, split - PARTICLE_SIZE);

  const y =
    zone === "right"
      ? half + Math.pow(rng(), 0.5) * Math.max(0, Math.min(h * 0.92, h - PARTICLE_SIZE) - half)
      : half + rng() * Math.max(0, h - PARTICLE_SIZE);

  return { x, y };
}

function particleCount(w: number, h: number): number {
  const n = Math.floor((w * h) / 32_000);
  return Math.min(PARTICLE_MAX, Math.max(PARTICLE_MIN, n));
}

async function loadSvgMarkup(src: string): Promise<string> {
  const res = await fetch(src);
  const raw = await res.text();
  const doc = new DOMParser().parseFromString(raw, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return "";
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("class", "molecule-bg__shape");
  svg.setAttribute("aria-hidden", "true");
  return svg.outerHTML;
}

async function preloadMolecules(): Promise<Map<MoleculeKey, string>> {
  const cache = new Map<MoleculeKey, string>();
  await Promise.all(
    MOLECULE_ASSETS.map(async ({ key, src }) => {
      cache.set(key, await loadSvgMarkup(src));
    }),
  );
  return cache;
}

function spawnParticles(
  container: HTMLElement,
  w: number,
  h: number,
  cache: Map<MoleculeKey, string>,
  sessionSeed: number,
): Particle[] {
  const count = particleCount(w, h);
  const particles: Particle[] = [];
  const minDist = PARTICLE_MIN_DIST;
  const kinds = buildShuffledKindQueue(count, sessionSeed);

  for (let i = 0; i < count; i++) {
    const kind = kinds[i];
    const layoutRng = mulberry32(sessionSeed ^ i * 9917);
    const motionRng = mulberry32(sessionSeed ^ i * 4523);
    const zone: "left" | "right" =
      layoutRng() < RIGHT_ZONE_SPAWN_BIAS ? "right" : "left";
    const baseScale = 0.4 + layoutRng() * 0.6;
    const scale = baseScale * moleculeBias(kind);
    const markup = cache.get(kind);
    if (!markup) continue;

    let x = 0;
    let y = 0;
    let placed = false;

    for (let attempt = 0; attempt < 36; attempt++) {
      const pos = spawnPosition(layoutRng, w, h, zone);
      x = pos.x;
      y = pos.y;
      const ok = particles.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.hypot(dx, dy) > minDist + PARTICLE_SIZE * 0.7;
      });
      if (ok) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      const pos = spawnPosition(layoutRng, w, h, zone);
      x = pos.x;
      y = pos.y;
    }

    const el = document.createElement("div");
    el.className = "molecule-bg__particle";
    el.style.width = `${PARTICLE_SIZE}px`;
    el.style.height = `${PARTICLE_SIZE}px`;
    el.innerHTML = markup;
    container.appendChild(el);

    const motion = particleMotion(motionRng);
    particles.push({
      el,
      x,
      y,
      ...motion,
      scale,
    });
  }

  return particles;
}

function wrap(v: number, max: number): number {
  if (v < 0) return v + max;
  if (v > max) return v - max;
  return v;
}

function updateParticle(
  p: Particle,
  w: number,
  h: number,
  mx: number,
  my: number,
  mouseOn: boolean,
) {
  if (mouseOn) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.hypot(dx, dy);
    const range = 110 + PARTICLE_SIZE * 0.5;
    if (dist < range && dist > 0.1) {
      const force = ((range - dist) / range) * 0.14;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }
  }

  p.vx *= 0.996;
  p.vy *= 0.996;
  const speed = Math.hypot(p.vx, p.vy);
  if (speed > 0.65) {
    p.vx = (p.vx / speed) * 0.65;
    p.vy = (p.vy / speed) * 0.65;
  }

  p.x = wrap(p.x + p.vx, w);
  p.y = wrap(p.y + p.vy, h);
  p.angle += p.spin;

  p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${p.angle}deg) scale(${p.scale})`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function MoleculeSvgBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const enabled = particlesEnabled && !reducedMotion;

  useEffect(() => {
    if (!enabled || !rootRef.current) return;

    const container = rootRef.current;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let mx = 0;
    let my = 0;
    let mouseOn = false;
    let cache = new Map<MoleculeKey, string>();
    const sessionSeed = randomSeed();

    function measure() {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
    }

    function rebuild() {
      container.querySelectorAll(".molecule-bg__particle").forEach((n) => n.remove());
      measure();
      particles = spawnParticles(container, w, h, cache, sessionSeed);
    }

    function tick() {
      if (!running) return;
      for (const p of particles) {
        updateParticle(p, w, h, mx, my, mouseOn);
      }
      raf = requestAnimationFrame(tick);
    }

    function onResize() {
      rebuild();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      mouseOn = true;
    }

    function onMouseLeave() {
      mouseOn = false;
    }

    (async () => {
      cache = await preloadMolecules();
      if (!running) return;
      rebuild();
      tick();
    })();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      container.querySelectorAll(".molecule-bg__particle").forEach((n) => n.remove());
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MOLECULE_BG_CSS }} />
      <div ref={rootRef} className="molecule-bg" aria-hidden />
    </>
  );
}

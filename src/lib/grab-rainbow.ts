import type { Container } from "@tsparticles/engine";
import { getDistance } from "@tsparticles/engine";

/** Orange-forward 7-color rainbow for grab synapse lines */
export const grabRainbowPalette = [
  "#FF4500", // red-orange
  "#FF7A00", // orange sunshine
  "#FF9800", // orange
  "#FFB300", // amber / yellow-orange
  "#52B788", // green
  "#4DA3D9", // blue
  "#9B5DE5", // violet
] as const;

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

type InteractivityPlugin = {
  interactionManager: {
    interactivityData: {
      mouse: { position?: { x: number; y: number } };
    };
  };
  postUpdate: (delta: unknown) => void;
};

function drawRainbowGrab(
  container: Container,
  mousePos: { x: number; y: number } | undefined,
  palette: readonly string[],
  grabDistance = 140,
  maxOpacity = 0.65,
) {
  if (!mousePos) return;

  const distance = grabDistance * container.retina.pixelRatio;
  const particles = container.particles.grid.queryCircle(mousePos, distance);

  particles.forEach((particle, index) => {
    const pos = particle.getPosition();
    const pointDistance = getDistance(pos, mousePos);
    if (pointDistance > distance) return;

    const opacityLine = maxOpacity - (pointDistance * maxOpacity) / distance;
    if (opacityLine <= 0) return;

    const { r, g, b } = hexToRgb(palette[index % palette.length]);

    container.canvas.render.draw((ctx) => {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.strokeStyle = `rgba(${r},${g},${b},${opacityLine})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  });
}

/** Replace default grab lines with per-particle orange-weighted rainbow. */
export function installGrabRainbow(container: Container) {
  const plugin = container.plugins.find(
    (p): p is InteractivityPlugin =>
      "interactionManager" in p &&
      typeof (p as InteractivityPlugin).postUpdate === "function",
  );
  if (!plugin) return () => {};

  const originalPostUpdate = plugin.postUpdate.bind(plugin);

  plugin.postUpdate = (delta) => {
    originalPostUpdate(delta);
    drawRainbowGrab(
      container,
      plugin.interactionManager.interactivityData.mouse.position,
      grabRainbowPalette,
    );
  };

  return () => {
    plugin.postUpdate = originalPostUpdate;
  };
}

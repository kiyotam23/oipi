export interface DmnNode {
  x: number;
  y: number;
  isMainHub: boolean;
  visible: boolean;
}

export interface DmnNetwork {
  nodes: DmnNode[];
  connections: [DmnNode, DmnNode][];
}

export function buildDmnNetwork(w: number, h: number): DmnNetwork {
  const nodes: DmnNode[] = [];
  const connections: [DmnNode, DmnNode][] = [];

  const hubCount = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < hubCount; i++) {
    nodes.push({
      x: w * 0.3 + Math.random() * (w * 0.4),
      y: h * 0.2 + Math.random() * (h * 0.5),
      isMainHub: true,
      visible: true,
    });
  }

  nodes.forEach((hub) => {
    const satelliteCount = 25 + Math.floor(Math.random() * 20);
    for (let i = 0; i < satelliteCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.pow(Math.random(), 2) * Math.min(180, w * 0.22);
      nodes.push({
        x: hub.x + Math.cos(angle) * distance,
        y: hub.y + Math.sin(angle) * distance,
        isMainHub: false,
        visible: Math.random() < 0.08,
      });
    }
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];
      const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

      if (
        (dist < Math.min(130, w * 0.18) && Math.random() < 0.4) ||
        (n1.isMainHub && n2.isMainHub && Math.random() < 0.7)
      ) {
        connections.push([n1, n2]);
      }
    }
  }

  return { nodes, connections };
}

export function drawDmnNetwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  network: DmnNetwork,
) {
  ctx.clearRect(0, 0, w, h);

  for (const [n1, n2] of network.connections) {
    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);

    const midX = (n1.x + n2.x) / 2;
    const midY = (n1.y + n2.y) / 2;
    const cpX = midX + (w / 2 - midX) * 0.15;
    const cpY = midY + (h / 2 - midY) * 0.15;

    ctx.quadraticCurveTo(cpX, cpY, n2.x, n2.y);
    ctx.strokeStyle = "rgba(74, 96, 105, 0.05)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  for (const node of network.nodes) {
    if (node.isMainHub) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
      ctx.fill();
    } else if (node.visible) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(74, 96, 105, 0.3)";
      ctx.fill();
    }
  }
}

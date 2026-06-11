import * as THREE from "three";
import { moleculeGrays, moleculeMaterial } from "./molecule-colors";

function createVertexColorMaterial() {
  return new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: moleculeMaterial.atom.metalness,
    roughness: moleculeMaterial.atom.roughness,
    envMapIntensity: 0.4,
    transparent: false,
    opacity: 1,
    depthWrite: true,
  });
}

function createAtomMaterial() {
  return new THREE.MeshStandardMaterial({
    color: moleculeGrays.atom,
    metalness: moleculeMaterial.atom.metalness,
    roughness: moleculeMaterial.atom.roughness,
    envMapIntensity: 0.4,
    transparent: false,
    opacity: 1,
    depthWrite: true,
  });
}

function createBondMaterial() {
  return new THREE.MeshStandardMaterial({
    color: moleculeGrays.bond,
    metalness: moleculeMaterial.atom.metalness,
    roughness: moleculeMaterial.atom.roughness,
    envMapIntensity: 0.35,
    transparent: false,
    opacity: 1,
    depthWrite: true,
  });
}

function remapGeometryToGray(geometry: THREE.BufferGeometry, gray: string) {
  const colorAttr = geometry.getAttribute("color");
  if (!colorAttr) return false;

  const tone = new THREE.Color(gray);
  for (let i = 0; i < colorAttr.count; i += 1) {
    colorAttr.setXYZ(i, tone.r, tone.g, tone.b);
  }
  colorAttr.needsUpdate = true;
  return true;
}

function resolvePartName(node: THREE.Mesh) {
  const names = [node.name, node.parent?.name ?? ""].map((n) => n.toLowerCase());
  if (names.some((n) => n.includes("bond") || n.includes("stick") || n.includes("link"))) {
    return "bond";
  }
  return "atom";
}

/** Apply two-tone grayscale while keeping the vertex-color fade path. */
export function applyStandardMoleculeMaterials(object: THREE.Object3D) {
  object.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;

    const part = resolvePartName(node);
    const gray = part === "bond" ? moleculeGrays.bond : moleculeGrays.atom;
    const hasVertexColors = remapGeometryToGray(node.geometry, gray);

    node.material = hasVertexColors
      ? createVertexColorMaterial()
      : part === "bond"
        ? createBondMaterial()
        : createAtomMaterial();
  });
}

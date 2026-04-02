const desktopLayout = {
  next: {
    hoverRadius: 1.9,
    position: { x: -3.22, y: 1.86, z: -0.7 },
    scale: 0.44,
    drift: { x: 0.2, y: 0.12 },
    bounds: {
      x: [-3.58, -1.88],
      y: [1.56, 2.08],
    },
  },
  react: {
    hoverRadius: 1.45,
    position: { x: 1.02, y: 0.58, z: -0.08 },
    scale: 0.72,
    drift: { x: 0.22, y: 0.16 },
    bounds: {
      x: [0.68, 1.34],
      y: [0.4, 0.9],
    },
  },
  tailwind: {
    hoverRadius: 1.68,
    position: { x: -1.84, y: -1.66, z: -0.94 },
    scale: 0.66,
    drift: { x: 0.13, y: 0.07 },
    bounds: {
      x: [-2.24, -1.42],
      y: [-1.94, -1.36],
    },
  },
};

const compactSceneLayout = {
  react: {
    hoverRadius: 1.12,
    position: { x: -1.02, y: 0.68, z: 0.06 },
    scale: 0.54,
    drift: { x: 0.08, y: 0.06 },
    bounds: {
      x: [-1.24, -0.78],
      y: [0.5, 0.86],
    },
  },
};

function clamp(value, [min, max]) {
  return Math.min(Math.max(value, min), max);
}

export function getHeroSceneLayout({ compactLayout }) {
  return compactLayout ? compactSceneLayout : desktopLayout;
}

export function resolveHeroObjectTransform({ compactLayout, name, pointer }) {
  const layout = getHeroSceneLayout({ compactLayout });
  const objectLayout = layout[name];

  if (!objectLayout) {
    return undefined;
  }

  const pointerX = pointer?.x ?? 0;
  const pointerY = pointer?.y ?? 0;

  return {
    ...objectLayout,
    position: {
      x: clamp(
        objectLayout.position.x + pointerX * objectLayout.drift.x,
        objectLayout.bounds.x,
      ),
      y: clamp(
        objectLayout.position.y + pointerY * objectLayout.drift.y,
        objectLayout.bounds.y,
      ),
      z: objectLayout.position.z,
    },
  };
}

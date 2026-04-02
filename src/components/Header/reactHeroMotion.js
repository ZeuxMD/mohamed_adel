const idleMotion = {
  orbitSpeed: 0.18,
  coreGlow: 0.18,
};

const hoveredMotion = {
  orbitSpeed: 0.74,
  coreGlow: 0.48,
};

export function getReactHeroMotion({ hovered }) {
  return hovered ? hoveredMotion : idleMotion;
}

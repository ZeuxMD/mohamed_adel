const idleMotion = {
  ribbonSpread: 0.08,
  sweepSpeed: 0.08,
  glow: 0.12,
};

const hoveredMotion = {
  ribbonSpread: 0.32,
  sweepSpeed: 0.38,
  glow: 0.28,
};

export function getTailwindHeroMotion({ hovered }) {
  return hovered ? hoveredMotion : idleMotion;
}

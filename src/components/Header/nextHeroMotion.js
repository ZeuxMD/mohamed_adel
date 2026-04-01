const idleMotion = {
  shineOpacity: 0.03,
  shineTravel: 0,
  innerGlow: 0.08,
  tiltStrength: 0.08,
};

const hoveredMotion = {
  shineOpacity: 0.13,
  shineTravel: 1,
  innerGlow: 0.18,
  tiltStrength: 0.14,
};

export function getNextHeroMotion({ hovered }) {
  return hovered ? hoveredMotion : idleMotion;
}

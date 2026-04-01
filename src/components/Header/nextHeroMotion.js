const idleMotion = {
  floatAmplitude: 0.08,
  floatSpeed: 0.76,
  glow: 0.08,
  hoverLift: 0,
  tiltStrength: 0.014,
};

const hoveredMotion = {
  floatAmplitude: 0.1,
  floatSpeed: 0.84,
  glow: 0.14,
  hoverLift: 0.03,
  tiltStrength: 0.024,
};

export function getNextHeroMotion({ hovered }) {
  return hovered ? hoveredMotion : idleMotion;
}

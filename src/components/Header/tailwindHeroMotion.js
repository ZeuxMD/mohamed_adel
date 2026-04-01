const idleMotion = {
  floatAmplitude: 0.08,
  floatSpeed: 0.8,
  ribbonSpread: 0.18,
  ribbonLateral: 0.032,
  ribbonRotation: 0.02,
  sweepSpeed: 0.14,
  glow: 0.12,
};

const hoveredMotion = {
  floatAmplitude: 0.1,
  floatSpeed: 0.88,
  ribbonSpread: 0.28,
  ribbonLateral: 0.054,
  ribbonRotation: 0.034,
  sweepSpeed: 0.18,
  glow: 0.18,
};

const ribbonSpreadScale = 0.24;
const ribbonPulseFactor = 0.52;
const ribbonPulseLimit = 0.018;

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export function getTailwindHeroMotion({ hovered }) {
  return hovered ? hoveredMotion : idleMotion;
}

export function getTailwindRibbonOffsets({
  elapsedTime = 0,
  hoverMix = 0,
  motionScale = 1,
}) {
  const lateral =
    lerp(idleMotion.ribbonLateral, hoveredMotion.ribbonLateral, hoverMix) *
    motionScale;
  const ribbonRotation =
    lerp(idleMotion.ribbonRotation, hoveredMotion.ribbonRotation, hoverMix) *
    motionScale;
  const spread =
    lerp(idleMotion.ribbonSpread, hoveredMotion.ribbonSpread, hoverMix) *
    ribbonSpreadScale *
    motionScale;
  const weave = Math.sin(elapsedTime * 0.96 + Math.PI / 5);
  const sweep = Math.sin(elapsedTime * 1.3 + Math.PI / 6);
  const ribbonPulse =
    Math.sin(elapsedTime * 1.1) *
    Math.min(spread * ribbonPulseFactor, ribbonPulseLimit * motionScale);

  return {
    bottom: {
      x: -lateral - weave * lateral * 0.38,
      y: -spread - ribbonPulse,
      rotationZ: -ribbonRotation - sweep * ribbonRotation * 0.48,
    },
    top: {
      x: lateral + weave * lateral * 0.42,
      y: spread + ribbonPulse,
      rotationZ: ribbonRotation + sweep * ribbonRotation * 0.54,
    },
  };
}

const NARROW_MOBILE_WIDTH = 768;
const MOBILE_DPR_MAX = 2;
const COARSE_POINTER_DPR_MAX = 1.35;
const FINE_POINTER_DPR_MAX = 1.5;

function getSceneDprMax({ isNarrowMobile, pointerFine, prefersReducedMotion }) {
  if (prefersReducedMotion) {
    return 1;
  }

  if (isNarrowMobile) {
    return MOBILE_DPR_MAX;
  }

  return pointerFine ? FINE_POINTER_DPR_MAX : COARSE_POINTER_DPR_MAX;
}

export function getHeroSceneFlags({
  width,
  prefersReducedMotion,
  pointerFine = true,
}) {
  const isNarrowMobile = width <= NARROW_MOBILE_WIDTH;

  return {
    enabledObjects: isNarrowMobile ? ["react"] : ["next", "react", "tailwind"],
    compactLayout: isNarrowMobile,
    motionScale: prefersReducedMotion ? 0 : isNarrowMobile ? 0.8 : 1,
    dprMax: getSceneDprMax({
      isNarrowMobile,
      pointerFine,
      prefersReducedMotion,
    }),
    renderInteractiveScene: !prefersReducedMotion,
  };
}

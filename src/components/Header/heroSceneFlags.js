const NARROW_MOBILE_WIDTH = 640;
const INTERACTIVE_SCENE_MIN_WIDTH = 960;

export function getHeroSceneFlags({
  width,
  prefersReducedMotion,
  pointerFine = true,
}) {
  const isNarrowMobile = width <= NARROW_MOBILE_WIDTH;

  return {
    enabledObjects: isNarrowMobile
      ? ["react", "tailwind"]
      : ["next", "react", "tailwind"],
    compactLayout: isNarrowMobile,
    motionScale: prefersReducedMotion ? 0 : isNarrowMobile ? 0.8 : 1,
    dprMax: prefersReducedMotion ? 1 : pointerFine ? 1.5 : 1.1,
    renderInteractiveScene:
      !prefersReducedMotion &&
      pointerFine &&
      width >= INTERACTIVE_SCENE_MIN_WIDTH,
  };
}

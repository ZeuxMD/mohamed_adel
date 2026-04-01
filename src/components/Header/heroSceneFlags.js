export function getHeroSceneFlags({ width, prefersReducedMotion }) {
  const isNarrowMobile = width <= 640;

  return {
    enabledObjects: isNarrowMobile
      ? ["react", "tailwind"]
      : ["next", "react", "tailwind"],
    compactLayout: isNarrowMobile,
    motionScale: prefersReducedMotion ? 0.4 : isNarrowMobile ? 0.8 : 1,
    dprMax: prefersReducedMotion ? 1 : isNarrowMobile ? 1.1 : 1.5,
  };
}

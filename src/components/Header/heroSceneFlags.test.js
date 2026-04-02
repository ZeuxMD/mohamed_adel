import { describe, expect, it } from "vitest";

import { getHeroSceneFlags } from "./heroSceneFlags";

describe("getHeroSceneFlags", () => {
  it("removes the Next.js object first on narrow mobile widths", () => {
    const flags = getHeroSceneFlags({
      width: 390,
      prefersReducedMotion: false,
    });

    expect(flags.enabledObjects).toEqual(["react", "tailwind"]);
  });

  it("keeps the canvas sharp enough for retina screens when motion is allowed", () => {
    const flags = getHeroSceneFlags({
      width: 1280,
      prefersReducedMotion: false,
      pointerFine: true,
    });

    expect(flags.dprMax).toBe(1.5);
    expect(flags.renderInteractiveScene).toBe(true);
  });

  it("caps motion and dpr when reduced motion is preferred", () => {
    const flags = getHeroSceneFlags({
      width: 1280,
      prefersReducedMotion: true,
    });

    expect(flags.motionScale).toBe(0);
    expect(flags.dprMax).toBe(1);
    expect(flags.renderInteractiveScene).toBe(false);
  });

  it("uses the static fallback on coarse pointers and smaller viewports", () => {
    const flags = getHeroSceneFlags({
      width: 900,
      prefersReducedMotion: false,
      pointerFine: false,
    });

    expect(flags.renderInteractiveScene).toBe(false);
  });
});

import { describe, expect, it } from "vitest";

import { getHeroSceneFlags } from "./heroSceneFlags";

describe("getHeroSceneFlags", () => {
  it("reduces the stacked mobile hero to a single React object", () => {
    const flags = getHeroSceneFlags({
      width: 390,
      prefersReducedMotion: false,
    });

    expect(flags.enabledObjects).toEqual(["react"]);
    expect(flags.compactLayout).toBe(true);
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

  it("keeps touch-first wider viewports sharper without matching desktop dpr", () => {
    const flags = getHeroSceneFlags({
      width: 900,
      prefersReducedMotion: false,
      pointerFine: false,
    });

    expect(flags.dprMax).toBe(1.35);
    expect(flags.renderInteractiveScene).toBe(true);
  });

  it("switches to the compact single-object scene at the mobile breakpoint", () => {
    const flags = getHeroSceneFlags({
      width: 768,
      prefersReducedMotion: false,
      pointerFine: false,
    });

    expect(flags.enabledObjects).toEqual(["react"]);
    expect(flags.compactLayout).toBe(true);
  });

  it("gives narrow mobile layouts a higher dpr budget because the scene is simplified", () => {
    const flags = getHeroSceneFlags({
      width: 390,
      prefersReducedMotion: false,
      pointerFine: false,
    });

    expect(flags.enabledObjects).toEqual(["react"]);
    expect(flags.compactLayout).toBe(true);
    expect(flags.dprMax).toBe(2);
    expect(flags.renderInteractiveScene).toBe(true);
  });
});

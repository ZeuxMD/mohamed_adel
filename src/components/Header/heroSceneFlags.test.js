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

  it("caps motion and dpr when reduced motion is preferred", () => {
    const flags = getHeroSceneFlags({
      width: 1280,
      prefersReducedMotion: true,
    });

    expect(flags.motionScale).toBeLessThan(1);
    expect(flags.dprMax).toBe(1);
  });
});

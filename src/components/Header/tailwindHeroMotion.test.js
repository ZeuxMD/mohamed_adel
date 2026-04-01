import { describe, expect, it } from "vitest";

import { getTailwindHeroMotion } from "./tailwindHeroMotion";

describe("getTailwindHeroMotion", () => {
  it("widens ribbon spread and sweep speed on hover", () => {
    const idleMotion = getTailwindHeroMotion({ hovered: false });
    const hoveredMotion = getTailwindHeroMotion({ hovered: true });

    expect(hoveredMotion.ribbonSpread).toBeGreaterThan(idleMotion.ribbonSpread);
    expect(hoveredMotion.sweepSpeed).toBeGreaterThan(idleMotion.sweepSpeed);
  });
});

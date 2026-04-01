import { describe, expect, it } from "vitest";

import { getReactHeroMotion } from "./reactHeroMotion";

describe("getReactHeroMotion", () => {
  it("boosts the orbit speed and core glow on hover", () => {
    const idleMotion = getReactHeroMotion({ hovered: false });
    const hoveredMotion = getReactHeroMotion({ hovered: true });

    expect(hoveredMotion.orbitSpeed).toBeGreaterThan(idleMotion.orbitSpeed);
    expect(hoveredMotion.coreGlow).toBeGreaterThan(idleMotion.coreGlow);
  });
});

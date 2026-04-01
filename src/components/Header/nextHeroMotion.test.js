import { describe, expect, it } from "vitest";

import { getNextHeroMotion } from "./nextHeroMotion";

describe("getNextHeroMotion", () => {
  it("raises shine opacity, inner glow, and tilt strength on hover", () => {
    const idleMotion = getNextHeroMotion({ hovered: false });
    const hoveredMotion = getNextHeroMotion({ hovered: true });

    expect(hoveredMotion.shineOpacity).toBeGreaterThan(idleMotion.shineOpacity);
    expect(hoveredMotion.innerGlow).toBeGreaterThan(idleMotion.innerGlow);
    expect(hoveredMotion.tiltStrength).toBeGreaterThan(idleMotion.tiltStrength);
  });
});

import { describe, expect, it } from "vitest";

import { getNextHeroMotion } from "./nextHeroMotion";

describe("getNextHeroMotion", () => {
  it("keeps hover restrained while slightly increasing float, glow, and tilt", () => {
    const idleMotion = getNextHeroMotion({ hovered: false });
    const hoveredMotion = getNextHeroMotion({ hovered: true });

    expect(hoveredMotion.floatAmplitude).toBeGreaterThan(idleMotion.floatAmplitude);
    expect(hoveredMotion.floatAmplitude).toBeLessThanOrEqual(idleMotion.floatAmplitude * 1.3);
    expect(hoveredMotion.glow).toBeGreaterThan(idleMotion.glow);
    expect(hoveredMotion.hoverLift).toBeGreaterThanOrEqual(idleMotion.hoverLift);
    expect(hoveredMotion.tiltStrength).toBeGreaterThan(idleMotion.tiltStrength);
  });
});

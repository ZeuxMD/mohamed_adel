import { describe, expect, it } from "vitest";

import {
  getTailwindHeroMotion,
  getTailwindRibbonOffsets,
} from "./tailwindHeroMotion";

describe("getTailwindHeroMotion", () => {
  it("keeps hover more energetic than idle without exploding the motion range", () => {
    const idleMotion = getTailwindHeroMotion({ hovered: false });
    const hoveredMotion = getTailwindHeroMotion({ hovered: true });

    expect(idleMotion.floatAmplitude).toBeGreaterThan(0);
    expect(hoveredMotion.ribbonSpread).toBeGreaterThan(idleMotion.ribbonSpread);
    expect(hoveredMotion.sweepSpeed).toBeGreaterThan(idleMotion.sweepSpeed);
    expect(hoveredMotion.floatAmplitude).toBeGreaterThan(idleMotion.floatAmplitude);
    expect(hoveredMotion.ribbonSpread).toBeLessThanOrEqual(idleMotion.ribbonSpread * 2);
    expect(hoveredMotion.floatAmplitude).toBeLessThanOrEqual(idleMotion.floatAmplitude * 1.25);
    expect(hoveredMotion.ribbonLateral).toBeGreaterThan(idleMotion.ribbonLateral);
    expect(hoveredMotion.ribbonRotation).toBeGreaterThan(idleMotion.ribbonRotation);
  });

  it("keeps the two ribbons separated across the idle and hovered motion cycles", () => {
    const samples = Array.from({ length: 180 }, (_, index) => index * 0.1);

    samples.forEach((elapsedTime) => {
      const idleOffsets = getTailwindRibbonOffsets({
        elapsedTime,
        hoverMix: 0,
        motionScale: 1,
      });
      const hoveredOffsets = getTailwindRibbonOffsets({
        elapsedTime,
        hoverMix: 1,
        motionScale: 1,
      });

      expect(idleOffsets.top.y - idleOffsets.bottom.y).toBeGreaterThan(0.01);
      expect(hoveredOffsets.top.y - hoveredOffsets.bottom.y).toBeGreaterThan(0.02);
      expect(idleOffsets.top.x).toBeGreaterThan(0);
      expect(idleOffsets.bottom.x).toBeLessThan(0);
      expect(hoveredOffsets.top.rotationZ).toBeGreaterThan(0);
      expect(hoveredOffsets.bottom.rotationZ).toBeLessThan(0);
    });
  });
});

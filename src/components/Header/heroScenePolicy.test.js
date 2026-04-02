import { describe, expect, it } from "vitest";

import {
  advanceHeroPointer,
  isHeroPointerSettled,
  normalizeHeroPointer,
} from "./heroScenePolicy";

describe("normalizeHeroPointer", () => {
  it("returns a neutral scene offset for the center of the hero field", () => {
    const pointer = { clientX: 400, clientY: 250 };
    const rect = { left: 100, top: 50, width: 600, height: 400 };

    expect(normalizeHeroPointer(pointer, rect)).toEqual({ x: 0, y: 0 });
  });
});

describe("advanceHeroPointer", () => {
  it("moves the current pointer toward the target without overshooting", () => {
    const nextPointer = advanceHeroPointer(
      { x: -0.4, y: 0.5 },
      { x: 0.2, y: -0.1 },
      0.16,
    );

    expect(nextPointer.x).toBeGreaterThan(-0.4);
    expect(nextPointer.x).toBeLessThanOrEqual(0.2);
    expect(nextPointer.y).toBeLessThan(0.5);
    expect(nextPointer.y).toBeGreaterThanOrEqual(-0.1);
  });

  it("eases smoothly back toward neutral after pointer leave", () => {
    const nextPointer = advanceHeroPointer(
      { x: 0.8, y: -0.6 },
      { x: 0, y: 0 },
      0.1,
    );

    expect(nextPointer.x).toBeLessThan(0.8);
    expect(nextPointer.x).toBeGreaterThan(0);
    expect(nextPointer.y).toBeGreaterThan(-0.6);
    expect(nextPointer.y).toBeLessThan(0);
  });
});

describe("isHeroPointerSettled", () => {
  it("returns true when the current pointer is close enough to the target", () => {
    expect(
      isHeroPointerSettled({ x: 0.001, y: -0.0015 }, { x: 0, y: 0 }),
    ).toBe(true);
  });
});

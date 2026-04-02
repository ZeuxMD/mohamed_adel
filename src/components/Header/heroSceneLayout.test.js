import { describe, expect, it } from "vitest";

import {
  getHeroSceneLayout,
  resolveHeroObjectTransform,
} from "./heroSceneLayout";

describe("heroSceneLayout", () => {
  it("spreads the desktop composition across a wide diagonal", () => {
    const layout = getHeroSceneLayout({ compactLayout: false });

    expect(layout.next.position.x).toBeLessThan(layout.tailwind.position.x);
    expect(layout.tailwind.position.x).toBeLessThan(layout.react.position.x);
    expect(layout.next.position.y).toBeGreaterThan(layout.react.position.y);
    expect(layout.react.position.y).toBeGreaterThan(layout.tailwind.position.y);
    expect(layout.next.position.x).toBeLessThan(-2);
    expect(layout.react.position.x).toBeLessThan(1.4);
    expect(layout.tailwind.position.x).toBeLessThan(-1);
  });

  it("clamps pointer drift so logos stay within their layout budget", () => {
    const nextTransform = resolveHeroObjectTransform({
      compactLayout: false,
      name: "next",
      pointer: { x: -1, y: 1 },
    });
    const reactTransform = resolveHeroObjectTransform({
      compactLayout: false,
      name: "react",
      pointer: { x: 1, y: -1 },
    });
    const tailwindTransform = resolveHeroObjectTransform({
      compactLayout: false,
      name: "tailwind",
      pointer: { x: 1, y: -1 },
    });

    expect(nextTransform.position.x).toBeGreaterThanOrEqual(-3.58);
    expect(nextTransform.position.x).toBeLessThanOrEqual(-1.88);
    expect(reactTransform.position.x).toBeGreaterThanOrEqual(0.68);
    expect(reactTransform.position.x).toBeLessThanOrEqual(1.34);
    expect(tailwindTransform.position.x).toBeGreaterThanOrEqual(-2.24);
    expect(tailwindTransform.position.x).toBeLessThanOrEqual(-1.42);
  });

  it("keeps the desktop bounds out of the CTA zone", () => {
    const layout = getHeroSceneLayout({ compactLayout: false });

    expect(layout.next.bounds.x[1]).toBeLessThan(-1.7);
    expect(layout.react.bounds.x[0]).toBeGreaterThan(0.6);
    expect(layout.react.bounds.x[1]).toBeLessThan(1.4);
    expect(layout.tailwind.bounds.x[1]).toBeLessThan(-0.8);
    expect(layout.tailwind.bounds.y[1]).toBeLessThan(-1.3);
  });

  it("keeps the compact layout focused on a single React object in the left CTA lane", () => {
    const layout = getHeroSceneLayout({ compactLayout: true });

    expect(layout.next).toBeUndefined();
    expect(layout.tailwind).toBeUndefined();
    expect(layout.react.position.x).toBeLessThan(-0.7);
    expect(layout.react.position.y).toBeGreaterThan(0.5);
    expect(layout.react.bounds.x[1]).toBeLessThan(-0.7);
    expect(layout.react.bounds.y[0]).toBeGreaterThanOrEqual(0.5);
  });

  it("keeps Tailwind on a tighter pointer leash than React in the desktop scene", () => {
    const desktopLayout = getHeroSceneLayout({ compactLayout: false });

    expect(desktopLayout.tailwind.drift.x).toBeLessThan(desktopLayout.react.drift.x);
    expect(desktopLayout.tailwind.drift.y).toBeLessThan(desktopLayout.react.drift.y);
  });
});

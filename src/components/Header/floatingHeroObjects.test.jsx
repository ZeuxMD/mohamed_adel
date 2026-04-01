import { render } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  getHeroSceneLayout,
  resolveHeroObjectTransform,
} from "./heroSceneLayout";

vi.mock("@react-three/fiber", () => ({
  useFrame: vi.fn(),
}));

import NextHeroObject from "./NextHeroObject";
import TailwindHeroObject from "./TailwindHeroObject";

function toPositionAttribute(position) {
  return [position.x, position.y, position.z].join(",");
}

describe("floating hero objects", () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("renders Tailwind with a stable visual origin and a separate stable hover target", () => {
    const pointer = { x: 1, y: -1 };
    const layout = getHeroSceneLayout({ compactLayout: false }).tailwind;

    const { container } = render(
      <TailwindHeroObject compactLayout={false} motionScale={1} pointer={pointer} />,
    );

    expect(
      container.querySelector('group[name="tailwind-hero-visual"]'),
    ).toHaveAttribute(
      "position",
      toPositionAttribute(layout.position),
    );
    expect(
      container.querySelector('group[name="tailwind-hero-hover-target"]'),
    ).toHaveAttribute(
      "position",
      toPositionAttribute(layout.position),
    );
  });

  it("keeps the Tailwind hover target stable while the cursor approaches and leaves", () => {
    const baseLayout = getHeroSceneLayout({ compactLayout: false }).tailwind;
    const approachPointer = { x: 0.82, y: -0.34 };
    const hoverPointer = { x: -0.28, y: -0.62 };
    const leavePointer = { x: -0.94, y: -0.9 };
    const expectedPosition = toPositionAttribute(baseLayout.position);

    const { container, rerender } = render(
      <TailwindHeroObject
        compactLayout={false}
        motionScale={1}
        pointer={approachPointer}
      />,
    );

    const getHoverTarget = () =>
      container.querySelector('group[name="tailwind-hero-hover-target"]');

    expect(getHoverTarget()).toHaveAttribute("position", expectedPosition);

    rerender(
      <TailwindHeroObject compactLayout={false} motionScale={1} pointer={hoverPointer} />,
    );
    expect(getHoverTarget()).toHaveAttribute("position", expectedPosition);

    rerender(
      <TailwindHeroObject compactLayout={false} motionScale={1} pointer={leavePointer} />,
    );
    expect(getHoverTarget()).toHaveAttribute("position", expectedPosition);
  });

  it("renders Next.js with a stable visual origin and a separate pointer-follow hover target", () => {
    const pointer = { x: -1, y: 1 };
    const layout = getHeroSceneLayout({ compactLayout: false }).next;
    const target = resolveHeroObjectTransform({
      compactLayout: false,
      name: "next",
      pointer,
    });

    const { container } = render(
      <NextHeroObject compactLayout={false} motionScale={1} pointer={pointer} />,
    );

    expect(
      container.querySelector('group[name="next-hero-visual"]'),
    ).toHaveAttribute(
      "position",
      toPositionAttribute(layout.position),
    );
    expect(
      container.querySelector('group[name="next-hero-hover-target"]'),
    ).toHaveAttribute(
      "position",
      toPositionAttribute(target.position),
    );
  });
});

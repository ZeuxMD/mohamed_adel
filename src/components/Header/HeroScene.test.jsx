import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children, className }) => (
    <div className={className} data-testid="mock-canvas">
      {children}
    </div>
  ),
  useFrame: vi.fn(),
}));

import HeroScene from "./HeroScene";

function createMediaQueryList(matches = false) {
  return {
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  };
}

describe("HeroScene", () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: function ResizeObserver() {},
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn((query) => {
        if (query === "(prefers-reduced-motion: reduce)") {
          return createMediaQueryList(false);
        }

        if (query === "(hover: hover) and (pointer: fine)") {
          return createMediaQueryList(false);
        }

        return createMediaQueryList(false);
      }),
    });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("renders only the React object when the hero is in the stacked mobile layout", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 390,
    });

    const { container } = render(<HeroScene pointer={{ x: 0, y: 0 }} />);

    expect(container.querySelector('group[name="react-hero-visual"]')).toBeInTheDocument();
    expect(container.querySelector('group[name="next-hero-visual"]')).not.toBeInTheDocument();
    expect(
      container.querySelector('group[name="tailwind-hero-visual"]'),
    ).not.toBeInTheDocument();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  PAGELOAD_STORAGE_KEY,
  markPageLoadSeen,
  shouldShowPageLoad,
} from "./pageLoadState";

function setMatchMedia(matches) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches }),
  });
}

function setLocalStorage(initialEntries = []) {
  const values = new Map(initialEntries);

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: vi.fn((key) => values.get(key) ?? null),
      setItem: vi.fn((key, value) => {
        values.set(key, String(value));
      }),
      removeItem: vi.fn((key) => {
        values.delete(key);
      }),
      clear: vi.fn(() => {
        values.clear();
      }),
    },
  });

  return values;
}

describe("pageLoadState", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips the intro when reduced motion is preferred", () => {
    setMatchMedia(true);
    setLocalStorage();

    expect(shouldShowPageLoad()).toBe(false);
  });

  it("skips the intro after it has already been seen", () => {
    setMatchMedia(false);
    setLocalStorage([[PAGELOAD_STORAGE_KEY, "seen"]]);

    expect(shouldShowPageLoad()).toBe(false);
  });

  it("shows the intro once when it has not been seen yet", () => {
    setMatchMedia(false);
    setLocalStorage();

    expect(shouldShowPageLoad()).toBe(true);
  });

  it("marks the intro as seen using the versioned storage key", () => {
    setMatchMedia(false);
    const values = setLocalStorage();

    markPageLoadSeen();

    expect(values.get(PAGELOAD_STORAGE_KEY)).toBe("seen");
  });
});

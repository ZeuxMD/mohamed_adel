export const PAGELOAD_VERSION = "v3";
export const PAGELOAD_STORAGE_KEY = `mohamed_portfolio.pageload.${PAGELOAD_VERSION}`;

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function shouldShowPageLoad() {
  if (typeof window === "undefined") {
    return false;
  }

  if (prefersReducedMotion()) {
    return false;
  }

  try {
    return window.localStorage.getItem(PAGELOAD_STORAGE_KEY) !== "seen";
  } catch {
    return true;
  }
}

export function markPageLoadSeen() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PAGELOAD_STORAGE_KEY, "seen");
  } catch {
    // Storage can fail in privacy-restricted contexts; the intro can still run.
  }
}

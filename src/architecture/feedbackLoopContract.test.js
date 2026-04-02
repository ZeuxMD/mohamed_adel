import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const contractPath = resolve(currentDir, "../../.agents/feedback-loop.yml");
const contract = readFileSync(contractPath, "utf8");

describe("feedback loop contract", () => {
  it("tracks the approved quality gates and maturity target", () => {
    expect(contract).toContain("schema_version: 1");
    expect(contract).toContain("target: architecture-as-code");
    expect(contract).toContain("check: pnpm check");
    expect(contract).toContain("typecheck: pnpm typecheck");
    expect(contract).toContain("format-check");
  });

  it("captures the Guardian template gap explicitly", () => {
    expect(contract).toContain("Guardian catalog gap on 2026-04-02");
    expect(contract).toContain("stack: repo-local-react-vite-spa");
    expect(contract).toContain("feedback_loop: repo-local-react-vite-strict");
  });
});

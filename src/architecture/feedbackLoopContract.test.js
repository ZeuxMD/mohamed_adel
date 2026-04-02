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
    expect(contract).toContain("target: self-tightening-loop");
    expect(contract).toContain("check: make check");
    expect(contract).toContain("typecheck: make typecheck");
    expect(contract).toContain("format-check");
    expect(contract).toContain("build");
  });

  it("captures the approved Guardian template selection and phased fit", () => {
    expect(contract).toContain("vite-react-ts-pnpm");
    expect(contract).toContain("vite-react-ts-pnpm-strict");
    expect(contract).toContain("credible phased fit");
    expect(contract).toContain("full-typescript-convergence");
  });
});

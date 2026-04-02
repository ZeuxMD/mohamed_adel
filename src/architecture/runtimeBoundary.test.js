import { readdirSync, readFileSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(currentDir, "..");

const pureHeroModules = [
  "components/Header/heroSceneFlags.js",
  "components/Header/heroSceneLayout.js",
  "components/Header/heroScenePolicy.js",
  "components/Header/nextHeroMotion.js",
  "components/Header/reactHeroMotion.js",
  "components/Header/tailwindHeroMotion.js",
];

function listSourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      return listSourceFiles(entryPath);
    }

    if (![".js", ".jsx"].includes(extname(entry.name))) {
      return [];
    }

    return entryPath;
  });
}

describe("runtime boundaries", () => {
  it("keeps react-dom/client imports confined to the Vite entrypoint", () => {
    const offenders = listSourceFiles(srcDir)
      .filter((filePath) =>
        /from ["']react-dom\/client["']/.test(readFileSync(filePath, "utf8")),
      )
      .map((filePath) => relative(srcDir, filePath));

    expect(offenders).toEqual(["main.jsx"]);
  });

  it("keeps hero policy modules free of framework imports", () => {
    pureHeroModules.forEach((modulePath) => {
      const contents = readFileSync(resolve(srcDir, modulePath), "utf8");

      expect(contents).not.toMatch(/from ["']react["']/);
      expect(contents).not.toMatch(/from ["']@react-three\/fiber["']/);
    });
  });
});

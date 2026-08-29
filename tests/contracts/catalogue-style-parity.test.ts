import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const cardStylesRoot = join(process.cwd(), "src", "cards");

const findStyleRoots = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findStyleRoots(path);
    return entry.name.endsWith("-card.styles.ts") ? [path] : [];
  });

describe("catalogue style parity", () => {
  const styleRoots = findStyleRoots(cardStylesRoot);

  it("keeps every public card within the catalogue token boundary", () => {
    expect(styleRoots).toHaveLength(45);

    for (const styleRoot of styleRoots) {
      const source = readFileSync(styleRoot, "utf8");
      expect(
        source,
        `${styleRoot} must include the catalogue's local token fallbacks`,
      ).toMatch(/cardBaseStyles|globalTokens|dashboardBaseCardStyles/);
    }
  });

  it("uses only the catalogue radii outside intentional circular and signal shapes", () => {
    for (const styleRoot of styleRoots) {
      const source = readFileSync(styleRoot, "utf8");
      const rawRadii = [...source.matchAll(/border-radius:\s*(\d+)px/g)].map(
        (match) => match[1],
      );

      expect(
        rawRadii.every((radius) => radius === "999" || radius === "2"),
        `${styleRoot} has a raw corner radius instead of a catalogue token`,
      ).toBe(true);
    }
  });

  it("keeps security surfaces and dialogs on the same shared recipe", () => {
    const summary = readFileSync(
      join(
        cardStylesRoot,
        "security-summary",
        "security-summary-card.styles.ts",
      ),
      "utf8",
    );
    const cameraWall = readFileSync(
      join(
        cardStylesRoot,
        "security-camera-wall",
        "security-camera-wall-card.styles.ts",
      ),
      "utf8",
    );

    expect(summary).toContain("border-radius: var(--dashboard-radius-control)");
    expect(cameraWall).toContain("border-radius: var(--dashboard-radius-control)");
    expect(cameraWall).not.toMatch(/background:\s*#111|color:\s*#ffffff/);
  });
});

# Non-Negotiable Project Rules

## 1. Source Repository is Read-Only
- \C:\Source Local\HA-UI-Components\ is the authoritative oracle and MUST remain strictly read-only.
- Never modify, format, delete, or rewrite any file in the old repository.

## 2. No Redesign & Exact Visual Fidelity
- This is an architectural migration to TypeScript + Lit + Vite, NOT a redesign.
- Micro-styling is a blocking compatibility contract: preserve exact padding, margins, gaps, font sizes, line heights, colors, borders, radii, shadows, transitions, and DOM structure.
- Do not "clean up", "modernize", or alter CSS values (e.g., do not change 44px targets, 2px borders, or custom property mappings).

## 3. Public API & Lovelace Compatibility
- All 45 existing public Lovelace custom card types and custom element names must remain registered and fully functional.
- Existing Lovelace YAML configurations must work without modification.
- Consolidated cards (\component-favourites-minimal-v1\ -> \component-favourites-v3\, \component-camera-controller-v1\ -> \component-camera-controller-v2\) must preserve their public element/card registrations via compatibility adapters.

## 4. Strict TypeScript & Code Quality
- Strict TypeScript mode is enabled (\
oImplicitAny\, strict null checks, etc.).
- No broad \ny\ or \s unknown as Type\ escape hatches without runtime validation.
- Clean typed domain models and boundaries for Home Assistant entities, services, registries, and WebSocket APIs.

## 5. Verification Beats Confidence
- Never mark a component complete based solely on TypeScript compilation or "looks good".
- Every component must be verified with executable contract tests, style preservation checks, and regression tests.
- Maintain and update the machine-readable migration ledger (\migration/component-matrix.json\).

## 6. Build & HACS Compatibility
- Automated Vite build produces a single self-contained browser-ready bundle at \dist/ha-component-library.js\.
- Lit is bundled directly.
- Never manually edit generated \dist/\ artifacts.

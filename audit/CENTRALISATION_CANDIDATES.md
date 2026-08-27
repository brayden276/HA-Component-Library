# Centralisation Candidate Matrix

This document provides the exhaustive forensic evaluation of all candidates identified across the codebase during Phase 1 analysis (Agents A–G).

Each candidate is evaluated against the 10 Core Scoring Rules:
1. Conceptual equivalence
2. Multiplicity & correctness risk (3+ locations, or 2 where correctness risk is high)
3. Fan-out reduction for bug fixes
4. Natural semantic owner
5. Small, explicit API
6. Independent testability
7. Consumer simplification
8. Absence of configuration/mode explosion
9. Style preservation
10. Improved dependency direction

---

## Candidate 1: Central Registry Coordination & WebSocket Subscription
- **Current Owners:**
  - `src/services/registry/dashboard-registry.ts` (`DashboardRegistryCoordinator`, `centralRegistry`)
  - `src/services/registry/registry-cache.ts` (`loadDashboardRegistries`, `DASHBOARD_REGISTRY_CACHE`)
  - `src/services/registry/registry-health.ts` (`healthAwareRegistryLoad`)
  - `src/cards/favourites/favourites-card.ts` (direct `connection.subscribeEvents` and `sendMessagePromise`)
  - `src/cards/household-attention/household-attention-card.ts` (direct `connection.subscribeEvents` and `sendMessagePromise`)
  - `src/cards/household-directory/household-directory-card.ts` (direct `sendMessagePromise`)
  - `src/cards/room-directory/room-directory-card.ts` (direct `sendMessagePromise`)
  - `src/cards/smart-collection/smart-collection-card.ts` (direct `sendMessagePromise`)
  - `src/cards/room-navigation/room-navigation-card.ts` (uses stale `loadDashboardRegistries`)
- **Duplicated Behaviour:**
  Fetching `config/area_registry/list`, `config/device_registry/list`, and `config/entity_registry/list` via WebSocket, caching promises per connection, listening to `area_registry_updated`, `device_registry_updated`, and `entity_registry_updated`, building indexed maps (`deviceArea`, `byDevice`, `areaMap`).
- **Number of Implementations:** 8 distinct implementations across services and cards.
- **Behaviourally Equivalent:** Yes. All attempt to query the same 3 HA registries and track their entities/areas/devices. However, `registry-cache.ts` never invalidates (causing stale data bugs in `room-navigation`), cards create redundant WS connections (flooding HA with 12–15 queries on load), and `registry-health.ts` mutates private store state.
- **Domain:** HA Infrastructure / Registry
- **Proposed Owner:** `src/services/registry/dashboard-registry.ts` (`DashboardRegistryCoordinator` / `centralRegistry`)
- **Expected Benefit:**
  - Eliminates 12–15 duplicate WS messages on initial dashboard load.
  - Provides real-time reactive updates across all cards when areas/devices/entities are renamed or reassigned in HA.
  - Removes 2 redundant files (`registry-cache.ts`, `registry-health.ts`).
  - Eliminates ~200 LOC of repetitive WS querying in cards.
- **Complexity Cost:** Low. `centralRegistry` already implements subscription, coalescing, and indexing.
- **Regression Risk:** Low with contract tests in place.
- **Styling Risk:** None (zero CSS or HTML template impact).
- **Public API Impact:** None (public card configs and types preserved).
- **Recommendation:** `CENTRALISE`

---

## Candidate 2: Registry Type Declarations
- **Current Owners:**
  - `src/types/home-assistant.ts` (lines 44–85: `EntityRegistryEntry`, `DeviceRegistryEntry`, `AreaRegistryEntry`)
  - `src/types/registry.ts` (lines 5–44: `AreaRegistryEntry`, `DeviceRegistryEntry`, `EntityRegistryEntry`, `DashboardRegistryEntry`, `DashboardRegistries`)
- **Duplicated Behaviour:**
  Declaring TypeScript interfaces for Home Assistant area, device, and entity registry entries.
- **Number of Implementations:** 2 competing definitions with subtle property discrepancies (`translation_key`, `floor_id`, `labels`, `hw_version`).
- **Behaviourally Equivalent:** Yes. Both describe identical HA backend WebSocket schemas.
- **Domain:** HA Boundary Types
- **Proposed Owner:** `src/types/registry.ts` (re-exported by `src/types/home-assistant.ts`)
- **Expected Benefit:** Single source of truth for registry types; eliminates type casting and discrepancy bugs.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 3: Entity Availability & State Validity Checks
- **Current Owners:**
  - `src/utils/entity.ts` (`isEntityActive`)
  - `src/services/registry/dashboard-registry.ts` (`validState`, `isActive`)
  - `src/services/security/security-runtime.ts` (`badSecurityState`)
  - `src/services/devices/wled-runtime.ts` (`WLED_INVALID`)
  - `src/cards/favourites/favourites-card.ts` (`INVALID_STATES`, `_isActive`)
  - `src/cards/split-ac/split-ac-card.ts` (`unavailable`)
  - `src/cards/control-row/control-row-card.ts` (`_available`)
  - `src/cards/media-row/media-row-card.ts` (`_available`)
  - `src/cards/garage-door/garage-door-card.ts` (custom case-sensitive check missing `"unknown"`)
  - `src/cards/update-row/update-row-card.ts`
- **Duplicated Behaviour:**
  Testing whether an entity or state string is valid/available (i.e. not `undefined`, `null`, `"unavailable"`, `"unknown"`), and testing whether an entity is in an "active" state across domains (climate, cover, lock, media_player, light, switch, binary_sensor).
- **Number of Implementations:** 10 implementations with subtle edge-case divergences.
- **Behaviourally Equivalent:** Conceptually identical, but fragmented implementations introduced bugs (e.g. `garage-door` failing to treat `"unknown"` as unavailable, `update-row` case sensitivity).
- **Domain:** HA Entity Infrastructure
- **Proposed Owner:** `src/utils/entity.ts` (`isEntityAvailable`, `isEntityUnavailable`, `isEntityActive`)
- **Expected Benefit:** Single typed authority on HA entity state availability and activity; fixes bugs across garage door and update cards.
- **Complexity Cost:** Low.
- **Regression Risk:** Very low.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 4: Entity Domain Extraction (`computeDomain` vs `domainOf`)
- **Current Owners:**
  - `src/utils/entity.ts` (`computeDomain`)
  - `src/services/registry/dashboard-registry.ts` (`domainOf`)
  - `src/services/devices/wled-runtime.ts` (`WLED_DOMAIN`)
  - 7 cards inlining `entity_id.split('.')[0]`
- **Duplicated Behaviour:**
  Extracting the domain prefix from an entity ID string (e.g. `"light.living_room"` -> `"light"`).
- **Number of Implementations:** 3 helper functions + 7 inlines.
- **Behaviourally Equivalent:** Yes.
- **Domain:** HA Entity Infrastructure
- **Proposed Owner:** `src/utils/entity.ts` (`computeDomain`, with alias `domainOf = computeDomain`)
- **Expected Benefit:** Eliminates duplicate functions, unifies naming, handles undefined/null safely.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 5: Entity Display Naming Fallback Chain
- **Current Owners:**
  - `src/utils/entity.ts` (`computeEntityName`)
  - `src/services/registry/dashboard-registry.ts` (`stateNameOf`)
  - `src/services/security/security-runtime.ts` (`securityEntityLabel`)
  - `src/cards/favourites/favourites-card.ts` (`_name`)
  - `src/cards/household-attention/household-attention-card.ts` (`_name`)
  - `src/cards/update-row/update-row-card.ts` (`_name`)
  - `src/cards/garage-door/garage-door-card.ts`
  - `src/cards/household-directory/household-directory-card.ts`
- **Duplicated Behaviour:**
  Resolving human-readable display names with fallback priorities: `custom alias -> registry entry name -> registry original name -> state friendly_name -> entity_id -> fallback label`.
- **Number of Implementations:** 8 distinct fallback chains.
- **Behaviourally Equivalent:** Inconsistently implemented (`computeEntityName` ignores registry names while `stateNameOf` and `favourites` respect them).
- **Domain:** HA Entity Infrastructure
- **Proposed Owner:** `src/utils/entity.ts` (`computeEntityDisplayName` / `computeEntityName`)
- **Expected Benefit:** Predictable, uniform naming resolution across all cards honoring Home Assistant user customization hierarchy.
- **Complexity Cost:** Low.
- **Regression Risk:** Very low.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 6: Custom Event Dispatching (`fireEvent`) & Re-Export Collision
- **Current Owners:**
  - `src/utils/navigation.ts` (`fireEvent`)
  - `src/utils/entity.ts` (`fireEvent`)
  - `src/components/base/lit-base-card.ts` (`LitBaseCard.prototype.fire`)
- **Duplicated Behaviour:**
  Dispatching a `CustomEvent` with `{ bubbles: true, composed: true }`.
- **Number of Implementations:** 3 definitions; causes TypeScript export collision in `src/utils/index.ts`.
- **Behaviourally Equivalent:** Exactly identical.
- **Domain:** Shared Core Utilities
- **Proposed Owner:** `src/utils/navigation.ts` (re-exported by `src/utils/index.ts`)
- **Expected Benefit:** Resolves export shadowing collision in `src/utils/index.ts`, eliminates duplicate code.
- **Complexity Cost:** Zero.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 7: Navigation Location Event (`navigateTo`)
- **Current Owners:**
  - `src/utils/navigation.ts` (`navigateTo`)
  - `src/utils/entity.ts` (`handleAction` navigation branch)
- **Duplicated Behaviour:**
  Pushing URL state to `window.history` and notifying HA router via `location-changed` event.
- **Number of Implementations:** 2 implementations.
- **Behaviourally Equivalent:** Inconsistent: `navigation.ts` dispatched a plain `new Event("location-changed")`, whereas HA frontend router expects `CustomEvent("location-changed", { detail: { replace: false } })`.
- **Domain:** Shared HA Navigation
- **Proposed Owner:** `src/utils/navigation.ts`
- **Expected Benefit:** Fixes navigation event payload to conform strictly with Home Assistant frontend routing.
- **Complexity Cost:** Zero.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 8: Dead Base Card: `PresentationalBaseCard`
- **Current Owners:** `src/components/base/presentational-base-card.ts`
- **Duplicated Behaviour:** 21-line stub class defining static styles and `getCardSize()`.
- **Number of Implementations:** 1 unused class (0 cards inherit from it).
- **Behaviourally Equivalent:** N/A.
- **Domain:** Core Base Classes
- **Proposed Owner:** N/A
- **Expected Benefit:** Removes dead module and prevents developer confusion.
- **Complexity Cost:** Zero.
- **Regression Risk:** None (verified 0 consumers across entire repository).
- **Styling Risk:** None.
- **Public API Impact:** Minimal (class was exported in index.ts; can be deprecated or removed).
- **Recommendation:** `REMOVE DEAD ABSTRACTION`

---

## Candidate 9: Base Class Bloat in `LitBaseCard` & `HaBaseCard` Consolidation
- **Current Owners:**
  - `src/components/base/lit-base-card.ts` (`LitBaseCard`, `HaBaseCard`)
- **Duplicated Behaviour:**
  - `LitBaseCard` defines 7 prototype formatting methods (`toText`, `formatNum`, `fmtPower`, `fmtEnergy`, `fmtDate`, `fmtTime`, `fmtCalendarDay`) that have **0 callers** across all 48 cards.
  - `HaBaseCard` is inherited by only 4 cards (`action-tile`, `metric-badge`, `quick-bar`, `status-card`) and only adds a trivial `validateConfig` hook.
- **Number of Implementations:** 2 base classes with unused wrapper boilerplate.
- **Behaviourally Equivalent:** `HaBaseCard` is a thin wrapper over `LitBaseCard`.
- **Domain:** Core Base Classes
- **Proposed Owner:** `src/components/base/lit-base-card.ts` (`LitBaseCard`, with `HaBaseCard` extending or alias).
- **Expected Benefit:** Strips dead prototype bloat from every custom element instance, simplifies inheritance tree.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 10: Dead Resolver Pipeline in `dashboard-registry.ts`
- **Current Owners:** `src/services/registry/dashboard-registry.ts` (lines 315–667)
- **Duplicated Behaviour:**
  Over 350 lines of unused UI card configuration builders (`defaultControlConfig`, `nativeClimateControlConfig`, `appleTvBundle`, `garageControl`, `resolveControlConfig`, `controlResolvers`, `applyPrefs`, `labelOf`, `validState`, `iconOf`, `uiEntry`, `entryFilters`, `registerEntryFilter`, `registerControlResolver`).
- **Number of Implementations:** 1 massive dead execution path.
- **Behaviourally Equivalent:** 0 live consumers in the entire repository.
- **Domain:** HA Infrastructure / Registry
- **Proposed Owner:** `src/services/registry/dashboard-registry.ts`
- **Expected Benefit:** Removes ~350 LOC of dead code, drastically improving maintainability and readability of `dashboard-registry.ts`.
- **Complexity Cost:** Low.
- **Regression Risk:** None (verified 0 live callers).
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `REMOVE DEAD ABSTRACTION`

---

## Candidate 11: Dead Preference Services & Editors
- **Current Owners:**
  - `src/editor/dashboard-preference-editor.ts` (380 LOC)
  - `src/services/preferences/backend-preferences.ts` (155 LOC)
  - `src/services/registry/registry-health.ts` (59 LOC)
- **Duplicated Behaviour:**
  Unused preference editor modal, unused backend preference sync service (all cards use local config or direct storage), and unused registry health retry wrapper.
- **Number of Implementations:** 3 completely dead modules (~600 LOC).
- **Behaviourally Equivalent:** 0 callers across cards, services, and tests.
- **Domain:** Dead Infrastructure
- **Proposed Owner:** N/A
- **Expected Benefit:** Eliminates ~600 LOC of unreferenced code, cleans up exports in `src/index.ts`.
- **Complexity Cost:** Zero.
- **Regression Risk:** None (verified 0 references).
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `REMOVE DEAD ABSTRACTION`

---

## Candidate 12: Wall-Clock Minute Scheduling
- **Current Owners:**
  - `src/cards/home-overview/home-overview-card.ts` (lines 50–56)
  - `src/cards/welcome-header/welcome-header-card.ts` (lines 41–47)
- **Duplicated Behaviour:**
  Calculating the millisecond delay to the next wall-clock minute (`60000 - (Date.now() % 60000) + 100`) and scheduling recursive updates.
- **Number of Implementations:** 2 identical implementations.
- **Behaviourally Equivalent:** 100% identical.
- **Domain:** Lifecycle Utilities
- **Proposed Owner:** `src/utils/lifecycle.ts` (`createMinuteScheduler`)
- **Expected Benefit:** Clean single owner for time-synchronized card updates; integrates directly with host lifecycle teardown.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 13: Memory Retention in Async Brokers & Context Maps
- **Current Owners:**
  - `src/services/profiles/backend-profiles.ts` (`profileContext` Map)
  - `src/services/energy/energy-store.ts` (`energyContexts` Map)
  - `src/utils/async-broker.ts` (forced error double-refresh)
- **Duplicated Behaviour:**
  Storing full `HomeAssistant` object references in module-level `Map` structures to pass `hass` into `createAsyncBroker` loaders, retaining old state trees indefinitely.
- **Number of Implementations:** 2 services.
- **Behaviourally Equivalent:** Both cause memory retention across long sessions.
- **Domain:** Async & State Infrastructure
- **Proposed Owner:** `src/services/profiles/backend-profiles.ts`, `src/services/energy/energy-store.ts`, `src/utils/async-broker.ts`
- **Expected Benefit:** Prevents memory leaks by passing context per-read and fixing the double-refresh bug in `async-broker.ts`.
- **Complexity Cost:** Low.
- **Regression Risk:** Very low.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 14: Energy History Card Request Dropping Race Condition
- **Current Owners:** `src/cards/energy-history/energy-history-card.ts` (lines 184–185)
- **Duplicated Behaviour:**
  `if (this._loading || ...) return;` drops subsequent date-change requests while a previous fetch is in-flight, leaving charts desynchronized from the date selector.
- **Number of Implementations:** 1 card bug.
- **Behaviourally Equivalent:** N/A.
- **Domain:** Energy Domain State
- **Proposed Owner:** `src/cards/energy-history/energy-history-card.ts`
- **Expected Benefit:** Reliable date navigation without dropped fetches; discards stale sequence results properly.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 15: State-Confirmed Action State Machine (Garage Door vs `waitForEntityState`)
- **Current Owners:**
  - `src/cards/garage-door/garage-door-card.ts` (custom `_waitForConfirmation` in `willUpdate()`)
  - `src/cards/media-row/media-row-card.ts` (uses `waitForEntityState`)
  - `src/cards/wled/wled-card.ts` (uses `waitForEntityState`)
  - `src/utils/interaction.ts` (`waitForEntityState`)
- **Duplicated Behaviour:**
  Waiting for an entity state to transition to an expected value following a service call, with timeout and cancellation.
- **Number of Implementations:** 2 mechanisms (`waitForEntityState` utility vs bespoke `willUpdate` hook in garage door).
- **Behaviourally Equivalent:** Yes. `garage-door-card` re-implemented entity state polling manually.
- **Domain:** Interaction / Entity Polling
- **Proposed Owner:** `src/utils/interaction.ts` (`waitForEntityState`)
- **Expected Benefit:** Simplifies `garage-door-card.ts` by ~40 LOC, removes fragile `willUpdate` polling hooks, uses standard `AbortController`.
- **Complexity Cost:** Very low.
- **Regression Risk:** Very low.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE`

---

## Candidate 16: Area Entity Status & Room Diagnostics Derivation
- **Current Owners:**
  - `src/cards/room-directory/room-directory-card.ts` (lines 91–160: `_areaStatus`)
  - `src/cards/room-navigation/room-navigation-card.ts` (lines 97–175: `_getStatus`)
  - `src/cards/household-attention/household-attention-card.ts` (lines 127–243: `_issues`)
- **Duplicated Behaviour:**
  Filtering registry entities by area/device, counting active lights, selecting primary room temperature sensor with noise/hardware blocklist, detecting critical hazard binary sensors (`smoke`, `gas`, `moisture`), and summarizing status.
- **Number of Implementations:** 3 cards.
- **Behaviourally Equivalent:** Conceptually identical; divergent blocklists and temperature precision caused inconsistencies.
- **Domain:** Domain Models / Area
- **Proposed Owner:** `src/services/registry/area-summary.ts` (or `src/services/domains/area-model.ts`)
- **Expected Benefit:** Single domain authority for area status diagnostics; unified temperature selection with noise blocklists; consistent hazard thresholds.
- **Complexity Cost:** Low.
- **Regression Risk:** Low.
- **Styling Risk:** None (presentation strings and icons remain unchanged).
- **Public API Impact:** None.
- **Recommendation:** `MOVE TO DOMAIN OWNER`

---

## Candidate 17: Date Formatting & Calendar Day Range Domain Leak
- **Current Owners:**
  - `src/utils/formatting.ts` (lines 86–139: `calendarDayRange`)
  - `src/cards/welcome-header/welcome-header-card.ts` (local `_locale`, `_timeZone`, `_number`)
  - `src/cards/home-overview/home-overview-card.ts` (local `_locale`, `_timeZone`)
- **Duplicated Behaviour:**
  - `calendarDayRange` is a specialized 54-line timezone/energy query boundary calculator placed inside general string formatting.
  - `welcome-header` and `home-overview` re-implemented `localeOf` and `timeZoneOf` locally.
- **Number of Implementations:** 3 locations.
- **Behaviourally Equivalent:** Yes.
- **Domain:** Formatting / Energy Domain
- **Proposed Owner:**
  - Reusable date/number formatting: `src/utils/formatting.ts`
  - Energy calendar day boundary math: `src/services/energy/energy-store.ts` (re-exported if needed)
- **Expected Benefit:** Domain cleanliness; cards reuse `localeOf` / `timeZoneOf` / `numberFormat` from `src/utils/formatting.ts`.
- **Complexity Cost:** Very low.
- **Regression Risk:** None.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `MERGE EXISTING UTILITIES`

---

## Candidate 18: Card-Level Interaction Handle Lifecycle Management
- **Current Owners:** Over 20 cards in `src/cards/` manually managing `_interactionHandles` array and calling `h.destroy()` on update and disconnect.
- **Duplicated Behaviour:** Imperative DOM querying, handle destruction, and loop-cleanup across cards.
- **Number of Implementations:** 20+ cards.
- **Behaviourally Equivalent:** Yes.
- **Domain:** Component UI Lifecycle
- **Proposed Owner:** Component local or lifecycle controller helper.
- **Complexity Cost vs Benefit:** High complexity risk to rewrite all 20+ cards to a directive or new base lifecycle during this pass.
- **Recommendation:** `KEEP LOCAL` (Keep cards' local interaction setup to avoid touch/gesture event timing regressions across 20+ cards while ensuring all handles properly destroy).

---

## Candidate 19: Micro-Styling & Per-Card CSS Tokens
- **Current Owners:** Various `.styles.ts` files across cards.
- **Duplicated Behaviour:** Similar CSS variable fallbacks, font weights, paddings, and animations.
- **Number of Implementations:** Many.
- **Behaviourally Equivalent:** Similar but subtly distinct per card geometry.
- **Domain:** Styling / Visual
- **Proposed Owner:** Card-local style sheets.
- **Complexity Cost vs Benefit:** Extremely high styling regression risk. Violates constraint: "Do not touch near-duplicate micro-styling."
- **Recommendation:** `KEEP LOCAL`

---

## Candidate 20: Missing Contract Tests for Standalone Cards & Fallback Editors
- **Current Owners:**
  - `src/cards/action-tile/action-tile-card.ts`
  - `src/cards/metric-badge/metric-badge-card.ts`
  - `src/cards/quick-bar/quick-bar-card.ts`
  - `src/cards/status-card/status-card-card.ts`
  - `src/cards/action-tile/action-tile-editor.ts`
  - `src/cards/status-card/status-card-editor.ts`
- **Duplicated Behaviour:** Standalone cards defined and exported in `src/index.ts` with 0 test coverage.
- **Number of Implementations:** 6 untested components.
- **Behaviourally Equivalent:** N/A.
- **Domain:** Testing & Safety Nets
- **Proposed Owner:** `tests/contracts/standalone-cards.test.ts`
- **Expected Benefit:** Establishes complete behavioral safety net for all 48 cards and editors prior to refactoring.
- **Complexity Cost:** Low.
- **Regression Risk:** Zero.
- **Styling Risk:** None.
- **Public API Impact:** None.
- **Recommendation:** `CENTRALISE` (Implement test suite)

---

## Summary Candidate Table

| Candidate | Proposed Action | Recommended Status |
|---|---|---|
| **1. Registry Coordinator & WS Subscriptions** | Route all cards to `centralRegistry`, eliminate duplicate WS queries | `CENTRALISE` |
| **2. Registry Types** | Merge schema properties in `src/types/registry.ts` & re-export | `MERGE EXISTING UTILITIES` |
| **3. Entity Availability & Active Checks** | Centralize `isEntityAvailable`, `isEntityActive` in `src/utils/entity.ts` | `CENTRALISE` |
| **4. Domain Extraction (`computeDomain`)** | Standardize on `computeDomain` in `src/utils/entity.ts` | `MERGE EXISTING UTILITIES` |
| **5. Entity Display Name Resolution** | Centralize `computeEntityDisplayName` in `src/utils/entity.ts` | `CENTRALISE` |
| **6. Custom Event (`fireEvent`)** | Canonical `fireEvent` in `src/utils/navigation.ts`, remove collision | `MERGE EXISTING UTILITIES` |
| **7. Navigation Routing (`navigateTo`)** | Conform `location-changed` payload in `src/utils/navigation.ts` | `MERGE EXISTING UTILITIES` |
| **8. Dead Base Card (`PresentationalBaseCard`)** | Delete dead file (0 consumers) | `REMOVE DEAD ABSTRACTION` |
| **9. Base Class Bloat (`LitBaseCard`)** | Strip unused prototype wrappers, merge `HaBaseCard` | `MERGE EXISTING UTILITIES` |
| **10. Dead Registry Resolvers (L315–667)** | Strip dead code from `dashboard-registry.ts` | `REMOVE DEAD ABSTRACTION` |
| **11. Dead Editors & Preference Services** | Delete `dashboard-preference-editor.ts`, `backend-preferences.ts`, `registry-health.ts` | `REMOVE DEAD ABSTRACTION` |
| **12. Wall-Clock Minute Scheduler** | Centralize `createMinuteScheduler` in `src/utils/lifecycle.ts` | `CENTRALISE` |
| **13. Memory Leak in Broker Contexts** | Prune context maps and fix double-refresh in `async-broker.ts` | `CENTRALISE` |
| **14. Energy History Request Dropping** | Fix `_loading` guard with sequence tokens in `energy-history-card.ts` | `CENTRALISE` |
| **15. State-Confirmed Polling Engine** | Standardize `garage-door-card.ts` onto `waitForEntityState` | `CENTRALISE` |
| **16. Area Diagnostics & Rollup Model** | Create `src/services/registry/area-summary.ts` domain model | `MOVE TO DOMAIN OWNER` |
| **17. Date & Timezone Formatting** | Consolidate `localeOf`/`timeZoneOf` in `src/utils/formatting.ts` | `MERGE EXISTING UTILITIES` |
| **18. Card Interaction Handle Loop** | Preserve local component handle destruction | `KEEP LOCAL` |
| **19. Micro-Styling & Token Overrides** | Preserve local card styles unchanged | `KEEP LOCAL` |
| **20. Standalone Card Contract Tests** | Add comprehensive test suite for untested standalone cards | `CENTRALISE` |

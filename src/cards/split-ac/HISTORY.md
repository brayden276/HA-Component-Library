# Component History: Split-System Controller (`component-split-controller-v4`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-split-controller-v4`
- **Card Type:** `custom:component-split-controller-v4`
- **Class:** `ComponentSplitControllerV4`
- **Directory:** `src/cards/split-ac/`

---

## 2. Intended Functionality
- **Domain Role:** Dedicated split-system air conditioning controller designed for high visual feedback, responsive container sizing, and deep HVAC control (modes, fans, louvers, timers).
- **Config Contract:**
  - `entity` (required, string): Climate entity ID (e.g. `climate.living_room_ac`).
  - `title` (optional, string): Custom title overriding friendly name.
  - `vertical_vane_entity` / `vertical_vane` (optional, string): Select entity controlling vertical vane swing/positions.
  - `horizontal_vane_entity` / `horizontal_vane` (optional, string): Select entity controlling horizontal vane swing/positions.
  - `timer_entity` (optional, string): Timer/schedule entity for AC sleep timers.
  - `settings_entities` (optional, string[]): Array of auxiliary entities for advanced options.
  - `profile_entities` (optional, string[]): Array of profile presets.
- **Interactive & Presentation Rules:**
  - Dynamic HVAC status: Animated temperature hero with current ambient vs target temperature, target temp step calculation, and active cooling/heating state glow.
  - Panel Overlays: Slide-over panels for HVAC mode selection, fan speed modes, vane position options, and settings.
  - Container Queries: Adapts geometry seamlessly between narrow cards (columns 3-6) and full-width dashboard layouts.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SplitControllerConfig>`.
- **Service Integration:** Directly calls HA `climate` and `select` services with proper payloads.
- **Interaction:** Uses `interaction()` handle on all primary buttons, dials, and steppers with sensory feedback and clean teardown.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified temperature stepping honors `target_temp_step` (defaults to 0.5°).
  - Verified `unavailable()` check guards all vane, timer, and auxiliary select entities.
  - Verified overlay panels close on backdrop click or close button tap.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/devices.test.ts`
- **Browser Smoke Test:** Pass

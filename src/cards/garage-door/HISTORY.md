# Component History: Garage Door Controller (`component-garage-door-controller-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-garage-door-controller-v1`
- **Card Type:** `custom:component-garage-door-controller-v1`
- **Class:** `ComponentGarageDoorControllerV1`
- **Directory:** `src/cards/garage-door/`

---

## 2. Intended Functionality
- **Domain Role:** Safety-first garage door controller specifically tailored for setups pairing a dry-contact momentary operator (`button.*`) with an independent closed-position reed switch (`binary_sensor.*`).
- **Config Contract:**
  - `entity` (required, string): Closed-position reed sensor entity (`binary_sensor` where `off` = closed, `on` = open).
  - `control_entity` (required, string): Momentary trigger entity (`button.*` invoking `button.press`).
  - `availability_entity` (optional, string): Optional secondary connection/health sensor.
  - `confirmation_timeout` / `confirm_timeout` (optional, number): Maximum time in ms to wait for reed sensor state transition before declaring a timeout (minimum 3000ms, defaults to 20000ms).
  - `name` (optional, string): Display title for the garage door.
- **Interactive & Presentation Rules:**
  - Active transition monitoring: Shows pending spinner and operator status ("Opening...", "Closing...") while awaiting sensor confirmation.
  - Unavailability isolation: Clearly distinguishes between controller unavailability (`"Controller unavailable"`) and reed sensor unavailability (`"Door state unavailable"`), preventing misleading false-closed UI states.
  - Message banners: Displays success, warning, and error notifications with timed auto-dismissal.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<GarageDoorControllerConfig>`.
- **State Confirmation Machine:**
  - Implements `_waitForConfirmation(expected)` with `_requestGeneration` token protection.
  - Monitors state transitions inside `willUpdate()` with timeout fallbacks.
  - `_cancelConfirmation()` cleanly clears timers and rejects orphaned promises on reconfiguration or disconnect.
- **Interaction:** Uses `interaction()` handle on trigger button with sensory feedback.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `isEntityUnavailable` handles both `"unavailable"` and `"unknown"` states across control and reed entities.
  - Verified confirmation timers and message timers are destroyed in `disconnectedCallback()`.
  - Verified touch target accessibility (>=44px).
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/devices.test.ts`
- **Browser Smoke Test:** Pass

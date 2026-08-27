# Component History: Camera Controller (`component-camera-controller-v2` & `component-camera-controller-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tags:** `component-camera-controller-v2`, `component-camera-controller-v1` (Legacy Adapter)
- **Card Types:** `custom:component-camera-controller-v2`, `custom:component-camera-controller-v1`
- **Classes:** `ComponentCameraControllerV2`, `ComponentCameraControllerV1`
- **Directory:** `src/cards/camera/`

---

## 2. Intended Functionality
- **Domain Role:** Capability-aware camera dashboard controller providing live snapshots, detection pills (motion, person, vehicle), capability-discovered switch/button controls (siren, spotlight, privacy, restart), and modal live video viewer.
- **Config Contract:**
  - `entity` (optional, string): Camera entity ID (e.g. `camera.front_door`).
  - `device_id` (optional, string): Device ID to discover camera and associated sensor/control capabilities.
  - `profile` (optional, string): Security profile key (defaults to `"household-security"`).
  - `expanded` (optional, boolean): Whether to render expanded capability control panels directly on the card.
- **Interactive & Presentation Rules:**
  - Capability discovery: Dynamically maps controls based on device platform (Reolink, UniFi, Generic, Ring, Nest).
  - Destructive confirmation: 2-step confirmation state machine for sensitive actions (reboot, siren trigger) with auto-reset timer.
  - Modal viewer: Native `<dialog>` sheet with live MJPEG/HLS video stream, snapshot timestamp, and quick-action overlay.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<CameraControllerConfig>`.
- **State Flow:** Integrates with `loadSecurityModel` from `src/services/security/security-runtime.ts`.
- **Event Listeners:** Listens for `ha-component-profile-change` events, cleanly attached in `connectedCallback()` and detached in `disconnectedCallback()`.
- **V1 Backward Compatibility:** `ComponentCameraControllerV1` inherits `ComponentCameraControllerV2` and enforces `custom:component-camera-controller-v1` type contract.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `_confirmTimer` is destroyed on disconnect to prevent orphaned timeouts.
  - Verified offline camera state displays fallback banner and disables live viewer actions.
  - Verified both V1 and V2 custom elements are registered with `registerCard`.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/devices.test.ts`, `tests/contracts/lovelace-yaml-fixtures.test.ts`
- **Browser Smoke Test:** Pass

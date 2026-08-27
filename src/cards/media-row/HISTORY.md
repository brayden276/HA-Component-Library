# Component Audit & History: Media Row

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/media-row`
- **Class:** `ComponentMediaRowV2`
- **Registered Custom Element:** `component-media-row-v2`
- **Registered Card Type:** `custom:component-media-row-v2`
- **Domain Role:** Compact media player row featuring playback status, dynamic metadata titles, and transport controls with feature-bitmask detection.

---

## 2. Intended Functionality

### Purpose & Scope
Media Row provides a streamlined control row for `media_player` entities on dashboards. It presents entity icon, friendly title, formatted playback state (combining operating state and current track title), and transport buttons (previous track, play/pause, next track) governed by entity feature support flags.

### Config Contract (`MediaRowCardConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-media-row-v2'` | Public Lovelace card identifier |
| `icon` | `string` | `'mdi:speaker'` | Leading device/media icon |
| `title` | `string` | `'Media player'` | Display name headline |
| `state` | `string` | `'Playing · Media title'` | Fallback subtitle in preview mode |
| `entity` | `string \| null` | `null` | Target `media_player` entity ID |

### Home Assistant Bindings & Interactions
1. **Feature Detection & Capabilities:**
   - Evaluates `supported_features` attribute via bitmask:
     - `PAUSE` = 1
     - `PREVIOUS_TRACK` = 16
     - `NEXT_TRACK` = 32
     - `PLAY` = 512
   - Disables individual transport buttons if the corresponding feature bit is missing.
2. **Playback Transport Actions:**
   - **Play/Pause Toggle:** Calls `media_player.media_play` or `media_player.media_pause`. Employs optimistic UI state flipping with automatic rollback upon failure or state verification timeout (`waitForEntityState` up to 9000ms).
   - **Previous / Next Track:** Calls `media_player.media_previous_track` and `media_player.media_next_track`.
3. **Details Interaction:**
   - Clicking the title / metadata area triggers `more-info` dialog on the entity.
4. **State Fallbacks & Offline Behavior:**
   - Safely detects `unavailable` and `unknown` entity states, rendering `"Unavailable"` text and disabling all interactive transport buttons.
   - Operates in interactive toggle preview mode when `entity` is unassigned.

### Accessibility (a11y) & Visual Standards
- 44px min touch targets on transport buttons via 44x44px bounding area.
- ARIA semantics: `aria-label="Previous"`, `aria-label="Next"`, dynamic `aria-label="Play"` / `aria-label="Pause"`, `role="button"` and `tabindex="0"` on details identity area.
- High contrast focus rings (`:focus-visible`).

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Lit component extending `LitBaseCard<MediaRowCardConfig>` with `mediaRowCardStyles` + `dashboardBaseCardStyles`.
- **DOM Structure:**
  - `<ha-card>` enclosing `.wrap` 3-column grid (36px icon, identity block, button cluster).
  - Button cluster containing `.btn.previous`, `.btn.main` (play/pause), and `.btn.next`.
- **Concurrency & State Control:**
  - `_busy` guard prevents race conditions from overlapping service requests.
  - Lifecycle cleanup: destroys interaction listeners and releases `_busy` state on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation Applied |
| :--- | :--- | :--- |
| **Availability Fallbacks** | Verified entity state handling for `unavailable` / `unknown`. | Verified; transport buttons disabled and state label displays "Unavailable". |
| **Bitmask Feature Gating** | Supported features bitmask verified against HA Core media player constants. | Fully conforms to standard bitmasks (1, 16, 32, 512). |
| **Lifecycle & Teardown** | Interaction handles destroyed on disconnection and re-render. | Verified in `disconnectedCallback()` and `updated()`. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates title and playback state formatting (`Starboy`).
  - Validates transport button rendering and `getCardSize()` returning 1.
  - Validates disabled transport buttons and `"Unavailable"` label when entity is offline.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.

export * from "./household-directory-card.types";
import type { HouseholdDirectoryConfig } from "./household-directory-card.types";
export * from "./household-directory-card.styles";
import { householdDirectoryCardStyles } from "./household-directory-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  EntityRegistryEntry,
} from "../../types/home-assistant";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { navigateTo } from "../../utils/navigation";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: HouseholdDirectoryConfig = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action",
};

interface DirectoryItem {
  id: string;
  name: string;
  icon: string;
  kind: "nav" | "action" | "entity";
  path?: string;
  entity?: string;
  domain?: string;
  service?: string;
  meta: string;
}

const ACTION_SERVICES: Record<string, string> = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press",
};

@customElement("component-household-directory-v3")
export class ComponentHouseholdDirectoryV3 extends LitBaseCard<HouseholdDirectoryConfig> {
  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  @state()
  private _registry: EntityRegistryEntry[] = [];

  private _unsubRegistry: (() => void) | null = null;
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = householdDirectoryCardStyles;

  public override setConfig(config: HouseholdDirectoryConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registry = data.entities || [];
      });
    }
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this._unsubRegistry && this.hass) {
      this._unsubRegistry = centralRegistry.subscribe(this.hass, (data) => {
        this._registry = data.entities || [];
      });
    }
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (this._registry.length === 0 && this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registry = data.entities || [];
      });
    }
  }

  private _items(): DirectoryItem[] {
    if (!this.hass) return [];
    const out: DirectoryItem[] = [];
    const basePath = this._config?.base_path || "/home-control";

    out.push({
      id: "view:media",
      name: "Media",
      icon: "mdi:speaker-multiple",
      kind: "nav",
      path: `${basePath}/media`,
      meta: "Dashboard view",
    });
    out.push({
      id: "view:all-controls",
      name: "Controls",
      icon: "mdi:tune-variant",
      kind: "nav",
      path: `${basePath}/all-controls`,
      meta: "Dashboard view",
    });
    out.push({
      id: "view:security",
      name: "Security",
      icon: "mdi:shield-home-outline",
      kind: "nav",
      path: `${basePath}/security`,
      meta: "Dashboard view",
    });
    out.push({
      id: "view:energy",
      name: "Energy",
      icon: "mdi:lightning-bolt",
      kind: "nav",
      path: `${basePath}/energy`,
      meta: "Dashboard view",
    });

    const targetLabel =
      this._config?.quick_action_label || "dashboard_quick_action";
    const candidates = this._registry.filter((ent) => {
      if (ent.disabled_by || ent.hidden_by) return false;
      const domain = ent.entity_id.split(".")[0];
      const hasAction = Object.prototype.hasOwnProperty.call(
        ACTION_SERVICES,
        domain,
      );
      const isTodo = domain === "todo";
      if (!hasAction && !isTodo) return false;
      const labels: string[] = Array.isArray(ent.labels) ? ent.labels : [];
      return labels.includes(targetLabel);
    });

    for (const ent of candidates) {
      const state = this.hass.states[ent.entity_id];
      const domain = ent.entity_id.split(".")[0];
      const friendly =
        state?.attributes?.friendly_name ||
        ent.name ||
        ent.original_name ||
        ent.entity_id;
      const icon =
        state?.attributes?.icon || ent.icon || ent.original_icon || "mdi:flash";

      if (domain === "todo") {
        out.push({
          id: ent.entity_id,
          name: friendly.replace(/\s+List$/i, ""),
          icon: icon || "mdi:format-list-checks",
          kind: "entity",
          entity: ent.entity_id,
          meta: "To-do list",
        });
      } else {
        out.push({
          id: ent.entity_id,
          name: friendly,
          icon,
          kind: "action",
          entity: ent.entity_id,
          domain,
          service: ACTION_SERVICES[domain],
          meta: "Quick action",
        });
      }
    }

    return out;
  }

  private async _runAction(item: DirectoryItem): Promise<void> {
    if (!this.hass || !item.domain || !item.service || !item.entity) return;
    await this.hass.callService(item.domain, item.service, {
      entity_id: item.entity,
    });
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const buttons = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>("button.item"),
    );
    const items = this._items();

    buttons.forEach((btn, index) => {
      const item = items[index];
      if (!item) return;

      let primary: (() => void | Promise<void>) | null = null;
      if (item.kind === "nav" && item.path) {
        primary = () => navigateTo(item.path);
      } else if (item.kind === "action") {
        primary = () => this._runAction(item);
      } else if (item.kind === "entity" && item.entity) {
        primary = () => this.moreInfo(item.entity);
      }

      if (primary) {
        this._interactionHandles.push(
          interaction(btn, {
            primary,
            feedback: true,
          }),
        );
      }
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const items = this._items();

    return html`
      <ha-card>
        <div class="head">
          <div class="title-row">
            <ha-icon
              icon="${this._config.icon || "mdi:gesture-tap-button"}"
            ></ha-icon>
            <h2>${this._config.title || "Quick actions"}</h2>
          </div>
        </div>

        <div class="list">
          ${items.map(
            (item) => html`
              <button
                class="item"
                type="button"
                aria-label="${item.name}: ${item.meta}"
              >
                <span class="icon">
                  <ha-icon icon="${item.icon}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${item.name}</span>
                  <span class="meta">${item.meta}</span>
                </span>
                <span class="arrow">
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </span>
              </button>
            `,
          )}
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-household-directory-v3",
  element: ComponentHouseholdDirectoryV3,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory.",
});

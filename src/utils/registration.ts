export type { CustomCardEntry } from "../types/home-assistant";
import "../editor/config-editor";

export interface CardRegistrationOptions {
  type: string;
  element: CustomElementConstructor & {
    stubConfig?: Record<string, unknown>;
    getStubConfig?: (
      hass?: any,
      entities?: string[],
      entitiesFallback?: string[],
    ) => Record<string, unknown>;
    getConfigElement?: () => HTMLElement;
  };
  name: string;
  description: string;
  preview?: boolean;
}

export const installConfigContract = (
  type: string,
  element: CustomElementConstructor & {
    stubConfig?: Record<string, unknown>;
    getStubConfig?: (
      hass?: any,
      entities?: string[],
      entitiesFallback?: string[],
    ) => Record<string, unknown>;
    getConfigElement?: () => HTMLElement;
  },
): void => {
  if (!element.getStubConfig) {
    element.getStubConfig = () => ({
      ...(element.stubConfig || {}),
    });
  }
  if (!element.getConfigElement) {
    element.getConfigElement = () => {
      const editor = document.createElement(
        "ha-component-library-config-editor",
      ) as HTMLElement & { cardType?: string };
      editor.cardType = type;
      return editor;
    };
  }
};

export const registerCard = (options: CardRegistrationOptions): void => {
  const { type, element, name, description, preview = true } = options;

  installConfigContract(type, element);

  if (!customElements.get(type)) {
    customElements.define(type, element);
  }

  if (typeof window !== "undefined") {
    window.customCards = window.customCards || [];
    if (!window.customCards.some((card) => card.type === type)) {
      window.customCards.push({
        type,
        name,
        description,
        preview,
      });
    }
  }
};

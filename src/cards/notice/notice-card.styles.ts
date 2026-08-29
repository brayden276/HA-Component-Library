import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, feedbackStyles } from "../../styles";

export const noticeCardStyles: CSSResultGroup = [
  cardBaseStyles,
  feedbackStyles,
  css`
    .message {
      color: inherit;
      opacity: 0.9;
    }
    .notice-box.actionable {
      cursor: pointer;
    }
    .notice-box.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];

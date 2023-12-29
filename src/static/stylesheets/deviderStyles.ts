import { css } from "@emotion/css";

export const useDividerStyles = () => ({
  root: css`
    width: 100%;

    .MuiDivider-root {
      color: #000000;
      border-color: #bebebe;
      font-size: 20px;
      margin-top: 7px;

      span {
        padding: 10px 20px;
      }
    }
  `,
});

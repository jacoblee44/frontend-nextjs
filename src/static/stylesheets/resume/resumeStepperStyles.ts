import { css } from "@emotion/css";

export const useResumeStepperStyles = () => ({
  root: css`
    padding: 20px 170px;

    @media only screen and (max-width: 700px) {
      padding: 20px;
    }
    svg {
      @media only screen and (max-width: 700px) {
        font-size: 20px;
      }
    }
    .space-element {
      @media only screen and (max-width: 700px) {
        display: none;
      }
    }
  `,
});

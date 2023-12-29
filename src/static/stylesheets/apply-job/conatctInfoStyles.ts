import { css } from "@emotion/css";

export const useContactInfoStyles = () => ({
  root: css`
    padding-top: 20px;
    .info-box {
      h2 {
        color: #000000;
        font-size: 24px;
        font-weight: 600;
        font-family: "Urbanist", serif;
        @media only screen and (max-width: 450px) {
          font-size: 22px;
        }
      }

      h4 {
        font-size: 16px;
        color: #000000;
        font-weight: 600;
        padding-top: 20px;
        font-family: "Urbanist", serif;

        @media only screen and (max-width: 450px) {
          font-size: 20px;
        }
      }

      p {
        color: #000000;
      }

      .css-1xnamfg {
        text-align: right;
      }
      .ph-number {
        font-size: 16px;
      }
    }
  `,
});

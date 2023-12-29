import { css } from "@emotion/css";

export const useReviewVisibilityFormStyles = () => ({
  root: css`
    font-family: "Urbanist";
    .box {
      h2 {
        color: #000000;
        font-size: 36px;
        padding-bottom: 20px;
      }

      h3 {
        font-size: 24px !important;
        color: #000000;
        margin-bottom: 20px;
      }

      span {
        color: #000000;
        font-size: 18px;
        font-weight: 300;
      }

      a {
        color: #6d5086;
        text-decoration: underline;
      }

      .bottom {
        width: 100%;
        display: flex;
        gap: 0.6em;
        justify-content: end;
      }
    }
  `,
});

// .bottom{
//     width: 180px;
//     float: right;
// }

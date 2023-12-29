import { css } from "@emotion/css";

export const useReviewApplicationStyles = () => ({
  root: css`
    padding-top: 20px;
    p.please-review {
      font-size: 24px !important;
    }
    .css-69i1ev,
    .css-1o2jhdo {
      p {
        font-size: 18px;
      }
    }

    .review-box {
      background: #fafafa 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 30px;
      @media only screen and (max-width: 450px) {
        padding: 15px;
      }

      hr {
        margin-top: 2px !important;
        margin-bottom: 15px !important;
      }

      .single-box {
        h4 {
          font-size: 16px;
          color: #000000;
          font-family: "Urbanist", serif;
          font-weight: 400;
          @media only screen and (max-width: 450px) {
            font-size: 16px;
          }
        }

        h2 {
          font-size: 16px;
          color: #000000;
          font-family: "Urbanist", serif;
          font-weight: 600;

          @media only screen and (max-width: 450px) {
            font-size: 18px;
          }
        }
      }

      .info {
        text-align: left;
        p {
          color: #000000;
          font-size: 15px;
          @media only screen and (max-width: 450px) {
            font-size: 16px;
          }
        }
      }

      p.css-thk21g-MuiTypography-root {
        text-transform: capitalize;
        font-size: 24px;
      }
      div {
        p {
          font-size: 18px;
        }
      }
      .css-150rnjc {
        p {
          font-size: 10px;
        }
      }
      .card {
        h2 {
          font-size: 16px;
          font-weight: 600;
          padding: 0 !important;
          color: #000000;

          @media only screen and (max-width: 450px) {
            font-size: 18px;
          }
        }

        h4 {
          color: #000000;
          font-size: 15px;
          @media only screen and (max-width: 450px) {
            font-size: 20px;
          }
        }

        p {
          color: #5a5a5a;
          font-size: 14px;
          @media only screen and (max-width: 450px) {
            font-size: 20px;
          }
        }
      }
    }
    .css-10mm31u {
      padding: 16px;
      margin-top: 14px;
      p {
        font-size: 16px;
      }
    }
    p.css-1zl80c-MuiTypography-root {
      font-size: 16px;
      margin-top: 12px;
    }
    p.css-1dz1qcm-MuiTypography-root {
      font-size: 16px;
    }
    button {
      width: 260px;
      height: 55px;
    }
    p {
      font-size: 16px;
    }
  `,
});

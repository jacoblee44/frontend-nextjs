import { css } from "@emotion/css";

export const useResumeAddStyles = () => ({
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
      div {
        label {
          font-size: 13px !important;
        }
      }

      .resume-box {
        background: #fafafa 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        padding: 30px;
        margin: 30px 0;
      }

      .css-1xnamfg {
        text-align: right;
      }

      .details-box {
        h2 {
          font-size: 18px;
          font-family: "Urbanist", serif;
          font-weight: 600;
          color: #000000;
          text-transform: capitalize;

          @media only screen and (max-width: 450px) {
            font-size: 20px;
          }
        }

        h5 {
          font-size: 15px;
          font-family: "Urbanist", serif;
          font-weight: 500;
          color: #000000;

          @media only screen and (max-width: 450px) {
            font-size: 16px;
          }
        }
      }
    }
  `,
});

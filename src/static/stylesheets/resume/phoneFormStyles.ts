import { css } from "@emotion/css";

export const usePhoneFormStyles = () => ({
  root: css`
    font-family: "Urbanist";
    p {
      font-size: 20px;

      @media only screen and (max-width: 900px) {
        top: -55px;
      }
      @media only screen and (max-width: 700px) {
        font-size: 16px;
        top: -60px;
      }
    }

    svg {
      @media only screen and (max-width: 900px) {
        font-size: 20px;
      }
    }

    .box {
      h2 {
        color: #000000;
        padding-bottom: 15px;
        font-size: 30px;
        @media only screen and (max-width: 1024px) {
          font-size: 25px;
          padding-bottom: 0px;
        }
        @media only screen and (max-width: 500px) {
          font-size: 20px;
          margin-top: 10px;
        }
      }
      label {
        @media only screen and (max-width: 500px) {
          font-size: 14px;
        }
      }
      p {
        @media only screen and (max-width: 500px) {
          font-size: 13px;
        }
      }

      input {
        @media only screen and (max-width: 500px) {
          font-size: 15px;
          height: 40px;
        }
      }
      button {
        float: right;
        @media only screen and (max-width: 500px) {
          width: 110px;
          height: 38px;
          font-size: 15px;
        }
      }

      .MuiFormControlLabel-label {
        color: #000000;
        font-size: 20px;
      }

      .info {
        font-size: 18px;
        color: #000000;
        padding-top: 20px;
      }
    }
  `,
});

import { css } from "@emotion/css";

export const useNameFormStyles = () => ({
  root: css`
    font-family: "Urbanist";
    p {
      font-size: 20px;
      @media only screen and (max-width: 900px) {
        font-size: 16px;
        top: -52px;
      }
    }
    .box {
      h2 {
        color: #000000;
        font-size: 30px;
        @media only screen and (max-width: 1024px) {
          font-size: 25px;
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
    }
  `,
});

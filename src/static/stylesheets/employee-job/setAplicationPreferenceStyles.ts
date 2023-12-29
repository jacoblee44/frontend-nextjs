import { css } from "@emotion/css";

export const useSetApplicationPreferenceFormStyles = () => ({
  root: css`
    padding: 30px 180px;
    font-family: "Urbanist", sans-serif !important;

    @media only screen and (max-width: 1280px) {
      padding: 30px 100px;
    }

    @media only screen and (max-width: 780px) {
      padding: 20px 50px;
    }

    @media only screen and (max-width: 500px) {
      padding: 10px 20px;
    }

    .box {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      padding: 40px;
      margin-bottom: 30px;

      @media only screen and (max-width: 450px) {
        padding: 20px;
      }

      h5 {
        display: flex;
        align-items: center;
        color: #000000;
        gap: 10px;
      }

      h2 {
        font-family: "Urbanist", sans-serif !important;
        font-size: 20px;
        color: #000000;
        font-weight: 600;

        @media only screen and (max-width: 450px) {
          font-size: 18px;
        }
      }

      h3 {
        font-family: "Urbanist", sans-serif !important;
        color: #000000;
        font-size: 16px;
        font-weight: 600;

        @media only screen and (max-width: 450px) {
          font-size: 15px;
        }
      }

      p {
        font-family: "Urbanist", sans-serif !important;
        color: #000000;
        font-weight: 300;
        font-size: 18px;
        padding-top: 10px;

        @media only screen and (max-width: 450px) {
          font-size: 14px;
        }
      }

      .file {
        color: #6D5086;
        font-weight: 600;
      }

      span {
        color: #000000;
      }

      .chip {
        display: flex;
        flex-flow: wrap;
      }

      input, select {
        background: #F7F6FB !important;

        @media only screen and (max-width: 450px) {
          margin-top: 10px;
        }
      }

      .text-box {
        margin-top: 20px;

        .css-1gmvpva {
          margin-top: 0;
        }
      }

      .radio-box {
        border: 1px solid #bebebe;
        border-radius: 10px;
        padding: 10px 15px;
        align-items: center;
        margin: 20px 0;
        min-height: 45px;

        span {
          font-family: "Urbanist", sans-serif !important;
          color: #000000;
          font-weight: 500;
          font-size: 17px;
        }

        p {
          padding-left: 30px;
          padding-top: 0;
          font-weight: 300;
          font-size: 15px;
          margin-top: -10px;
        }
      }

    }

    .ddate .MuiGrid-item {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }

    .bottom {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      width: 100%;
      padding: 30px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      @media only screen and (max-width: 450px) {
        flex-direction: column;
        text-align: left;
      }

      button {
        margin-top: 0;

        @media only screen and (max-width: 450px) {
          width: 180px;
          font-size: 18px;
        }

      }
    }
  `,


});

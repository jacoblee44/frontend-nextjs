import { css } from "@emotion/css";

export const useJobDetailsStyles = () => ({
  root: css`
    padding: 30px 180px;

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

      @media only screen and (max-width: 400px) {
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
          font-size: 17px;
        }
      }

      p {
        font-family: "Urbanist", sans-serif !important;
        color: #000000;
        font-weight: 300;
        font-size: 18px;
        @media only screen and (max-width: 450px) {
          font-size: 14px;
        }
      }

      span {
        color: #000000;
      }

      .chip {
        display: flex;
        flex-flow: wrap;
        gap: 20px;
        margin-top: 20px;
      }

      input, select {
        background: #ffffff !important;
        font-size: 15px;
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
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        height: 45px;

        span {
          color: #000000;
          font-weight: normal;
        }
      }
    }

    .bottom {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      width: 100%;
      padding: 30px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      button {
        margin-top: 0;

        @media only screen and (max-width: 450px) {
          width: 120px;
          height: 45px;
          padding: 5px 10px;
        }
      }
    }
  `,


});

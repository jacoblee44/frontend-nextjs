import { css } from "@emotion/css";

export const useBasicInformationStyles = () => ({
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
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #F7F6FB 0% 0% no-repeat padding-box;
      //box-shadow: 0px 0px 20px #00000040;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      padding: 40px;
      margin-bottom: 30px;

      svg {
        cursor: pointer;
        color: #4c4c4c;
      }

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

        @media only screen and (max-width: 400px) {
          font-size: 17px;
        }
      }

      p {
        font-family: "Urbanist", sans-serif !important;
        color: #000000;
        font-weight: 300;
        font-size: 18px;

        @media only screen and (max-width: 400px) {
          font-size: 14px;
        }
      }

      span {
        color: #000000;
      }

      input {
        background: #ffffff;
        font-size: 15px;

        @media only screen and (max-width: 400px) {
          margin-top: 10px;
        }
      }

      .radio-box {
        border: 1px solid #bebebe;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        height: 48px;

        span {
          color: #171717;
          font-size: 15px;

          @media only screen and (max-width: 450px) {
            font-size: 12px;
          }
        }
      }

      .address-card-container {
        margin-top: 8px;
      }

      .address-input {
        padding-top: 20px;

        h1 {
          font-size: 24px;
          font-weight: 600;
          color: #000000;
          font-family: "Urbanist", sans-serif !important;
        }
      }

      .not-report {
        padding-top: 20px;

        h2 {
          font-size: 24px;
          font-weight: 600;
        }

        p {
          font-size: 18px;
        }
      }
    }

    .bottom {
      font-family: "Urbanist", sans-serif !important;
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      width: 100%;
      padding: 30px;
      margin-top: 30px;
      text-align: end;

      @media only screen and (max-width: 400px) {
        flex-direction: column;
        text-align: center;
      }

      button {
        margin-top: 0;

      }
    }
  `,


});

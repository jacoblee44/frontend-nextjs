import { css } from "@emotion/css";

export const useCertificationFormStyles = () => ({
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

    .box {
      h2 {
        color: #000000;
        font-size: 30px;
        padding-bottom: 20px;
        @media only screen and (max-width: 1024px) {
          font-size: 25px;
          padding-bottom: 0px;
        }
        @media only screen and (max-width: 500px) {
          font-size: 20px;
          margin-top: 10px;
        }
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

      .skills {
        div {
          div {
            @media only screen and (max-width: 500px) {
              border-radius: 5px !important;
              margin-top: 10px !important;
              padding: 5px 15px;
            }
          }

          p {
            @media only screen and (max-width: 500px) {
              font-size: 16px !important;
              font-weight: 500;
            }
          }
          span {
            @media only screen and (max-width: 500px) {
              width: 17px !important;
            }
          }
        }

        p {
          color: #6d5086;
          font-size: 16px;
        }

        img {
          cursor: pointer;
        }
      }

      label {
        @media only screen and (max-width: 500px) {
          font-size: 14px;
          padding-top: 0;
        }
      }

      input,
      select {
        @media only screen and (max-width: 500px) {
          font-size: 15px;
          height: 40px;
        }
      }

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        button {
          border: 2px solid #6d5086;
          margin-top: 28px;
          border-radius: 10px;
          padding: 9px 0;
          width: 100%;
        }
        .inputs-group {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: end;
          @media only screen and (max-width: 500px) {
            flex-direction: column;
            width: 100%;
          }

          .i-group {
            width: 42%;
            @media only screen and (max-width: 500px) {
              width: 100%;
            }
          }
          .g-button {
            width: 10%;
            @media only screen and (max-width: 500px) {
              width: 100%;
              margin-top: -8px;
            }
          }
        }
      }

      .suggest {
        border: 2px solid #6d5086;
        padding: 10px 15px;
        display: flex;
        justify-content: start;
        border-radius: 10px;
        margin-top: 20px;
        align-items: center;
        cursor: pointer;

        p {
          color: #6d5086;
          font-size: 20px;
        }
      }

      .bottom {
        width: 180px;
        float: right;
        margin: 20px 0;
        direction: rtl;
        button {
          width: 150px;
          height: 50px;
          @media only screen and (max-width: 500px) {
            width: 110px;
            height: 38px;
            font-size: 15px;
          }
        }
      }
    }
  `,
});

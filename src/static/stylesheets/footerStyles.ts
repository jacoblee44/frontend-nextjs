import { css } from "@emotion/css";

export const useFooterStyles = () => ({
  root: css`
    font-family: "Quasimoda", serif;
    background: #1b113f;
    padding-top: 110px;
    padding-right: 190px;
    padding-left: 190px;
    transition: all 0.3s;
    padding-bottom: 60px;

    * {
      transition: all 0.3s;
    }

    @media only screen and (max-width: 1400px) {
      padding-top: 70px !important;
      padding-right: 90px !important;
      padding-left: 90px !important;
      padding-bottom: 70px !important;
    }

    @media only screen and (max-width: 1200px) {
      padding-top: 50px !important;
      padding-right: 50px !important;
      padding-left: 50px !important;
      padding-bottom: 50px !important;
    }

    @media only screen and (max-width: 550px) {
      padding-top: 50px !important;
      padding-right: 10px !important;
      padding-left: 10px !important;
      padding-bottom: 50px !important;
    }

    @media only screen and (max-width: 550px) {
      padding-top: 50px !important;
      padding-right: 90px !important;
      padding-left: 90px !important;
      padding-bottom: 50px !important;
    }

    @media only screen and (max-width: 490px) {
      padding: 20px !important;
    }

    .logo-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 250px;

        @media only screen and (max-width: 1200px) {
          width: 180px;
        }

        @media only screen and (max-width: 450px) {
          width: 160px;
        }
      }

      @media only screen and (max-width: 900px) {
        padding-top: 20px !important;
        padding-bottom: 20px !important;
      }
    }

    h3 {
      padding-bottom: 20px;
      font-size: 24px;
      color: #ffffff;
      font-weight: bold;

      @media only screen and (max-width: 1200px) {
        font-size: 20px;
      }

      @media only screen and (max-width: 1000px) {
        font-size: 17px;
        padding-bottom: 0;
      }

      @media only screen and (max-width: 450px) {
        font-size: 15px;
        padding-bottom: 0;
      }
    }

    a {
      font-size: 14px;
      color: #ffffff;
      padding: 5px;

      @media only screen and (max-width: 1000px) {
        font-size: 13px !important;
      }

      @media only screen and (max-width: 450px) {
        font-size: 14px !important;
        padding: 2px;
        * {
          font-size: 14px !important;
        }
      }
    }

    .social-icon {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .MuiButtonBase-root {
        margin: 10px 15px;
      }
      button {
        @media only screen and (max-width: 450px) {
          width: 33px;
        }
      }
    }

    .copyright-text {
      p {
        @media only screen and (max-width: 450px) {
          font-size: 13px;
        }
      }
    }
  `,
});

import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useForgetPasswordStyles = () => ({
  root: css`
    min-height: 100vh;
    font-family: 'Urbanist', serif;
    * {
      transition: all 0.5s !important;
    }
  `,

  leftSide: css`
    background: ${themeColors.secondary};
    width: 100%;

    @media only screen and (max-width: 899px) {
      display: none;
    }


    .logo {
      position: relative;
      top: 80px;
      display: flex;
      width: 280px;
      height: 110px;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      margin-bottom: 230px;
      cursor: pointer;
    }

    .hero-image {
      width: 560px;
      padding: 20px;
      margin: 0 auto;

      @media only screen and (max-width: 1100px) {
        width: 350px;
      }

      @media only screen and (max-width: 580px) {
        width: 350px;
      }
      @media only screen and (max-width: 380px) {
        width: 320px;
      }

      img {
        width: 100%;
        margin: 0 auto;
      }
    }
  `,

  rightSide: css`
    background: #FAFAFA;
    width: 100%;

    .login-form {
      padding: 60px 0;
      width: 474px;
      margin: 0 auto;

      @media only screen and (max-width: 1000px) {
        width: 400px;
        padding: 40px 10px;
      }

      @media only screen and (max-width: 700px) {
        width: 380px;
        padding: 40px 10px;
      }

      @media only screen and (max-width: 400px) {
        width: 100%;
        padding: 40px 30px;
      }

      h3 {
        color: #6D5086;
        font-weight: bold;
        text-align: center;
        font-size: 36px;
        margin-bottom: 40px;
      }

      a {
        font-size: 24px;
        color: #6D5086;
        text-decoration: none;
        margin-top: 15px;
        display: flex;
        align-items: center;

        svg {
          margin-top: 5px;
          margin-left: 15px;
        }
      }

      .text-input-label {
        font-size: 16px;
        color: #282828;
      }

      .text-input {
        border: 1px solid #c7c7c7;
        :focus {
          border-width: 1px !important;
        }
      }
      
      button {
        font-size: 18px;
      }

      .forgot-password-link {
        text-align: right;
        a {
          display: inline-block;
          font-weight: 500;
        }
      }

      .register-link {
        text-align: center;
        a {
          display: inline-flex;
          font-size: 18px;
          font-weight: 500;
          justify-content: center;
          align-items: center;
        }
      }
    }
  `,
});

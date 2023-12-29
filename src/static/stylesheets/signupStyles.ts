import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useSignUpStyles = () => ({
  root: css`
    min-height: 100vh;
    font-family: 'Urbanist', serif;
    * {
      transition: all 0.5s !important;
    }
  `,

  leftSide:(userType: "contractor" | "employer") => css`
    background: ${userType === "employer" ? themeColors.secondary : themeColors.contractorPrimary};
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

      h1 {
        color: #000000;
        font-size: 40px;
        font-weight: bold;
      }

    }

    .hero-image {
      width: 460px;
      padding: 20px;
      margin: 0 auto;

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

  rightSide: (userType: "contractor" | "employer") => css`
    background: #FAFAFA;
    width: 100%;
    

    .login-form {
      padding-top: 70px;
      width: 474px;
      margin: 0 auto 50px;

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
        color: ${userType === "employer" ? themeColors.secondary : themeColors.contractorPrimary};
        font-weight: bold;
        text-align: center;
        font-size: 36px;
        margin-bottom: 40px;
      }

      .user-type-text {
        text-align: right;

        a {
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        }
      }

      a {
        display: inline-flex;
        color: ${userType === "employer" ? themeColors.secondary : themeColors.contractorPrimary};
        text-decoration: none;
        margin-top: 15px;
        align-items: center;
        justify-content: center;

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

      .submit-button {
        button {
          background: ${userType === "employer" ? themeColors.secondary : themeColors.contractorPrimary} !important;
          border-color: ${userType === "employer" ? themeColors.secondary : themeColors.contractorPrimary} !important;
        }
      }

      .login-link {
        text-align: center;

        a {
          font-size: 18px;
          font-weight: 500;
        }
      }

      .social-signup {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .MuiBox-root {
          margin: 0 7px;
        }
      }

      .privacy-policy {
        color: #6d6d6d;
        font-size: 17px;
        padding-top: 20px;
        
        a {
          margin-top: 0;
        }

        @media only screen and (max-width: 700px) {
          font-size: 15px;
        }
        
        @media only screen and (max-width: 400px) {
          font-size: 14px;
        }
      }


    }
  `,
});

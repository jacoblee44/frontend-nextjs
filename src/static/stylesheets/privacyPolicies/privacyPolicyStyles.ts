import { css } from "@emotion/css";

export const usePrivacyPolicyStyles = () => ({
  root: css`
    background: #fafafa;
    p,
    h2,
    h3 {
      font-family: "Urbanist", serif;
    }

    .banner {
      min-height: 350px;
      background: #6d5086;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      @media only screen and (max-width: 530px) {
        min-height: 250px;
      }

      h2 {
        font-size: 36px;
        color: #ffffff;
        font-weight: 600;
        font-family: "Urbanist", serif;

        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
      }

      p {
        color: #ffffff;
        font-size: 20px;
        padding-top: 30px;
        @media only screen and (max-width: 600px) {
          font-size: 14px;
          padding-top: 10px;
        }
      }

      .back-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 20px;
        font-weight: 600;
        margin-top: 40px;
        cursor: pointer;
        color: #ffffff;
        svg {
          color: #ffffff;
          @media only screen and (max-width: 600px) {
            font-size: 18px;
          }
        }
        @media only screen and (max-width: 600px) {
          font-size: 15px;
          margin-top: 10px;
        }
      }
    }

    .content {
      padding: 60px 200px;

      @media only screen and (max-width: 1024px) {
        padding: 60px 120px;
      }

      @media only screen and (max-width: 830px) {
        padding: 40px 60px;
      }

      @media only screen and (max-width: 530px) {
        padding: 20px 20px;
      }

      h2 {
        color: #6d5086;
        font-size: 36px;
        font-weight: 600;

        @media only screen and (max-width: 600px) {
          font-size: 18px;
        }
      }

      h3 {
        color: #6d5086;
        font-size: 25px;
        font-weight: 600;

        @media only screen and (max-width: 600px) {
          font-size: 16px;
        }
      }

      p {
        color: #8c8c8c;
        font-size: 20px;
        padding: 10px 0;

        @media only screen and (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  `,
});

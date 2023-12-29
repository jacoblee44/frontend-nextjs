import { css } from "@emotion/css";

export const useHelpsUsStyles = () => ({
  root: css`
    background: #fafafa;

    .banner {
      height: 250px;
      background: #6d5086;
      display: flex;
      align-items: center;
      justify-content: center;
      @media only screen and (max-width: 600px) {
        height: 200px;
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
    }

    .box {
      padding: 30px 180px;

      .MuiAccordion-root {
        margin: 20px 0;
        box-shadow: none;
        border-radius: 10px;

        h2 {
          font-weight: 600;
          color: #838383;
          font-size: 26px;
          font-family: "Urbanist", serif;
          @media only screen and (max-width: 768px) {
            font-size: 24px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 16px;
          }
        }
      }

      .Mui-expanded {
        h2 {
          font-weight: 600;
          color: #000000;
          font-size: 26px;
          font-family: "Urbanist", serif;
          @media only screen and (max-width: 768px) {
            font-size: 24px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 16px;
          }
        }
      }

      p {
        color: #838383;
        font-size: 20px;
        font-family: "Urbanist", serif;
        @media only screen and (max-width: 600px) {
          font-size: 13px;
        }
      }

      svg {
        height: 40px;
        width: 40px;
        color: #6d5086;
        @media only screen and (max-width: 600px) {
          height: 30px;
          width: 30px;
        }
      }
      @media only screen and (max-width: 768px) {
        padding: 30px 100px;
      }

      @media only screen and (max-width: 600px) {
        padding: 20px;
      }
    }
  `,
});

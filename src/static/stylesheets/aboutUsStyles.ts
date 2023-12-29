import { css } from "@emotion/css";

export const useAboutUsStyles = () => ({
  root: css`
    padding: 100px 30px;
    margin: 0 180px;
    @media only screen and (max-width: 1100px) {
      padding: 70px 30px;
      margin: 0 90px;
    }

    @media only screen and (max-width: 930px) {
      padding: 40px 20px;
      margin: 0 30px;
    }
    @media only screen and (max-width: 600px) {
      padding: 20px 0px;
      margin: 0 20px;
    }
    p,
    h2,
    h3 {
      font-family: "Urbanist", serif;
    }

    .about-box {
      h2 {
        font-size: 30px;
        font-weight: 600;
        color: #000000;
        @media only screen and (max-width: 930px) {
          font-size: 25px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
      }

      p {
        color: #000000;
        font-size: 18px;
        @media only screen and (max-width: 930px) {
          font-size: 18px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 14px;
        }
      }
    }

    .counter {
      display: flex;
      justify-content: space-between;
      padding: 20px 50px;
      @media only screen and (max-width: 600px) {
        padding: 10px 20px;
        text-align: center;
      }

      @media only screen and (max-width: 450px) {
        flex-direction: column;
      }

      h2 {
        font-size: 40px;
        color: #6d5086;
        font-weight: 600;
        font-family: "Urbanist", serif;
        @media only screen and (max-width: 930px) {
          font-size: 30px;
        }
        @media only screen and (max-width: 750px) {
          font-size: 30px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 30px;
        }
      }

      p {
        color: #000000;
        font-size: 20px;
        @media only screen and (max-width: 930px) {
          font-size: 16px;
        }

        @media only screen and (max-width: 750px) {
          font-size: 16px;
        }
      }
    }
  `,
});

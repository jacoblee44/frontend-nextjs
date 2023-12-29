import { css } from "@emotion/css";

export const useSubmittedJobStyles = () => ({
  root: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    @media only screen and (max-width: 900px) {
      height: auto;
      padding: 20px 0;
    }
    @media only screen and (max-width: 450px) {
      height: auto;
      padding: 20px 0;
    }

    .box {
      width: 830px;
      box-shadow: 0px 0px 20px #00000040;
      background: #f7f6fb;
      border-radius: 10px;
      text-align: center;
      padding: 40px;

      @media only screen and (max-width: 900px) {
        width: 500px;
        padding: 20px;
      }
      @media only screen and (max-width: 450px) {
        width: 400px;
        padding: 20px;
      }
      img {
        width: 130px !important;
        @media only screen and (max-width: 900px) {
          width: 100px !important;
        }
        @media only screen and (max-width: 450px) {
          width: 80px !important;
        }
      }

      h2 {
        font-size: 25px;
        color: #000000;
        font-weight: 600;
        font-family: "Urbanist", serif;
        padding-bottom: 25px;
        @media only screen and (max-width: 900px) {
          font-size: 18px;
          padding-bottom: 15px;
        }
        @media only screen and (max-width: 450px) {
          font-size: 16px;
          padding-bottom: 10px;
        }
      }

      div {
        button {
          @media only screen and (max-width: 900px) {
            height: 45px;
          }

          @media only screen and (max-width: 450px) {
            font-size: 15px;
            height: 40px;
          }
        }
      }

      p {
        font-size: 24px;
        color: #000000;
        font-family: "Urbanist", serif;
        letter-spacing: 0px;
        font-weight: 500;
        text-align: left;
        @media only screen and (max-width: 900px) {
          font-size: 23px;
        }
        @media only screen and (max-width: 450px) {
          font-size: 18px;
        }

        svg {
          width: 20px;
          height: 20px;
          color: #6d5086;
        }
      }

      h4 {
        padding-top: 30px;
        font-size: 24px;
        font-family: "Urbanist", serif;
        font-weight: 300;
        color: #000000;
        @media only screen and (max-width: 450px) {
          font-size: 20px;
        }

        span {
          color: #6d5086;
          text-decoration: underline;
        }
      }
    }
  `,
});

import { css } from "@emotion/css";

export const useResumeStyles = () => ({
  root: css`
    padding: 150px 100px;
    @media only screen and (max-width: 900px) {
      padding: 50px 30px;
    }
    @media only screen and (max-width: 450px) {
      padding: 30px 20px;
    }
    .box {
      background: #f7f6fb 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 40px;
      width: 830px;
      margin: 0 auto;
      @media only screen and (max-width: 900px) {
        width: 600px;
      }

      @media only screen and (max-width: 650px) {
        width: 400px;
      }
      @media only screen and (max-width: 450px) {
        width: 300px;
      }

      h2 {
        font-size: 36px;
        color: #000000;
        font-family: "Urbanist", serif;
        font-weight: 600;

        @media only screen and (max-width: 900px) {
          font-size: 26px;
        }
        @media only screen and (max-width: 450px) {
          font-size: 20px;
          text-align: center;
        }
      }

      p {
        padding-top: 15px;
        color: #5a5a5a;
        font-family: "Urbanist", serif;
        font-weight: 300;
        font-size: 20px;

        @media only screen and (max-width: 900px) {
          font-size: 18px;
        }
        @media only screen and (max-width: 450px) {
          font-size: 16px;
          text-align: center;
        }

        a {
          text-decoration: underline;
        }
      }
    }

    h3 {
      margin-top: 45px;
      text-align: center;
      color: #000000;
      font-size: 28px;
      font-family: "Urbanist", serif;
      font-weight: 600;
      cursor: pointer;

      @media only screen and (max-width: 900px) {
        font-size: 22px;
      }
      @media only screen and (max-width: 450px) {
        font-size: 28px;
        text-align: center;
        margin-top: 25px;
      }
    }
  `,
});

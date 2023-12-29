import { css } from "@emotion/css";

export const useEducationReviewFormStyles = () => ({
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

      .bottom {
        width: 100%;
        display: flex;
        justify-content: end;
        gap: 0.6em;
      }
      .bottom button {
        height: 50px;
        min-width: 150px;
        @media only screen and (max-width: 500px) {
          min-width: 110px;
          height: 38px;
          font-size: 15px;
        }
      }
    }
  `,
});

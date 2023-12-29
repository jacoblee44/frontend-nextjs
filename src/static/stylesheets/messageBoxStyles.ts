import { css } from "@emotion/css";

export const useMessageBoxStyles = () => ({
  root: css`
    display: flex;
    flex-grow: 1;
    height: 92vh;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 880px) {
      padding: 30px;
    }

    .confirm-box {
      width: 830px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #F7F6FB;
      border-radius: 10px;
      text-align: center;
      padding: 40px;

      img {
        width: 220px;
      }

      h2 {
        font-size: 24px;
        color: #000000;
        font-weight: 600;
        font-family: 'Urbanist',serif;
        padding-bottom: 25px;
      }

      p {
        font-size: 17px;
        color: #000000;
        letter-spacing: 0px;
        padding-bottom: 25px;
      }

      @media only screen and (max-width: 880px) {
        width: 100%;
      }
    }
  `,
});

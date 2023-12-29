import { css } from "@emotion/css";

export const useAccountSettingsStyles = () => ({
  root: css`
    padding-top: 40px;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;


    .container-root-employer {
      width: 1240px;

      @media only screen and (max-width: 1570px) {
        width: 100%;
        padding: 0 40px;
      }
    }
    
    .container-root-contractor {
      width: 1240px;

      @media only screen and (max-width: 1340px) {
        width: 100%;
        padding: 0 40px;
      }
    }

    p, h2, h3 {
      font-family: 'Urbanist', serif;
    }

    h2 {
      color: #000000;
      font-size: 26px;
      font-weight: 600;

    }

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 0;
      flex-wrap: wrap;

      @media only screen and (max-width: 750px) {
        flex-direction: column;
        align-items: start;
      }

      .css-19zcry6 {
        margin: 0;
      }

      h3 {
        color: #000000;
        font-size: 19px;
        font-weight: 600;
      }

      h4 {
        color: #000000;
        font-size: 18px;
        font-weight: 300;
      }
    }
  `,
});

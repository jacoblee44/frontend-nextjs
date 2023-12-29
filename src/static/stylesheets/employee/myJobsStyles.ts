import { css } from "@emotion/css";

export const useMyJobsStyles = () => ({
  root: css`
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;

    .container-root {
      width: 1240px;

      @media only screen and (max-width: 1570px) {
        width: 100%;
        padding: 0 30px;
      }
    }
    
    p, h2 {
      font-family: 'Urbanist', serif;
    }

    .my-job {
      .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
        color: #000000;
        font-size: 15px;
        font-family: 'Urbanist', serif;
        padding-right: 20px;
      }

      .css-1aquho2-MuiTabs-indicator {
        background: #6D5086;
        height: 3px;
      }
    }

    .tab-container {
      svg {
        color: #000000;
      }
    }
  `,
});

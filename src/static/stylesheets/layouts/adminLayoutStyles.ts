import { css } from "@emotion/css";

export const useAdminLayoutStyles = () => ({
  root: css`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
  `,
  sidebarPanel: css`
    background: #1B113F;

    @media only screen and (max-width: 1530px) {
      
    }

    @media only screen and (max-width: 1100px) {
      display: none;
    }
  `,
  mainPanel: css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: calc(100% - 230px);
  `,
  headerContainer: css`
    
  `,
  contentContainer: css`
    flex-grow: 1;
    //overflow: auto;
  `,

  sidebarPanelOpen: css`
    width: 244px;
  `,
});
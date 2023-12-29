import { css } from "@emotion/css";

export const useButtonStyles = (height: any = '45px', width: string = '100%', type: any = 'default') => ({
  root: css`
    margin-top: 20px;
    transition: all 0.3s;
    
    * {
      transition: all 0.3s !important;
    }

    button {
      font-family: 'Urbanist', serif;
      background: ${type === "default" ? "#6D5086" : "transparent"};
      color: ${type === "border" ? "#6D5086" : "#ffffff"};
      width: ${width};
      padding: 10px 20px;
      border-radius: 10px;
      border: 2px solid #6D5086;
      font-size: 16px;
      height: ${height};
      cursor: pointer;
      user-select: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      
      :hover {
        opacity: 0.8;
      }
      
      .loader {
        margin-left: 10px;
        color: #ffffff !important;
      }
    }

    button.disabled {
      opacity: 0.8 !important;
      pointer-events: none;
    }
  `,
});

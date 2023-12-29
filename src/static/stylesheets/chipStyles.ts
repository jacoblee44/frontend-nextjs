import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useChipStyles = (bg: boolean = true, height = "45px") => ({
  root: css`
    cursor: pointer;
    height: ${height};
    padding: 0 11px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 8px !important;
    border: 1px solid #bebebe;
    text-transform: capitalize;
    transition: all 0.3s;
    
    * {
      transition: all 0.3s !important;
    }
    
    :hover {
      opacity: 0.4;
    }

    span {
      font-size: 15px !important;
    }

    @media only screen and (max-width: 400px) {
      padding: 5px 8px;

      span {
        font-size: 13px;
      }
    }

    svg {
      color: ${bg ? "#ffffff" : "#000000"};
    }

    span {
      color: ${bg ? "#ffffff !important" : "#000000 !important"};
      font-size: 20px;
    }
  `,

  active: css`
    background: ${themeColors.employerPrimary} !important;
    
    :hover {
      opacity: 0.8;
    }
  `,

});

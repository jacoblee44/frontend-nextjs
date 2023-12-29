import { css } from "@emotion/css";

export const useVisibilityCardStyles = () => ({
  root: css`
    .card{
        display: flex;
        justify-content: space-between;
        align-items: top;
        border: 1px solid #000000;
        padding: 15px 20px;
        margin-bottom: 20px;
        border-radius: 10px;
        gap: 20px;
        cursor: pointer;

        h2{
          font-size: 20px;
          font-weight: 600;
          padding-bottom: 10px;
        }

        h4{
          color: #000000;
          font-size: 18px;
        }

        span{
          width: 44px !important;
          height: 28px !important;
        }
    }
  `,

  
});

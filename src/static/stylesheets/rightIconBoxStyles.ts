import { css } from "@emotion/css";

export const useRightIconBoxStyles = () => ({
  root: css`
    .box{
        border: 2px solid #6D5086;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        margin-top: 20px;
        align-items: center;

        p{
            color: #6D5086;
            font-size: 20px;
        }

        img{
            cursor: pointer;
        }
    }
  `,

  
});

import { css } from "@emotion/css";

export const useLeftIconBoxStyles = (type:any = "border") => ({
  root: css`
    .box{
        border: ${type === "border" ? "2px solid #6D5086" : "2px solid transparent"};
        padding: ${type === "border" ? "10px 15px" : "0px"};
        display: flex;
        justify-content: start;
        border-radius: 10px;
        margin-top: 20px;
        align-items: center;
        cursor: pointer;
        gap: 20px;

        p{
            color: #6D5086;
            font-size: 20px;  
        }

        button{
          border: ${type==="normal" ? "1px solid #000000" : "1 px solid transparent"};
          font-size: 25px;
          border-radius: 100%;
        }
    }
  `,

  
});

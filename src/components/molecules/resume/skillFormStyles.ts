import { css } from "@emotion/css";

export const useSkillFormStyles = () => ({
  root: css`
    font-family: "Urbanist", serif;
    what is your name {
      h2 {
        color: #000000;
        font-size: 36px;
        padding-bottom: 20px;
      }

      h3 {
        font-size: 20px !important;
        color: #000000;
        margin-bottom: 14px;
      }

      span {
        color: #000000;
        font-size: 18px;
        font-weight: 300;
      }

      .skill {
        border: 2px solid #6d5086;
        padding: 3px 8px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        margin-top: 20px;
        align-items: center;

        p {
          color: #6d5086;
          font-size: 16px;
        }

        img {
          cursor: pointer;
        }
      }

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        button {
          border: 2px solid #6d5086;
          margin-top: 28px;
          border-radius: 10px;
          
        }
      }

      .suggest {
        border: 2px solid #6d5086;
        padding: 3px 8px;
        display: flex;
        justify-content: start;
        border-radius: 10px;
        margin-top: 20px;
        align-items: center;
        cursor: pointer;

        p {
          color: #6d5086;
          font-size: 20px;
          margin-right:30px
        }
      }
  
    }
   
      .flex.flex-wrap.suggestions-skills {
        gap: 0em;
        div {
          margin: 2px;
          div {
            padding: 4px 8px;
            margin-top: 4px;
            gap: 0px;
            button {
              font-size: 18px;
            }
          }
          p {
            font-size: 16px;
          }
        }
      }
      .bottom {
        margin: 15px 0;
        width: 180px;
        float: right;
        direction: rtl;
        button {
          width: 150px;
          height: 50px;
        }
      }
    }
  `,
});

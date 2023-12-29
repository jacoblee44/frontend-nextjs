import { css } from "@emotion/css";

export const useSkillFormStyles = () => ({
  root: css`
    font-family: "Urbanist", serif;
    p {
      font-size: 20px;

      @media only screen and (max-width: 900px) {
        top: -55px;
      }
      @media only screen and (max-width: 700px) {
        font-size: 16px;
        top: -60px;
      }
    }

    .box {
      h2 {
        color: #000000;
        font-size: 30px;
        padding-bottom: 20px;
        @media only screen and (max-width: 1024px) {
          font-size: 25px;
          padding-bottom: 0px;
        }
        @media only screen and (max-width: 500px) {
          font-size: 20px;
          margin-top: 10px;
        }
      }

      h3 {
        font-size: 20px !important;
        color: #000000;
        margin-bottom: 14px;
        @media only screen and (max-width: 1024px) {
          font-size: 17px !important;
        }
        @media only screen and (max-width: 500px) {
          font-size: 15px !important;
        }
      }

      span {
        color: #000000;
        font-size: 18px;
        font-weight: 300;
        @media only screen and (max-width: 1024px) {
          font-size: 16px !important;
        }
        @media only screen and (max-width: 500px) {
          font-size: 15px !important;
        }
      }

      .skills {
        div {
          div {
            @media only screen and (max-width: 500px) {
              border-radius: 5px !important;
              margin-top: 10px !important;
              padding: 5px 15px;
            }
          }

          p {
            @media only screen and (max-width: 500px) {
              font-size: 16px !important;
              font-weight: 500;
            }
          }
          span {
            @media only screen and (max-width: 500px) {
              width: 17px !important;
            }
          }
        }

        p {
          color: #6d5086;
          font-size: 16px;
        }

        img {
          cursor: pointer;
        }
      }
      input {
        @media only screen and (max-width: 500px) {
          font-size: 15px;
          height: 40px;
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
        }
      }
      .css-qwe0d5 {
        div {
          p {
            margin-right: 20px;
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
            @media only screen and (max-width: 500px) {
              padding: 1px 6px;
            }
            button {
              font-size: 18px;
              svg {
                @media only screen and (max-width: 500px) {
                  font-size: 15px;
                }
              }
            }
          }
          p {
            font-size: 16px;
            @media only screen and (max-width: 500px) {
              font-size: 14px;
            }
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
          @media only screen and (max-width: 500px) {
            width: 110px;
            height: 38px;
            font-size: 15px;
          }
        }
      }
    }
  `,
});

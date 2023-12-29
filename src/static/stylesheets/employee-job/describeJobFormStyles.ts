import { css } from "@emotion/css";

export const useDescribeJobFormStyles = () => ({
  root: css`
    padding: 30px 180px;

    @media only screen and (max-width: 1280px) {
      padding: 30px 100px;
    }


    @media only screen and (max-width: 780px) {
      padding: 20px 50px;
    }
    @media only screen and (max-width: 500px) {
      padding: 10px 20px;
    }

    .box {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      padding: 40px;
      margin-bottom: 30px;
      
      .quill {
        border-radius: 10px;
      }

      .ql-toolbar {
        border-top-left-radius: 20px !important;
        border-top-right-radius: 20px !important;
      }
      
      .ql-container {
        border-bottom-left-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
        padding-bottom: 10px;
      }

      @media only screen and (max-width: 450px) {
        padding: 20px;
      }

      h5 {
        display: flex;
        align-items: center;
        color: #000000;
        gap: 10px;
      }

      h2 {
        font-size: 20px;
        color: #000000;
        font-weight: 600;

        @media only screen and (max-width: 450px) {
          font-size: 17px;
        }
      }

      p {
        color: #000000;
        font-weight: 300;
        font-size: 16px;
        padding-top: 10px;

        @media only screen and (max-width: 450px) {
          font-size: 14px;
        }
      }

      .file {
        color: #6D5086;
        font-weight: 600;
      }

      span {
        color: #000000;
      }

      .chip {
        display: flex;
        flex-flow: wrap;
      }

      input, select {
        background: #ffffff !important;

        @media only screen and (max-width: 450px) {
          margin-top: 10px;
        }
      }
      
      textarea {
        border: 1px solid #bebebe;
        margin-top: 5px;
      }

      .text-box {
        margin-top: 20px;

        .css-1gmvpva {
          margin-top: 0;
        }
      }

      .radio-box {
        border: 1px solid #000000;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        height: 45px;

        span {
          color: #000000;
          font-weight: 500;
        }
      }
    }

    .bottom {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      width: 100%;
      padding: 30px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      @media only screen and (max-width: 450px) {
        flex-direction: column;
        text-align: left;
      }

      button {
        margin-top: 0;


      }
    }
  `,


});

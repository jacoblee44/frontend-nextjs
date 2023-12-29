import { css } from "@emotion/css";

export const useWorkExperienceFormStyles = () => ({
  root: css`
    font-family: "Urbanist";
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
        @media only screen and (max-width: 1024px) {
          font-size: 25px;
          padding-bottom: 0px;
        }
        @media only screen and (max-width: 500px) {
          font-size: 20px;
          margin-top: 10px;
        }
      }

      button {
        float: right;
        margin-left: 20px;
        margin-top: 20px;
        @media only screen and (max-width: 700px) {
          margin-top: 4px;
        }
      }

      .MuiFormControlLabel-label {
        color: #000000;
        font-size: 20px;
      }

      .info {
        font-size: 18px;
        color: #000000;
        padding-top: 20px;
      }
      h3 {
        color: #000000;
        font-size: 20px;
        font-weight: semi-bold;
        padding: 20px 0;
        @media only screen and (max-width: 700px) {
          font-size: 14px;
          margin-bottom: 0px;
          padding-bottom: 5px;
        }
      }

      label {
        @media only screen and (max-width: 500px) {
          font-size: 14px;
          padding-top: 0;
        }
      }

      input,
      select {
        @media only screen and (max-width: 500px) {
          font-size: 15px;
          height: 40px;
        }
      }

      .country {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0px;

        p {
          font-size: 18px;
          font-weight: 300;
          color: #000000;
          @media only screen and (max-width: 700px) {
            font-size: 14px;
          }
        }

        .btn {
          color: #6d5086;
          font-weight: 600;
          cursor: pointer;
        }
      }

      label {
        span {
          @media only screen and (max-width: 700px) {
            font-size: 14px !important;
          }
        }
      }

      .time-period {
        font-size: 16px;
        h4 {
          @media only screen and (max-width: 700px) {
            font-size: 16px;
          }
        }

        .MuiGrid-item {
          padding-top: 0;
          @media only screen and (max-width: 700px) {
            width: 50%;
          }
        }
      }
      .MuiFormControlLabel-label {
        font-size: 17px;
      }

      .btns {
        button {
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

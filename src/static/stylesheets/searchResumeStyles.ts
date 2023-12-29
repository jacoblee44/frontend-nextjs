import { css } from "@emotion/css";

export const useSearchResumeStyles = () => ({
  root: css`
    margin: 30px 40px;

    @media only screen and (max-width: 700px) {
      margin: 30px 25px;
    }

    .search-box {
      background: #ffffff;
      height: 60px;
      border-radius: 10px;
      padding: 10px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

      @media only screen and (max-width: 940px) {
        height: auto;
        flex-direction: column;
        gap: 20px;
        background: transparent;
        padding: 30px;
      }

      @media only screen and (max-width: 700px) {
        padding: 30px;
        //background: #24154c;
      }

      @media only screen and (max-width: 430px) {

      }

      input {
        height: 100%;
        background: transparent;
        border: none;
        width: 100%;
        margin-right: 10px;
        font-size: 17px;
        outline: 0;
        color: #000000;
        transition: all 0.3s;

        :first-child {
          border-right: 2px solid #6D5086;
          @media only screen and (max-width: 940px) {
            border-right: 0 !important;
          }
        }

        @media only screen and (max-width: 940px) {
          background: #ffffff;
          padding: 14px;
          border-radius: 5px;
          font-size: 16px;
          margin-right: 0 !important;
          border: 1px solid #d5d5d5;
        }

        @media only screen and (max-width: 790px) {
          font-size: 18px;
        }

        @media only screen and (max-width: 500px) {
          padding: 12px;
          font-size: 18px;
        }

        @media only screen and (max-width: 430px) {
          font-size: 15px;
        }
      }

      button {
        background: #1B113F;
        height: 100%;
        border-radius: 10px;
        width: 40px;
        color: #ffffff;
        transition: all 0.3s;

        :hover {
          background: #8F77A5;
        }

        .label {
          display: none;
        }

        @media only screen and (max-width: 940px) {
          width: 100.5%;
          padding: 14px;
          //margin-left: -13px;
          margin-left: 0 !important;
          margin-right: 0 !important;

          svg {
            display: none;
          }

          .label {
            display: inline-block;
            font-size: 18px;
          }
        }

        @media only screen and (max-width: 430px) {
          padding: 12px;
          font-size: 15px;
        }

        //@media only screen and (max-width: 700px) {
        //  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        //}

        svg {
          font-size: 30px;
          width: 30px;
          height: 30px;
        }
      }
    }

    .job-finds {
      background: #1B113F;
      padding: 10px;
    }

    .job-finds h2 {
      color: #ffffff;
      font-size: 18px;
    }

    .job-finds .search-box {
      height: 50px;
    }


    .limit-search {
      padding-top: 20px;
      display: flex;
      color: #000000;
      align-items: center;
      gap: 5px;

      @media only screen and (max-width: 710px) {
        flex-direction: column;
      }

      .limit-label {
        width: 180px;
        font-size: 16px;
        font-weight: 500;
        color: #353535;

        @media only screen and (max-width: 710px) {
          width: 100%;
          text-align: left;
        }
      }

      .search-limit-items {
        width: 100%;

        * {
          font-size: 16px;
        }

        @media only screen and (max-width: 710px) {
          display: flex;
          align-items: center;
          overflow-x: auto;
          white-space: nowrap;
        }
      }
    }

    .filter {
      padding-right: 20px;

      h1 {
        color: #5A5A5A;
        font-size: 28px;
        @media only screen and (max-width: 790px) {
          font-size: 20px;
        }
      }
    }

    .trial-box {
      background: #6D5086 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 60px 20px;
      position: relative;

      h2 {
        color: #ffffff;
        font-size: 36px;
        @media only screen and (max-width: 790px) {
          font-size: 20px;
        }
      }

      button {
        background: #ffffff !important;
        color: #6D5086;
      }

      span {
        margin-top: 20px !important;
        width: 100% !important;


        img {
          object-fit: none;
          object-position: right top;

        }
      }
    }

    .resume-box {
      margin: 20px 0;

      h2 {
        color: #000000;
        font-weight: 600;
        padding: 10px 0;
      }

      span {
        color: #5A5A5A;
        font-weight: 400;
      }
    }

    .result-box {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      padding: 30px;
      border-radius: 15px;
    }
  `,

});

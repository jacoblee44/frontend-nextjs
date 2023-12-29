import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useSearchJobStyles = () => ({
  root: css`
    margin: 0px;

    .job-find {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #1b113f;
      padding: 120px;
      transition: all 0.3s;

      .job-find-box {
        padding: 45px;
        border-radius: 20px;
        background: #24154c;
        width: 900px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 0.3s;

        @media only screen and (max-width: 1040px) {
          width: 100%;
        }

        @media only screen and (max-width: 700px) {
          padding: 30px;
          background: transparent;
          box-shadow: none;
        }

        @media only screen and (max-width: 600px) {
          padding: 10px;
        }
      }

      @media only screen and (max-width: 1292px) {
        padding: 100px 80px;
      }
      @media only screen and (max-width: 990px) {
        padding: 70px 80px;
      }
      @media only screen and (max-width: 770px) {
        padding: 40px 40px;
      }
      @media only screen and (max-width: 500px) {
        padding: 20px;
      }

      p {
        color: #ffffff;
      }

      h2 {
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 25px;
        color: #ffffff !important;
        transition: all 0.3s;

        @media only screen and (max-width: 700px) {
          text-align: center;
        }

        @media only screen and (max-width: 600px) {
          font-size: 26px;
        }

        @media only screen and (max-width: 500px) {
          font-size: 25px;
        }

        @media only screen and (max-width: 420px) {
          font-size: 20px;
        }
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

        @media only screen and (max-width: 940px) {
          height: auto;
          flex-direction: column;
          gap: 20px;
          background: transparent;
          padding: 0;
        }

        @media only screen and (max-width: 700px) {
          padding: 30px;
          background: #24154c;
        }

        @media only screen and (max-width: 430px) {
          padding: 30px 10px;
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
          @media only screen and (max-width: 430px) {
            margin-right: 0px;
          }

          :first-child {
            border-right: 2px solid #6d5086;
            @media only screen and (max-width: 940px) {
              border-right: 0;
            }
          }

          @media only screen and (max-width: 940px) {
            background: #ffffff;
            padding: 14px;
            border-radius: 5px;
            font-size: 16px;
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
          background: #1b113f;
          height: 100%;
          border-radius: 10px;
          width: 40px;
          color: #ffffff;
          transition: all 0.3s;

          :hover {
            background: #8f77a5;
          }

          .label {
            display: none;
          }

          @media only screen and (max-width: 940px) {
            width: 100.5%;
            padding: 14px;
            margin-left: -13px;

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
            font-size: 13px;
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

      .recent-search {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .recent {
          display: flex;
          background: #6d5086;
          border-radius: 10px;
          height: 60px;
          align-items: center;
          padding: 18px;
          min-width: 190px;
          cursor: pointer;
          color: #ffffff !important;

          @media only screen and (max-width: 790px) {
            height: 40px;
            min-width: 150px;
            padding: 10px;
          }
        }
      }

      .divider {
        padding: 20px 0;
      }

      .popular-search-container {
        * {
          transition: all 0.3s;
        }
        .title {
          color: #ffffff;
          font-size: 17px;
          margin-bottom: 15px;

          @media only screen and (max-width: 700px) {
            text-align: center;
            font-size: 18px !important;
            font-weight: bold;
            margin-bottom: 20px;
          }

          @media only screen and (max-width: 500px) {
            font-size: 17px !important;
          }
        }

        .popular-search {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          span {
            font-size: 14px;
          }

          @media only screen and (max-width: 700px) {
            justify-content: center;
          }

          @media only screen and (max-width: 430px) {
            .MuiChip-root {
              padding: 7px 10px;
            }
          }
        }
      }
    }

    .search-box {
      background: #ffffff;
      height: 90px;
      border-radius: 10px;
      padding: 10px 30px;
      display: flex;
      align-items: center;
      border: 2px solid #6d5086;

      @media only screen and (max-width: 790px) {
        height: 60px;
      }

      @media only screen and (max-width: 430px) {
        height: 40px;
        padding: 5px 10px;
      }

      input {
        height: 100%;
        background: transparent;
        border: none;
        width: 100%;
        margin-right: 10px;
        font-size: 20px;
        outline: 0;
        color: #000000;

        @media only screen and (max-width: 790px) {
          font-size: 18px;
        }
        @media only screen and (max-width: 430px) {
          font-size: 14px;
        }
      }

      button {
        background: #6d5086;
        height: 100%;
        border-radius: 10px;
        width: 70px;
        color: #ffffff;
        @media only screen and (max-width: 790px) {
          width: 50px;
        }

        svg {
          font-size: 30px;
          width: 30px;
          height: 30px;
        }
      }
    }

    .job-finds {
      background: #1b113f;
      padding: 10px;
    }

    .job-finds h2 {
      color: #ffffff;
      font-size: 18px;
    }

    .job-finds .search-box {
      height: 50px;
    }

    .css-1vue28y-MuiGrid-root,
    .css-16m04c2-MuiGrid-root,
    .css-1j6ekxb-MuiGrid-root {
      padding-top: 0px;
    }

    .limit-search {
      padding-top: 20px;
      display: flex;
      color: #000000;
      align-items: center;
      gap: 20px;
    }

    .content-container-wrapper {
      display: flex;
      justify-content: center;

      .content-container {
        width: 1250px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;

        @media only screen and (max-width: 1350px) {
          width: 100%;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 40px;
        }

        @media only screen and (max-width: 790px) {
          font-size: 20px;
          padding: 0 20px;
        }
        @media only screen and (max-width: 500px) {
          padding: 0 15px;
        }
        div {
          .css-1ld3b9g-MuiGrid-root > .MuiGrid-item {
            @media only screen and (min-width: 600px) {
              width: 70% !important;
              padding-top: 75px !important;
              padding-left: 75px !important;
            }

            // padding: 0px;
          }
        }
      }
    }

    .filter {
      @media only screen and (max-width: 599px) {
        display: none;
      }

      h1 {
        color: #2d2d2d;
        font-size: 20px;
        font-weight: 500;
        @media only screen and (max-width: 790px) {
          font-size: 18px;
        }
      }

      .filter-item-label {
        font-size: 14px;
        text-transform: capitalize;
      }

      .filter-item-count {
        font-size: 14px;
        margin-right: 14px;
        font-weight: 500;
      }
    }

    .mobile-filter-button {
      display: none;

      @media only screen and (max-width: 599px) {
        display: block;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 7px;
        background: transparent;
        border: 1.5px solid ${themeColors.employerPrimary};
        color: ${themeColors.employerPrimary};
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.5s;

        :hover {
          opacity: 0.7;
        }

        * {
          color: ${themeColors.employerPrimary};
        }
      }
    }

    .trial-box {
      background: #6d5086 0% 0% no-repeat padding-box;
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
        color: #6d5086;
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
        color: #5a5a5a;
        font-weight: 400;
      }
    }
  `,

  mobileFilterPopupBody: css`
    display: flex;
    flex-direction: column;
    height: 100vh;

    .dialog-header {
      padding: 8px 8px 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .dialog-body {
      padding: 0 20px;
      flex-grow: 1;
      overflow: auto;
    }

    .dialog-footer {
      padding: 0 20px 10px;
    }
  `,
});

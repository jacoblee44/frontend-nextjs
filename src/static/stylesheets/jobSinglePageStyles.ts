import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useJobSinglePageStyles = () => ({
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

    .content-container {
      padding: 50px 200px;

      @media only screen and (max-width: 1300px) {
        padding: 50px 100px;
      }

      @media only screen and (max-width: 899px) {
        padding: 50px 25px;
      }
      @media only screen and (max-width: 600px) {
        padding: 20px 15px;
      }
    }

    .job-detail-header {
      padding: 10px 0;
      margin-bottom: 10px;

      .back-button {
        display: flex;
        align-items: center;
        font-weight: 500;
        color: ${themeColors.secondary};
        cursor: pointer;
      }

      .section-title {
        display: flex;
        align-items: center;
        font-weight: 500;
        color: #2d2d2d;
      }
    }
  `,
});

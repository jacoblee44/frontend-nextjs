import { css } from "@emotion/css";

export const useHomeStyles = () => ({
  root: css`
    background: #ffffff;

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

    .job-list {
      transition: all 0.3s;
      padding: 50px 200px;

      @media only screen and (max-width: 1292px) {
        padding: 50px 100px;
      }
      @media only screen and (max-width: 1090px) {
        padding: 30px 50px;
      }
      @media only screen and (max-width: 770px) {
        padding: 20px 40px;
      }

      @media only screen and (max-width: 500px) {
        padding: 20px 20px;
      }

      .list-tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 42px;
        margin-bottom: 50px;

        .tab-item {
          font-family: Urbanist, SemiBold, serif;
          font-size: 17px;
          font-weight: 500;
          color: #000000;
          height: 38px;
          border-bottom: 2px solid #ffffff;
          padding: 0 25px;
          cursor: pointer;
          text-transform: uppercase;

          @media only screen and (max-width: 470px) {
            font-size: 16px !important;
            padding: 0 20px;
          }

          @media only screen and (max-width: 440px) {
            font-size: 13px !important;
            padding: 0 5px;
            height: 30px;
          }

          @media only screen and (max-width: 330px) {
            font-size: 14px !important;
            padding: 0 10px;
          }
        }

        .tab-item.active {
          font-weight: bold;
          color: #6d5086;
          border-bottom: 4px solid #6d5086;
        }

        @media only screen and (max-width: 770px) {
          margin-top: 30px;
        }

        @media only screen and (max-width: 430px) {
          gap: 40px;
        }

        @media only screen and (max-width: 330px) {
          gap: 20px;
        }
      }
    }

    .job-feed-detail-container {
      @media only screen and (max-width: 899px) {
        display: none;
      }
    }
  `,

  jobFeedDetailPopupBody: css`
    display: flex;
    flex-direction: column;
    height: 100vh;

    .dialog-header {
      padding: 8px 8px 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .dialog-body {
      padding: 0 20px;
      flex-grow: 1;
      overflow: auto;
    }
  `,

  privilegelinkPopupBody: css`
    display: flex;
    flex-direction: column;
    height: 30vh;

    .dialog-header {
      padding: 8px 8px 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .dialog-body {
      padding: 0 20px;
      flex-grow: 1;
      overflow: auto;
    }
  `,
});

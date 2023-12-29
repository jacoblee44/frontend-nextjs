import { css } from "@emotion/css";

export const useCompanyReviewsStyles = () => ({
  root: css`
    .top-bar {
      padding-top: 100px;
      padding-bottom: 70px;
      padding-left: 200px;
      padding-right: 200px;

      @media only screen and (max-width: 1100px) {
        padding-top: 50px;
        padding-bottom: 0px;
        padding-right: 100px;
        padding-left: 100px;
      }
      @media only screen and (max-width: 900px) {
        padding-top: 50px;
        padding-bottom: 0px;
        padding-right: 30px;
        padding-left: 30px;
      }
      @media only screen and (max-width: 600px) {
        padding-top: 30px;
        padding-bottom: 0px;
        padding-right: 20px;
        padding-left: 20px;
      }

      h2 {
        font-size: 28px;
        font-family: "Urbanist", serif;
        font-weight: 600;
        color: #000000;

        @media only screen and (max-width: 600px) {
          font-size: 22px;
        }
      }

      h5 {
        color: #000000;
        font-family: "Urbanist", serif;
        font-size: 16px;

        @media only screen and (max-width: 600px) {
          font-size: 15px;
        }
      }

      p {
        font-size: 16px;
        font-weight: 300;
        font-family: "Urbanist", serif;
        color: #6d5086;

        @media only screen and (max-width: 600px) {
          font-size: 15px;
        }
      }

      .search-box {
        background: #ffffff;
        height: 70px;
        border-radius: 10px;
        padding: 10px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #707070;
        margin-top: 20px;
        .css-1e7yw6m {
          width: 93%;

          @media only screen and (max-width: 600px) {
            width: 83%;
          }
        }
        p {
          color: #000000;
          font-size: 18px;
          font-weight: 600;
          padding-right: 20px;
          @media only screen and (max-width: 1100px) {
            font-size: 16px;
            padding-right: 8px;
          }
          @media only screen and (max-width: 900px) {
            font-size: 15px;
            padding-right: 6px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 12px;
            padding-right: 7px;
          }
        }

        @media only screen and (max-width: 1100px) {
          height: 70px;
        }
        @media only screen and (max-width: 900px) {
          height: 60px;
        }

        @media only screen and (max-width: 430px) {
          height: 40px;
          padding: 5px 10px;
        }

        input,
        select {
          height: 100%;
          background: transparent;
          border: none;
          width: 100%;
          margin-right: 10px;
          font-size: 17px;
          outline: 0;
          color: #000000;

          @media only screen and (max-width: 900px) {
            font-size: 16px;
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
          @media only screen and (max-width: 600px) {
            width: 40px;
          }

          svg {
            font-size: 30px;
            width: 30px;
            height: 30px;

            @media only screen and (max-width: 600px) {
              width: 22px;
            }
          }
        }
      }
    }

    .paying-jobs {
      margin: 0 200px;
      padding: 30px 0;
      @media only screen and (max-width: 1100px) {
        margin: 30px 100px;
      }
      @media only screen and (max-width: 900px) {
        margin: 0px 30px 30px;
      }
      @media only screen and (max-width: 600px) {
        margin: 0px 20px;
      }

      h2 {
        color: #000000;
        font-size: 24px;
        font-weight: 600;
        font-family: "Urbanist", serif;
        @media only screen and (max-width: 900px) {
          font-size: 22px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 17px;
        }
      }
      div.css-1qnvcht-MuiGrid-root {
        @media only screen and (max-width: 600px) {
          flex-direction: column;
          width: 100%;
        }
      }

      select {
        background: #6d5086 0% 0% no-repeat padding-box;
        border-radius: 10px;
        padding: 15px 30px;
        font-size: 24px;
        font-weight: 600;
        font-family: "Urbanist", serif;
        outline: none;
        margin-top: 20px;
      }
    }
    .career {
      margin: 0 200px;
      padding: 40px 0;
      @media only screen and (max-width: 1100px) {
        margin: 30px 100px;
      }
      @media only screen and (max-width: 900px) {
        margin: 30px 70px;
      }
      @media only screen and (max-width: 600px) {
        margin: 20px 40px;
      }

      h2 {
        color: #000000;
        font-size: 36px;
        font-weight: 600;
        font-family: "Urbanist", serif;
      }
    }
    .banner {
      margin: 30px 200px;
      @media only screen and (max-width: 1100px) {
        margin: 30px 100px;
      }
      @media only screen and (max-width: 900px) {
        margin: 30px 30px;
      }
      @media only screen and (max-width: 600px) {
        margin: 20px 20px;
      }
      background: #6d5086 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      height: 135px;
      display: flex;
      justify-content: center;
      gap: 30px;
      align-items: center;
      @media only screen and (max-width: 600px) {
        gap: 0px;
        flex-direction: column;
      }

      h3 {
        font-size: 28px;
        font-weight: 600;
        font-family: "Urbanist", serif;
        @media only screen and (max-width: 900px) {
          font-size: 24px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
      }
      img {
        width: 40px !important;
        @media only screen and (max-width: 900px) {
          width: 35px !important;
        }
        @media only screen and (max-width: 600px) {
          width: 35px !important;
        }
      }
    }

    .frequently-search {
      margin: 30px 200px;

      @media only screen and (max-width: 1100px) {
        margin: 30px 100px;
      }
      @media only screen and (max-width: 900px) {
        margin: 30px 30px;
      }
      @media only screen and (max-width: 600px) {
        margin: 20px 20px;
      }

      h2 {
        font-size: 36px;
        font-weight: 600;
        font-family: "Urbanist", serif;
        color: #000000;
        @media only screen and (max-width: 900px) {
          font-size: 20px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 18px;
        }
      }
      ul {
        padding: 0;
        margin-top: 30px;
        @media only screen and (max-width: 600px) {
          margin-top: 10px;
        }
        li {
          color: #000000;
          list-style: none;
          font-size: 16px;
          margin-bottom: 10px;
          font-family: "Urbanist", serif;
          font-weight: 400;
          cursor: pointer;
          text-decoration: underline;
          @media only screen and (max-width: 900px) {
            font-size: 16px;
            margin-bottom: 8px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 14px;
            margin-bottom: 4px;
          }
        }
      }
    }
  `,
});

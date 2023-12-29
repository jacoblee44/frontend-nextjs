import { css } from "@emotion/css";

export const usePricingStyles = () => ({
  root: css`
    padding: 40px 30px;
    width: 1024px;
    margin: 0 auto;
    p,
    h2,
    h3 {
      font-family: "Urbanist", serif;
    }

    @media only screen and (max-width: 1100px) {
      padding: 30px 20px;
      width: 100%;
      max-width: 750px;
    }

    .top-box {
      text-align: center;

      h2 {
        color: #6d5086;
        font-size: 35px;
        font-weight: 600;
        padding-bottom: 30px;

        @media only screen and (max-width: 1100px) {
          font-size: 25px;
          padding-bottom: 10px;
        }
      }

      p {
        color: #000000;
        font-size: 18px;
        @media only screen and (max-width: 1100px) {
          font-size: 16px;
        }
      }
    }

    .price-box {
      padding: 45px 100px;
      display: flex;
      justify-content: space-between;
      gap: 70px;

      @media only screen and (max-width: 1100px) {
        padding: 25px 0px;
        gap: 10px;
      }

      .box {
        width: 360px;
        min-height: 615px;
        background: #f3f7fc 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 14px #00000029;
        border-radius: 19px;
        position: relative;

        @media only screen and (max-width: 1100px) {
          min-height: 465px;
          width: 100%;
        }

        .top-bar {
          background: #1b113f 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 19px 19px 0px 0px;
          text-align: center;
          padding: 20px;
          height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          @media only screen and (max-width: 1100px) {
            padding: 15px;
            height: 150px;
          }

          h2 {
            color: #ffffff;
            font-size: 30px;
            font-weight: 600;
            margin-top: 0;

            @media only screen and (max-width: 1100px) {
              font-size: 20px;
              margin-top: 0;
            }
          }

          p {
            color: #ffffff;
            font-size: 16px;

            @media only screen and (max-width: 1100px) {
              font-size: 15px;
            }
          }
        }

        .content {
          padding: 15px 20px;
          @media only screen and (max-width: 1100px) {
            padding: 5px 20px;
          }

          p {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #1a1a1a;
            font-size: 16px;
            padding: 7px 0;

            @media only screen and (max-width: 1100px) {
              font-size: 14px;
              gap: 8px;
              padding: 4px 0;
            }
            svg {
              color: #de8f67;
              @media only screen and (max-width: 1100px) {
                font-size: 18px;
              }
            }
          }
        }

        .top-bar1 {
          background: #8f77a4 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 19px 19px 0px 0px;
          text-align: center;
          padding: 20px;
          height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          @media only screen and (max-width: 1100px) {
            padding: 15px;
            height: 150px;
          }
          h2 {
            color: #ffffff;
            font-size: 30px;
            font-weight: 600;

            @media only screen and (max-width: 1100px) {
              font-size: 20px;
              margin-top: 0;
            }
          }

          p {
            color: #ffffff;
            font-size: 16px;

            @media only screen and (max-width: 1100px) {
              font-size: 15px;
            }
          }
        }

        button {
          background: #6d5086;
          position: absolute;
          bottom: 25px;
          width: 170px;
          left: 30px;
          color: #ffffff;
          height: 50px;

          @media only screen and (max-width: 1100px) {
            left: 26px;
            bottom: 15px;
            width: 140px;
            height: 40px;
            font-size: 13px;
          }
        }
      }
    }
  `,
});

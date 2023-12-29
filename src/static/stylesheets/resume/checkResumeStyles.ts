import { css } from "@emotion/css";

export const useCheckResumeFormStyles = () => ({
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
        font-size: 16px;
        padding-bottom: 0px;
      }

      h3 {
        font-size: 24px !important;
        color: #000000;
        margin-bottom: 20px;
      }
      h4 {
        font-size: 15px;
      }
      p {
        font-size: 13px;
      }
      span {
        color: #000000;
        font-size: 16px;
        font-weight: 300;
      }

      .info-box {
        margin-top: 16px;
        background: #f7f6fb;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        padding: 25px 40px;
        @media only screen and (max-width: 700px) {
          padding: 10px;
        }

        .name-section {
          display: flex;
          justify-content: space-between;
          align-items: center;

          h2 {
            color: #000000;
            font-size: 25px;
            text-transform: capitalize;
            padding: 0 !important;
            @media only screen and (max-width: 700px) {
              font-size: 16px;
            }
          }

          svg {
            color: #000000;
            font-size: 25px;
            @media only screen and (max-width: 700px) {
              font-size: 18px;
            }
          }
        }

        .info {
          text-align: left;
          @media only screen and (max-width: 700px) {
            margin-top: -5px;
          }
          p {
            color: #000000;
            font-size: 14px;
            @media only screen and (max-width: 700px) {
              font-size: 11px;
            }
          }
        }

        .title-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;

          @media only screen and (max-width: 700px) {
            margin-top: 5px;
            // justify-content: flex-start;
          }

          h2 {
            color: #000000;
            font-size: 18px;
            padding: 0 !important;
            @media only screen and (max-width: 700px) {
              font-size: 14px;
            }
          }
          p {
            @media only screen and (max-width: 700px) {
              font-size: 12px !important;
            }
          }

          button {
            color: #000000;
            font-size: 17px;
            border: 1.5px solid #000000;
            svg {
              @media only screen and (max-width: 700px) {
                font-size: 12px;
              }
            }
          }
        }

        .skill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          @media only screen and (max-width: 700px) {
            padding-top: 8px;
          }
          h2 {
            padding: 0;
            font-size: 16px;
            @media only screen and (max-width: 700px) {
              font-size: 12px;
            }
          }

          .action {
            display: flex;
            gap: 4px;
            height: 18px;
            button {
              width: 18px;
              height: 18px;

              span {
                width: 18px !important;
                height: 18px !important;
              }
              svg {
                width: 20px;
                height: 20px;
                @media only screen and (max-width: 700px) {
                  width: 15px;
                  height: 15px;
                }
              }
            }
            span {
              width: 18px !important;
              height: 18px !important;
              @media only screen and (max-width: 700px) {
                width: 14px !important;
                height: 14px !important;
              }
            }
          }
        }

        .add-section {
          p {
            font-size: 17px !important;
            @media only screen and (max-width: 500px) {
              font-size: 14px !important;
            }
          }

          button,
          p {
            color: #000000 !important;
          }

          button {
            border: 1px solid #000000;
            font-size: 16px;
            svg {
              @media only screen and (max-width: 500px) {
                font-size: 14px !important;
              }
            }
          }
          div {
            div {
              gap: 10px;
              margin-top: 15px;
              @media only screen and (max-width: 500px) {
                gap: 7px;
                margin-top: 7px;
              }
            }
          }
        }
      }

      .bottom {
        width: 100%;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        margin-top: 30px;
        background: #f7f6fb;
        padding: 40px;

        button {
          width: 150px;
          height: 50px;
          float: right;
          margin-top: -40px;
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

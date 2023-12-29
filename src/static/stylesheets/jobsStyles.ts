import { css } from "@emotion/css";

export const useJobsStyles = () => ({
  root: css`
    padding: 20px 30px;

    .box {

      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        h3 {
          color: #000000;
          font-size: 25px;
          font-weight: 500;
        }

        .MuiIconButton-root {
          border: 2px solid #6D5086;
          border-radius: 10px !important;
          padding: 6px;

          svg {
            color: #6D5086;
          }
        }

        .post-a-job-button {
          padding: 0;
          margin: 0;

          button {
            height: 40px;
            font-size: 16px !important;
          }
        }

        .css-1o4f4t0 {
          margin: 0 !important;
        }
      }

      .tab-button {
        button {
          height: 40px !important;
          padding: 15px;
          font-size: 15px;
          font-weight: 500;

          @media only screen and (max-width: 710px) {
            font-size: 13px;
            padding: 8px;
          }
        }
      }

      .message-box {
        background: #F7F6FB;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        border-radius: 10px;
        height: 228px;

        h2 {
          font-size: 18px;
          font-weight: 500;
          color: #000000;
        }

        .message {
          .no-message {
            text-align: center;
            padding-top: 20px;

            h3 {
              font-size: 16px;
              color: #000000;
            }
          }
        }
      }

      .billing-box {
        background: #F7F6FB;
        padding: 20px 20px 40px 20px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        border-radius: 10px;

        h2 {
          font-size: 18px;
          font-weight: 500;
          color: #000000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-bar {
          padding-top: 20px;

          span, p {
            color: #000000;
            font-size: 16px;
          }

          h2 {
            font-size: 26px;
          }
        }

        .button-group {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex-direction: column;
          gap: 10px;

          .card-button {
            width: 180px;
            margin: 0;

            button {
              height: 40px !important;
              padding: 15px;
              font-size: 15px;
              font-weight: 500;
            }
          }
        }
      }

      .filter-box {
        display: flex;
        justify-content: right;
        align-items: end;
        height: 100px;
        flex-wrap: wrap;
        transition: all 0.3s;

        * {
          transition: all 0.3s;
        }

        @media only screen and (max-width: 710px) {
          height: auto;
          margin: 20px 0;
        }

        .search-input {
          @media only screen and (max-width: 710px) {
            width: 100%;
          }
        }

        .filter {
          display: flex;
          gap: 20px;

          .css-1gmvpva {
            margin-top: 0;
          }
        }
      }

      .filter-dropdown {
        label {
          font-size: 15px;
        }

        select {
          height: 40px;
          padding-left: 0;
        }
      }

      .item-box {
        margin-top: 20px;

        .single-item {
          background: #F7F6FB 0% 0% no-repeat padding-box;
          border: 1px solid #dddddd;
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 12px 30px;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .title {
            h2, p, h4, span {
              color: #000000;
              font-family: "Urbanist", sans-serif !important;
            }

            h4 {
              font-weight: 500;
              font-size: 16px;
            }

            h2 {
              font-size: 22px;
              font-weight: 600;
            }

            span {
              font-size: 16px;
              font-weight: 500;
            }
          }
          
          .summary-cards-container {
            display: flex;
            gap: 20px;
            
            @media only screen and (max-width: 710px) {
              display: flex;
              justify-content: space-between;
              width: 100%;
              gap: 2px;
            }
          }

          .summary-box {
            background: #8F77A4 0% 0% no-repeat padding-box;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            align-items: center;
            width: 100%;

            @media only screen and (max-width: 710px) {
              //width: 100%;
            }
          }

          .invite-box {
            background: #8F77A4 0% 0% no-repeat padding-box;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .founded {
            h2 {
              font-size: 20px;
              color: #000000;
            }
            
            .fund-item {
              font-size: 14px;
            }

            h4 {
              font-size: 15px;
              font-weight: 500;
              color: #000000;
            }
          }

          .status {
            div {
              margin-top: 0px;
            }

            label {
              font-size: 15px;
              color: #000000;
              padding-top: 0;
            }
            
            select {
              padding: 2px;
              height: 35px;
            }
          }

          .action {
            svg {
              color: #000000;
            }
          }

        }
      }
    }

  `,

});

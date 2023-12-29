import { css } from "@emotion/css";

export const useJobDetailStyles = () => ({
  root: css`
    width: 100%;
    padding: 30px;
    border-radius: 10px;
    background: rgba(247, 246, 251, 0.8);
    //box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 1px solid #ead8f6;

    @media only screen and (max-width: 600px) {
      font-size: 18px;
      padding: 13px;
    }

    .job-title {
      color: #6d5086;
      font-weight: 500;
      font-size: 22px;

      @media only screen and (max-width: 1292px) {
        font-size: 20px;
      }
      @media only screen and (max-width: 600px) {
        font-size: 16px;
      }
    }

    .company {
      h4 {
        color: #292929;
        display: flex;
        align-items: center;
        font-size: 14px;
        text-transform: capitalize !important;
        @media only screen and (max-width: 600px) {
          font-size: 12px;
        }
        svg {
          color: #fbd241;
          font-size: 18px;
        }
      }

      .job-type {
        margin-top: 10px;
        font-size: 13px;
        font-weight: 500;
        padding: 2px 10px;
        background: #1b113f;
        color: #ffffff;
        display: inline-block;
        border-radius: 5px;
        @media only screen and (max-width: 600px) {
          font-size: 12px;
        }
      }

      p {
        font-size: 24px;
        color: #000000;
        @media only screen and (max-width: 1292px) {
          font-size: 18px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 16px;
        }
      }

      .apply-section {
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          font-size: 15px !important;
          height: 45px;
          padding: 5px 15px !important;
          width: auto;
          font-weight: 500;
          @media only screen and (max-width: 600px) {
            height: 38px;
            font-size: 14px !important;
          }
        }

        @media only screen and (max-width: 420px) {
          button {
            font-size: 13px !important;
            padding: 0 10px !important;
          }

          svg {
            margin-left: 10px !important;
          }
        }

        @media only screen and (max-width: 330px) {
          button {
            font-size: 15px !important;
            height: 54px !important;
            padding: 5px !important;
            width: 120px;
          }

          svg {
            margin-left: 10px !important;
          }
        }

        svg {
          color: #6d5086;
          border: 2px solid #6d5086;
          font-size: 38px;
          margin-top: 20px;
          margin-left: 30px;
          padding: 5px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;

          :hover {
            background: #6d5086;
            color: #ffffff;
          }

          @media only screen and (max-width: 600px) {
            font-size: 30px;
          }
        }
      }
    }

    .divider {
      padding: 25px 0;
      @media only screen and (max-width: 600px) {
        padding: 10px 0;
      }
    }

    .job-type,
    .details,
    .benefits,
    .hiring-insight {
      color: #3c3c3c;

      h2 {
        font-size: 17px;
        font-weight: 500;
        color: #1b113f;

        @media only screen and (max-width: 600px) {
          font-size: 14px;
        }
      }

      strong {
        color: #1b113f;
        font-weight: 500;
      }

      ul {
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid #eeeeee;
        padding: 20px 40px;

        li {
          margin-bottom: 7px;
          font-size: 15px;
          color: #3c3c3c !important;

          :last-child {
            margin-bottom: 0;
          }
        }
      }

      p {
        color: #000000;
        font-size: 16px;
        @media only screen and (max-width: 1292px) {
          font-size: 18px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 13px;
        }
      }
    }

    .details {
      margin-top: 25px;
      @media only screen and (max-width: 600px) {
        margin-top: 15px;
      }
      h2 {
        padding-bottom: 10px;
      }

      p {
        font-size: 15px;
        @media only screen and (max-width: 600px) {
          font-size: 13px;
        }
      }
    }

    .chip {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .benefit-item {
        padding: 3px 10px;
        background: #6d5086;
        color: #ffffff;
        border-radius: 5px;
        font-size: 15px;
        @media only screen and (max-width: 600px) {
          font-size: 13px;
        }
      }
    }

    .hiring-insight {
      .job-activity {
        font-weight: 500;
        color: #3c3c3c;
      }

      .posted-date {
        color: #6d5086;
      }
    }

    .job-report {
      background: #6d5086;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 45px;
      padding: 5px 15px !important;
      transition: all 0.3s;

      :hover {
        opacity: 0.8;
      }

      p {
        font-size: 15px;
        color: #ffffff;
        margin-left: 5px;
      }

      svg {
        color: #ffffff;
      }
    }
  `,
});

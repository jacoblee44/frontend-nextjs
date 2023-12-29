import { css } from "@emotion/css";

export const useJobFeedStyles = () => ({
  root: css`
    width: 100%;
    //box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    //box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background: #fafafa;
    padding: 30px;
    border-radius: 10px;
    transition: 0.3s;
    margin-bottom: 20px;
    border: 2px solid transparent;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
      padding: 10px;
    }

    :hover {
      box-shadow: none;
      border: 2px solid #6d5086;
    }

    .job-status {
      color: #6d5086;
      font-size: 14px;
      font-weight: 500;
      text-transform: capitalize;
      @media only screen and (max-width: 768px) {
        font-size: 13px;
      }
    }

    .title {
      color: #000000;
      font-size: 22px;
      font-weight: 500;
      text-transform: capitalize !important;

      @media only screen and (max-width: 1292px) {
        font-size: 20px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    .company {
      margin-bottom: 12px;

      h4 {
        color: #292929;
        display: flex;
        align-items: center;
        font-size: 14px;
        text-transform: capitalize !important;
        @media only screen and (max-width: 768px) {
          font-size: 13px;
        }
      }

      svg {
        color: #fbd241;
      }
    }

    .sub-title {
      color: #484848;
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 8px;

      @media only screen and (max-width: 1292px) {
        font-size: 16px;
      }
      @media only screen and (max-width: 600px) {
        font-size: 10px;
      }
    }

    .job-types-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .job-type {
      background: #6d5086;
      border-radius: 10px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: #ffffff;
      margin: 0 !important;

      img {
        width: 18px !important;
      }

      @media only screen and (max-width: 1292px) {
        height: 38px;
        margin-top: 20px;
      }

      @media only screen and (max-width: 1292px) {
        padding: 8px 14px;
      }
      @media only screen and (max-width: 768px) {
        height: 35px;
      }

      p {
        font-size: 15px;
        font-weight: 500;
        @media only screen and (max-width: 768px) {
          font-size: 12px;
        }
      }
    }

    .description {
      color: #565656;
      font-size: 15px;
      padding: 18px 0;
      word-break: break-word;

      @media only screen and (max-width: 1292px) {
        font-size: 16px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 14px;
        padding: 14px 0;
      }
    }

    .time {
      color: #6d5086;
      font-size: 13px;
      font-weight: 500;

      @media only screen and (max-width: 1292px) {
        font-size: 14px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
  `,
});

import { css } from "@emotion/css";

export const usePayingCompanyCardStyles = () => ({
  root: css`
    .card {
      padding: 20px;

      @media only screen and (max-width: 900px) {
        padding: 15px 0px;
      }
      @media only screen and (max-width: 600px) {
        padding: 5px 0px;
      }

      .top-box {
        display: flex;
        align-items: center;
        gap: 10px;

        .image {
          width: 60px !important;
          max-width: 60px !important;
          @media only screen and (max-width: 900px) {
            width: 50px !important;
            max-width: 50px !important;
          }
        }
        .img {
          border: 1px solid #00000040 !important;
          border-radius: 10px;
          padding: 2px;
        }

        h2 {
          font-size: 18px;
          color: #292929;
          font-family: "Urbanist", serif;
          font-weight: 600;
          @media only screen and (max-width: 900px) {
            font-size: 18px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 16px;
          }
        }

        h5 {
          font-size: 15px !important;
          color: #6d5086;
          font-family: "Urbanist", serif;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: space-between;
          @media only screen and (max-width: 900px) {
            font-size: 14px !important;
          }
          @media only screen and (max-width: 600px) {
            font-size: 13px !important;
          }
        }
      }

      .bottom-items {
        display: flex;
        color: #00000090;
        align-items: center;
        gap: 30px;
        padding-top: 20px;
        @media only screen and (max-width: 900px) {
          padding-top: 10px;
        }
        p {
          font-size: 16px;
          font-family: "Urbanist", serif;
          cursor: pointer;
          @media only screen and (max-width: 900px) {
            font-size: 16px;
          }
          @media only screen and (max-width: 600px) {
            font-size: 14px;
          }
        }
      }
    }
  `,
});

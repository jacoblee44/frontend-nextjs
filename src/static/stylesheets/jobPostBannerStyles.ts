import { css } from "@emotion/css";

export const useJobPostBannerStyles = (is_description: boolean = false) => ({
  root: css`
    .banner {
      padding: 15px 40px;
      background: #6D5086 0% 0% no-repeat padding-box;
      //box-shadow: 0px 0px 20px #00000040;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;

      @media only screen and (max-width: 400px) {
        flex-direction: column;
      }

      span {
        width: 160px !important;
        height: 160px !important;
        margin-right: ${!is_description ? "125px !important" : "25px"};

        @media only screen and (max-width: 1150px) {
          margin-right: 55px !important;
          width: 120px !important;
          height: 120px !important;

        }


        @media only screen and (max-width: 950px) {
          margin-right: 25px !important;
          width: 80px !important;
          height: 80px !important;
        }

      }

      .content {
        width: ${is_description ? "55%" : ""};

        h1 {
          font-size: 30px;
          color: #ffffff;

          @media only screen and (max-width: 950px) {
            font-size: 26px;
          }

          @media only screen and (max-width: 400px) {
            font-size: 20px;
          }
        }
      }
    }
  `,

});

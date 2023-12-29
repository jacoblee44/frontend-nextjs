import { css } from "@emotion/css";

export const useApplicationPreferencePreviewModalModalStyles = () => ({
  root: css`
    .top-banner {
      position: relative;
      margin-bottom: 20px;

      svg {
        position: absolute;
        top: 0;
        right: 0;
        color: #6D5086;
        border: 2px solid #6D5086;
        border-radius: 10px;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: end;

        h2 {
          color: #6D5086;
          font-size: 25px;
          font-weight: 500;
        }
      }
    }

    .review-box {
      background: #FAFAFA 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;

      .info {
        padding: 30px;
      }

      .content-list {
        padding-left: 30px;
        padding-bottom: 30px;

        p {
          color: #000000;
          font-size: 20px;
        }
      }
    }

  `,
});

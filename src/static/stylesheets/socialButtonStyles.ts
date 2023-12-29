import { css } from "@emotion/css";

export const useSocialButtonStyles = (variant = "default") => ({
  root: css`
    margin: 0 !important;

    Button {
      background: transparent;
      color: #000000;
      text-align: center;
      border-radius: 10px;
      padding: 7px 30px;
      margin-top: 10px;
      border: ${variant === "default" || variant === "round" ? '1px solid #eeeeee' : ''};
      border: 1px solid #c7c7c7;
      box-shadow: none;
      width: ${variant === "default" ? '100%' : ''};
      height: 45px;
      font-size: 20px;
      font-weight: 600;

      :hover {
        background: transparent !important;
        box-shadow: none;
      }
    }

    .MuiIconButton-root {
      border-radius: 100%;
      width: 50px;
      height: 50px;
      padding: 15px;
    }

    .social-button {
      display: flex;
      color: #3f3f3f;
      height: 45px;
      border-radius: 10px;
      border: 1px solid #c7c7c7;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      width: 100%;
      padding-left: 22px;

      p {
        width: 80%;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
      }
    }

    :hover {
      opacity: .6;
    }

  `,

  header: css`

  `,
});

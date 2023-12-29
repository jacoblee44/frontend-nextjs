import { css } from "@emotion/css";

interface InputStyleProps {
  height?: string;
  width?: string;
}

export const useInputStyles = (
  props: InputStyleProps = {
    height: "45px",
    width: "100%",
  }
) => ({
  root: css`
    width: ${props?.width};
    margin-top: 15px;
    position: relative;

    label {
      font-family: "Urbanist", serif;
      color: #000000;
      display: block;
      padding: 7px 0;
      font-size: 16px;
      font-weight: 600;
      @media only screen and (max-width: 450px) {
        font-size: 20px;
      }
    }

    input.input-field {
      padding: 10px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #bebebe;
      width: 100%;
      height: ${props?.height};
      color: #000000;
      outline: 0;
      transition: all 0.1s !important;
      font-size: 17px;

      :focus {
        border: 2px solid #6d5086;
      }
    }

    input.center-mode {
      text-align: center !important;
    }

    .hint {
      font-size: 13px;
      margin-top: 2px;
      font-weight: 500;
    }

    .infoText {
      font-size: 14px;
      color: #000000a6;
    }

    span.required-sign {
      color: red !important;
    }

    input.input-field.error {
      border-color: red !important;
      color: red !important;
    }

    .hint.error {
      color: red !important;
    }
  `,

  header: css``,
});

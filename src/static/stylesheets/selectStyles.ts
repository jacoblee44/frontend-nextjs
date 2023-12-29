import { css } from "@emotion/css";

export const useSelectStyles = () => ({
  root: css`
    margin-top: 20px;
    width: 100%;

    label {
      font-family: 'Urbanist', serif;
      color: #000000;
      display: block;
      padding: 7px 0;
      font-size: 16px;
      font-weight: 600;
      @media only screen and (max-width: 450px){
        font-size: 20px;
      }
    }
    
    .select-wrapper {
      display: inline-block;
      border-radius: 10px;
      border: 1px solid #bebebe;
      padding: 0 6px;
      background: #ffffff;
    }

    select {
      padding: 10px;
      background: #ffffff;
      border-radius: 10px;
      border: 0;
      width: 100%;
      height: 45px;
      color: #000000;
      outline: 0;
    }

    span {
      color: red;
    }
  `,

});

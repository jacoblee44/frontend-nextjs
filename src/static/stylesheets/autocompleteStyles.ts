import { css } from "@emotion/css";

export const useAutocompleteStyles = () => ({
  root: css`
    margin-top: 20px;
    width: 100%;

    label {
      font-family: 'Urbanist', serif;
      color: #000000;
      display: block;
      padding: 7px 0;
      font-size: 24px;
      font-weight: 600;
      @media only screen and (max-width: 450px){
        font-size: 20px;
      }
    }

    select {
      padding: 0px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #000000;
      width: 100%;
      height: 45px;
      color: #000000;
    }

    span {
      color: red;
    }

    .MuiAutocomplete-root .MuiInputBase-root {
      padding:0px;
    }
    .MuiAutocomplete-root .MuiInputBase-root input, .MuiAutocomplete-root .MuiInputBase-root select  {
      border-color:#d6d2d2;
    }
  `,

});

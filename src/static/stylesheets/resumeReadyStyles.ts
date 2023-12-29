import { css } from "@emotion/css";

export const useResumeReadyStyles = () => ({
  root: css`
    font-family: 'Urbanist', serif;
    padding: 45px 0;
    .box{
          width: 750px;
          margin: 0 auto;
          text-align: center;
          @media only screen and (max-width: 900px){
              width: 450px;
           }
          @media only screen and (max-width: 450px){
             width: 300px;
           }
          h2{
              font-family: 'Urbanist', serif;
              color: #000000;
              font-size: 36px;
              font-weight: 600;
          }
  
          p{
              font-size: 24px !important;
              color: #000000;
              margin-bottom: 20px;
              font-weight: 400;
              font-family: 'Urbanist', serif;
          }
          
    }
  `,


});
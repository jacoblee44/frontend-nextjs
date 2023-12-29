import { css } from "@emotion/css";

export const useApplyForJobStyles = () => ({
  root: css`
    display: flex;
    flex-grow: 1;
    min-height: 92vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30px 0;

    .box {
      width: 830px;
      box-shadow: 0px 0px 20px #00000040;
      background: #F7F6FB;
      border-radius: 10px;
      padding: 40px;
      margin-bottom: 50px;
      
      @media only screen and (max-width: 850px){
        width: 430px;
        padding: 30px;
      } 
      @media only screen and (max-width: 450px){
        width: 350px;
        padding: 20px;
      }

      img {
        width: 220px;
      }

      h1 {
        font-size: 24px;
        color: #000000;
        font-weight: 600;
        font-family: 'Urbanist',serif;
        @media only screen and (max-width: 450px){
          font-size: 20px;
        }
      }

      h3 {
        font-size: 20px;
        color: #000000;
        font-family: 'Urbanist',serif;
        font-weight: 500;
         @media only screen and (max-width: 450px){
          font-size: 16px;
        }
      }
      
      .exit{
        text-align: right;
        color: #6D5086;
        font-size: 24px;
      }
    }
  `,
});

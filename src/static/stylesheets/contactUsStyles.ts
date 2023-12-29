import { css } from "@emotion/css";

export const useContactUsStyles = () => ({
  root: css`
      background: #FAFAFA;
     .left-side{
        background: #6D5086;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 90px 0;
        height: 100%;
     }
     
     .box{
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        
        h2{
          font-size: 36px;
          color: #6D5086;
          font-family: 'Urbanist', serif;
          font-weight: 600;
          margin-bottom: 30px;
        }
        
        .form{
          width: 600px;
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          
          @media only screen and (max-width:1212px){
            width: 400px;
          } 
          @media only screen and (max-width:815px){
            width: 250px;
          }
          
          @media only screen and (max-width:600px){
            width: 400px;
          }
        }
        
        .css-1yl9jzc {
          text-align: center;
        }
     }
  `,
});

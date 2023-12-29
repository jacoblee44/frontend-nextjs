import { css } from "@emotion/css";

export const useJobPostConfirmationStyles = () => ({
  root: css`
      padding: 80px 20px;
     .confirmation-box{
        background: #F7F6FB 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        padding: 40px;
        margin: 0 auto;
        width: 620px;
        @media only screen and (max-width: 450px){
            padding: 20px;
        }

        h4{
            font-size: 24px;
            color: #000000;
            font-weight: 600;
            font-family: 'Urbanist', serif;

            @media only screen and (max-width: 450px) {
                font-size: 17px;
            }
        }

        h2{
            font-size: 40px;
            color: #000000;
            font-weight: 600;
            text-align: center;
            font-family: 'Urbanist', serif;
            padding-bottom: 40px;
            @media only screen and (max-width: 450px) {
                font-size: 17px;
            }
        }

        p{
            color: #6D5086;
            font-weight: 300;
            font-size: 32px;
            padding-top: 10px;
            font-family: 'Urbanist', serif;
            @media only screen and (max-width: 450px) {
                font-size: 14px;
            }
        }

        .css-1azbn35{
          text-align: center;
          margin-top: 50px;
        }

     
     }

 
  `,


});

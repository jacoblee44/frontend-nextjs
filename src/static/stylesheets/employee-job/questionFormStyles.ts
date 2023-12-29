import { css } from "@emotion/css";

export const useQuestionFormStyles = () => ({
  root: css`
    padding: 30px 180px;

    @media only screen and (max-width: 1280px){
        padding: 30px 100px;
    }

   
    @media only screen and (max-width: 780px){
        padding: 20px 50px;
    }
    @media only screen and (max-width: 500px){
        padding: 10px 20px;
    }
    font-family: "Urbanist", sans-serif !important;
     .box{
        background: #F7F6FB 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        padding: 40px;
        margin-bottom: 30px;

        @media only screen and (max-width: 450px){
            padding: 20px;
        }

        h5{
            display: flex;
            align-items: center;
            color: #000000;
            gap: 10px;
        }

        h2{
            font-family: "Urbanist", sans-serif !important;
            font-size: 24px;
            color: #000000;
            font-weight: 600;

            @media only screen and (max-width: 450px) {
                font-size: 17px;
            }
        }

        h3{
            font-family: "Urbanist", sans-serif !important;
            color: #000000;
            font-size: 20px;
            font-weight: 600;
        }

        p{
            font-family: "Urbanist", sans-serif !important;
            color: #000000;
            font-weight: 300;
            font-size: 18px;
            padding-top: 10px;

            @media only screen and (max-width: 450px) {
                font-size: 14px;
            }
        }

        

        input, select{
            background: #F7F6FB !important;

            @media only screen and (max-width: 450px) {
                margin-top: 10px;
            }
        }

        .text-box{
            margin-top: 20px;

            .css-1gmvpva{
                margin-top: 0;
            }
        }

        .qsn-box{
            background: #8F77A4 0% 0% no-repeat padding-box;
            border-radius: 10px 10px 0px 0px;
            padding: 24px 40px;
            position: relative;

            h4{
                font-family: "Urbanist", sans-serif !important;
                color: #ffffff;
                display: flex;
                gap: 20px;
                font-weight: 600;

                span{
                    font-weight: normal;
                }
            }

            svg{
                position: absolute;
                top: 14px;
                right: 14px;
                font-size: 30px;
                cursor: pointer;
            }
        }

        .content-box{
            border: 1px solid #5A5A5A;
            border-radius: 0px 0px 10px 10px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .radio-box{
            border: 1px solid #000000;
            border-radius: 10px;
            padding: 10px;
            align-items: center;
            margin: 20px 0;
            min-height: 45px;

            span{
                font-family: "Urbanist", sans-serif !important;
                color: #000000;
                font-weight: 500;
                font-size:20px;

                @media only screen and (max-width: 450px){
                    font-size: 16px;
                }
            }

            p{
                padding-left: 30px;
                padding-top: 0;
                font-weight: 300;
                margin-top: -10px;
            }
        }
     }

     .bottom{
        background: #F7F6FB 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        width: 100%;
        padding: 30px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: 450px){
           flex-direction: column;
           text-align: left;
        }

        button{
            margin-top: 0;

            @media only screen and (max-width: 450px){
                width: 180px;
                font-size: 18px;
             }
            
        }
     }
  `,

 
});

import { css } from "@emotion/css";

export const useJobTypeFormStyles = () => ({
  root: css`
  font-family: 'Urbanist';
  .box{
        
        h2{
            color: #000000;
            font-size: 36px;
            padding-bottom: 20px;
        }

        h3{
            font-size: 24px !important;
            color: #000000;
            margin-top: 20px;
        }

        span{
            color: #000000;
            font-size: 18px;
            font-weight: 300;
        }

        a{
            color: #6D5086;
            text-decoration: underline;
        }

        .desired{
            border: 1px solid #5A5A5A;
            padding: 20px;
            border-radius: 10px;

            .relocate{
                background: #8F77A4;
                padding: 20px 30px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;

                span{
                    color: #ffffff;
                }
            }
        }

        .desire-type{
            display: flex;
            flex-direction: column;
        }

        .desired-pay{
            margin-top: 20px;
            border: 1px solid #000000;
            padding: 20px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
        }

        .bottom{
            width: 180px;
            float: right;
        }

        

    }
  `,


});

import { css } from "@emotion/css";

export const useSalaryCardStyles = () => ({
  root: css`
        .card{
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #707070;
            border-radius: 10px;
            padding: 20px;

            h2{
                font-size: 28px !important;
                color: #292929;
                font-family: 'Urbanist', serif;
                font-weight: 600;
            }

            h5{
                font-size: 18px;
                color: #6D5086;
                font-family: 'Urbanist', serif;
                font-weight: 600;
                display: flex;
                align-items:center;
                justify-content: space-between;

            }

            .bottom-items{
                padding-top: 28px;
                display: flex;
                gap: 30px;
                color: #000000;

                a{
                    font-family: 'Urbanist', serif;
                    font-size: 18px;
                    text-decoration: underline;
                    font-weight: 300;
                }
            }
        }
  `,

});

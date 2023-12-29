import { css } from "@emotion/css";

export const useCareerCardStyles = () => ({
  root: css`
        .card{
            
            border-radius: 10px;
            box-shadow: 0px 3px 20px #00000040;

            .content{

                h2,h3,h4,h5{
                    font-family: 'Urbanist', serif;
                }
                h2{
                    
                    font-size: 24px !important;
                    font-weight: 600;
                    color: #000000;
                }

                h3{
                    font-size: 24px;
                    color: #6D5086;
                    padding-top: 10px;
                }

                .growth{
                    margin-top: 15px;
                    background: #E4F7E6 0% 0% no-repeat padding-box;
                    border-radius: 10px;
                    display: inline-block;
                    padding: 12px 10px;

                    h4{
                        font-family: 'Urbanist', serif;
                        font-size: 20px;
                    }
                }

                h5{
                    font-size: 20px;
                    font-weight: 300;
                    padding-top: 15px;
                }
            }

            
        }
  `,

});

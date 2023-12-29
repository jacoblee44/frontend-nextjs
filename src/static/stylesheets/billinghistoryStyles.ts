import { css } from "@emotion/css";

export const useBillingHistoryStyles = () => ({
  root: css`
    padding: 20px 30px;
    font-family: "Urbanist", sans-serif !important;
     .box{
        .top-bar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;

            h3{
                color: #000000;
                font-size: 36px;
            }

            .MuiIconButton-root{
                border: 2px solid #6D5086;
                border-radius: 10px !important;
                margin-right: 20px;
                margin-top: 20px;

                svg{
                    color: #6D5086;
                }
            }

            .css-1o4f4t0{
                margin: 0 !important;
            }
        }

        .item-box{
            margin-top: 30px;
            .single-item{
                background: #F7F6FB 0% 0% no-repeat padding-box;
                box-shadow: 0px 0px 20px #00000040;
                border-radius: 10px;
                display: flex;
                padding: 10px;
                justify-content: space-between;
                align-items: center;
                position: relative;

                .title{
                    h2, p, h4, span{
                        color: #000000;
                        font-family: "Urbanist", sans-serif !important;
                    }

                    h4{
                        font-weight: 500;
                        font-size: 20px;
                    }
                    h2{
                        font-size: 24px;
                        font-weight: 600;
                    }

                    span{
                        font-size: 20px;
                        font-weight: 500;
                    }
                }

                .pending-box, .paid-box{
                    background: #FF8383 0% 0% no-repeat padding-box;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 3px 10px;
                }
                .paid-box{
                    background: #74FB68 0% 0% no-repeat padding-box;
                }

                .action{
                    div {
                        margin:0px;
                    }
                    svg{
                        color: #000000;
                    }
                    button{
                        padding: 3px 10px;
                        height:auto;
                    }
                }
                
            }
        }

     }
  `, 
});

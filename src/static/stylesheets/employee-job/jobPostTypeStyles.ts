import { css } from "@emotion/css";

export const useJObPostTypeStyles = () => ({
  root: css`
    padding: 30px 180px;

    @media only screen and (max-width: 1280px) {
      padding: 30px 100px;
    }
    
    @media only screen and (max-width: 780px) {
      padding: 20px 50px;
    }

    @media only screen and (max-width: 500px) {
      padding: 10px 20px;
    }

    .box {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      padding: 40px;

      @media only screen and (max-width: 450px) {
        padding: 20px;
      }

      h2 {
        font-size: 23px;
        color: #000000;
        font-weight: 600;
        font-family: 'Urbanist', serif;

        @media only screen and (max-width: 450px) {
          font-size: 19px;
        }
      }

      .radio-box {
        border: 1px solid #bebebe;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;

        .css-1xnamfg {
          margin: 0;
        }
        
        button {
          padding: 0;
        }

        @media only screen and (max-width: 680px) {
          button {
            width: 110px;
            font-size: 16px;
            padding: 5px 10px;
            height: 35px;

            @media only screen and (max-width: 500px) {
              display: none;
            }
          }

          .css-j204z7-MuiFormControlLabel-root {
            margin-right: 0;
          }
        }

        .content {
          width: 100%;

          h3 {
            color: #000000;
            font-size: 17px;
            font-weight: 500;

            @media only screen and (max-width: 680px) {
              font-size: 18px;
            }
            @media only screen and (max-width: 450px) {
              font-size: 14px;
              font-weight: 600;
            }
          }

          p {
            color: #000000;
            font-size: 14px;

            @media only screen and (max-width: 680px) {
              font-size: 12px;
            }
          }
        }

        .css-9omyfy {
          margin-top: 0;
        }
      }

      .search-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #bebebe;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 20px;

        input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          color: #3e3e3e;
          font-size: 16px;
          font-family: 'Urbanist', serif;
        }

        svg {
          color: #6D5086;
        }
      }

      .MuiTableHead-root {
        background: #8F77A4 0% 0% no-repeat padding-box;
        border-radius: 10px 10px 0px 0px;

        tr {

          th {
            color: #ffffff;
            font-size: 20px;
            font-family: 'Urbanist', serif;
          }
        }

      }

      .table-container {
        table {
          
        }
        
        tr {
          th, td {
            font-size: 14px !important;
            font-family: 'Urbanist', serif;
          }
          th {
            padding: 13px 15px;
          }
        }
      }
      
      tbody {
        th {
          padding: 0 20px;
        }
      }
    }

    .bottom {
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      border-radius: 10px;
      width: 100%;
      padding: 30px;
      margin-top: 30px;
      text-align: end;

      button {
        margin-top: 0;
      }
    }
  `,


});

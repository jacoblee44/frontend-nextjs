import { css } from "@emotion/css";

export const useEmployeeAccountStyles = () => ({
  root: css`
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 60px;
    
    * {
      transition: all 0.3s;
    }

    @media only screen and (max-width: 899px) {
      padding: 0 20px;
    }

    .box {
      margin: 0 auto;
      padding: 40px;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;

      @media only screen and (max-width: 899px) {
        padding: 25px;
      }
      
      .top-content {
        h2 {
          font-family: 'Urbanist', serif;
          color: #000000;
          font-size: 25px;
          font-weight: 500;
          margin-bottom: 10px;
          
          @media only screen and (max-width: 450px) {
            font-size: 24px;
          }
        }

        p {
          font-family: 'Urbanist', serif;
          font-size: 17px;
          color: #000000;
          padding-bottom: 20px;
          @media only screen and (max-width: 450px) {
            font-size: 16px;
          }
        }
      }

      .info-box {
        background: #8F77A4;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 25px;
        border-radius: 10px;

        p {
          font-family: 'Urbanist', serif;
          width: 80%;
          font-size: 15px;
          color: #ffffff;
          font-weight: 500;
          margin-left: 15px;
        }
        
        * {
          color: #ffffff;
        }
      }
    }
  `,
});

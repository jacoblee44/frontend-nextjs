import { css } from "@emotion/css";

export const useFindSalariesStyles = () => ({
  root: css`
    .top-bar{
      background: #1B113F 0% 0% no-repeat padding-box;
      border: 1px solid #707070;
      padding-top: 100px;
      padding-bottom: 70px;
      padding-left: 200px;
      padding-right: 200px;
      
      @media only screen and (max-width: 1100px){
       padding-top: 90px;
       padding-bottom: 70px;
       padding-right: 100px;
       padding-left: 100px;
      }
      @media only screen and (max-width: 900px){
       padding-top: 50px;
       padding-bottom: 30px;
       padding-right: 70px;
       padding-left: 70px;
      }
      @media only screen and (max-width: 600px){
       padding-top: 30px;
       padding-bottom: 20px;
       padding-right: 40px;
       padding-left: 40px;
      }
      
      h2{
        font-size: 48px;
        font-family: 'Urbanist', serif;
        font-weight: 600;
        color: #ffffff;
      }
      
      p{
        font-size: 28px;
        font-weight: 300;
        font-family: 'Urbanist', serif;
        color: #ffffff;
      }
    }
    
    .search-box {
        margin-left: 200px;
        margin-right: 200px;
        background: #ffffff;
        height: 90px;
        border-radius: 10px;
        padding: 10px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -45px;
        border: 1px solid #707070;
        margin-bottom: 50px;
        
        @media only screen and (max-width: 1100px){
          margin-left: 100px;
          margin-right: 100px;
        }
        @media only screen and (max-width: 900px){
          margin-left: 70px;
          margin-right: 70px;
        }
        @media only screen and (max-width: 600px){
          margin-left: 40px;
          margin-right: 40px;
        }
        
        p{
          color: #000000;
          font-size: 24px;
          font-weight: 600;
          padding-right: 20px;
        }

        @media only screen and (max-width: 790px) {
          height: 60px;
        }

        @media only screen and (max-width: 430px) {
          height: 40px;
          padding: 5px 10px;
        }


        input, select {
          height: 100%;
          background: transparent;
          border: none;
          width: 100%;
          margin-right: 10px;
          font-size: 24px;
          outline: 0;
          color: #000000;

          @media only screen and (max-width: 790px) {
            font-size: 18px;
          }
          @media only screen and (max-width: 430px) {
            font-size: 14px;
          }
        }

        button {
          background: #6D5086;
          height: 100%;
          border-radius: 10px;
          width: 70px;
          color: #ffffff;
          @media only screen and (max-width: 790px) {
            width: 50px;
          }

          svg {
            font-size: 30px;
            width: 30px;
            height: 30px;
          }
        }
      }

    .paying-jobs{
      margin: 0 200px;
      padding: 30px 0;
      @media only screen and (max-width: 1100px){
       margin: 30px 100px;
      }
      @media only screen and (max-width: 900px){
       margin: 30px 70px;
      }
      @media only screen and (max-width: 600px){
       margin: 20px 40px;
      }
      
      h2{
        color: #000000;
        font-size: 36px;
        font-weight: 600;
        font-family: 'Urbanist', serif;
      }
      
      select{
        background: #6D5086 0% 0% no-repeat padding-box;
        border-radius: 10px;
        padding: 15px 30px;
        font-size: 24px;
        font-weight: 600;
        font-family: 'Urbanist', serif;
        outline: none;
        margin-top: 20px;
      }
    }
    .career{
      margin: 0 200px;
      padding: 40px 0;
      @media only screen and (max-width: 1100px){
       margin: 30px 100px;
      }
      @media only screen and (max-width: 900px){
       margin: 30px 70px;
      }
      @media only screen and (max-width: 600px){
       margin: 20px 40px;
      }
      
      h2{
        color: #000000;
        font-size: 36px;
        font-weight: 600;
        font-family: 'Urbanist', serif;
      }
    }
    .banner{
      margin: 30px 200px;
      @media only screen and (max-width: 1100px){
       margin: 30px 100px;
      }
      @media only screen and (max-width: 900px){
       margin: 30px 70px;
      }
      @media only screen and (max-width: 600px){
       margin: 20px 40px;
      }
      background: #6D5086 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      height: 135px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      h3{
        font-size: 36px;
        font-weight: 600;
        font-family: 'Urbanist', serif;
      }
    }
    
    .frequently-search{
      margin: 30px 200px;
      
      @media only screen and (max-width: 1100px){
       margin: 30px 100px;
      }
      @media only screen and (max-width: 900px){
       margin: 30px 70px;
      }
      @media only screen and (max-width: 600px){
       margin: 20px 40px;
      }
      
      h2{
        font-size: 36px;
        font-weight: 600;
        font-family: 'Urbanist', serif;
        color: #000000;
      }
      ul {
        padding: 0;
        margin-top: 30px;
          li{
            color: #000000;
            list-style: none;
            font-size: 20px;
            font-family: 'Urbanist', serif;
            font-weight: 400;
            cursor: pointer;
          }
        }
    }
  `,


});

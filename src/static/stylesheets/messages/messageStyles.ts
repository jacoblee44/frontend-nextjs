import { css } from "@emotion/css";

export const useMessageStyles = () => ({
  root: css`
    padding: 100px 30px;
    margin: 0 120px;
    p,h2,h3{
      font-family: 'Urbanist', serif;
    }
    
    .left-box{
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 30px;
      min-height: 820px;
      
      h2{
        color: #000000;
        font-size: 36px;
        font-weight: 600;
      }
    }
    
    .right-box{
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 30px;
      min-height: 820px;
      
      
      .message-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 100px;
        h2{
          font-size: 36px;
          font-weight: 600;
          color: #000000;
          padding-bottom: 40px;
        }
        
        p{
          color: #000000;
          font-size: 24px;
          padding-bottom: 30px;
        }
      }
      
      
    }
  `,

});

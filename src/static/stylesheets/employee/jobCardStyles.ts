import { css } from "@emotion/css";

export const useJobCardStyles = () => ({
  root: css`
    padding-top: 40px;
    padding-bottom: 60px;
    p, h2, h3{
    font-family: 'Urbanist', serif;
    }
    
    .card{
      display: flex;
      justify-content: space-between;
      
      .content{
        width: 55%;
        h2{
          color: #292929;
          font-weight: 600;
          font-size: 28px;
        }
        
        h3{
          color: #000000;
          font-weight: 600;
          font-size: 24px;
        }
        
        p{
          color: #5A5A5A;
          font-size: 20px;
        }
      }
      
      .button-box{
        display: flex;
        align-items: baseline;
        gap: 20px;
        .css-gsgjqg, .css-k17h2c{
          margin: 0;
        }
        svg{
          color: #000000;
        }
      }
    }
    
    
  
  `,
});

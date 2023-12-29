import { css } from "@emotion/css";

export const useLegalTermsStyles = () => ({
  root: css`
   background: #FAFAFA;
    p,h2,h3{
      font-family: 'Urbanist', serif;
    }
  
    .banner{
        height: 300px;
        background: #6D5086;
        display: flex;
        align-items: center;
        justify-content: start;
        
        @media only screen and (max-width: 530px){
            height: 250px;
            text-align: center;
        }
        
        h2{
          font-size: 36px;
          color: #ffffff;
          font-weight: 600;
          @media only screen and (max-width: 530px){
            font-size: 26px;
          }
        }
     }
     
     .content-box{
        background: #FAFAFA;
        padding: 100px 200px;
        
        @media only screen and (max-width: 1024px){
        padding: 60px 120px;
        }
        
        @media only screen and (max-width: 830px){
          padding: 40px 60px;
        }
        
        @media only screen and (max-width: 530px){
          padding: 20px 30px;
        }
        
          .item{
            background: #ffffff;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 20px 20px;
            border-radius: 10px;
            
            :hover{
              background: #bababa;
            }
            p{
              color: #6D5086;
              font-size: 18px;
              font-weight: 600;
            }
            svg{
              color: #6D5086;
            }
         
          
        }
        
        .details{
          margin-top: 50px;
          background: #ffffff;
          padding: 20px 30px;
          border-radius: 10px;
          p{
            color: #000000;
            padding: 10px 0;
          }
        }
     }
    
  `,

});

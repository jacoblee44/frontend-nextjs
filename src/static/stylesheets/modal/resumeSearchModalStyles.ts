import { css } from "@emotion/css";

export const useResumeSearchModalStyles = () => ({
  root: css`
    width: 900px !important;
    
    .top-banner{
      position: relative;
      padding: 40px 20px 25px 20px;
      svg{
        position: absolute;
        top:0;
        right: 0;
        color: #6D5086;
        border: 2px solid #6D5086;
        border-radius: 10px;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }
      
      .content{
        display: flex;
        justify-content: space-between;
        align-items: end;
        
        h2{
          color: #6D5086;
          font-size: 36px;
        }
      }
    }

    .invite-pop {
      position: absolute;
      background: #FAFAFA 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 10px;
      width: 300px;
      right: 0px;
      top:80px;

      .MuiListItem-root{
        border: 1px solid #6D5086;
        border-radius:5px;
        margin-bottom:2px; 
        display:block !important;    
      }
      .MuiTypography-body1 {
        font-size:15px !important;
      }
    }
    
     .review-box{
        background: #FAFAFA 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 20px #00000040;
        border-radius: 10px;
        padding: 30px;
        
        .single-box{
          h4{
            font-size: 20px;
            color: #000000;
            font-family: 'Urbanist', serif;
            font-weight: 400;
          }
          
          h2{
            font-size: 24px;
            color: #000000;
            font-family: 'Urbanist', serif;
            font-weight: 600;
          }
        }
        
        .info{
          text-align: left;     
          p{
              color: #000000;
              font-size: 20px;
          }
        }
        
        .card {
          h2 {
            font-size: 28px;
            font-weight: 600;
            padding: 0 !important;
            color: #000000;
          }
    
          h4 {
            color: #000000;
            font-size: 24px;
          }
    
          p {
            color: #5A5A5A;
            font-size: 24px;
          }
        }
     }
    
  `,
});

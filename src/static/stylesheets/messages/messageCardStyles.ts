import { css } from "@emotion/css";

export const useMessageCardStyles = (isActive:boolean = false, selected:boolean = false) => ({
  root: css`
    p,h2,h3, h4{
      font-family: 'Urbanist', serif;
    }
    
    .user-box{
      display: flex;
      padding: 12px;
      /*width: 345px;*/
      background: ${selected ? "#F5F6F7" : "transparent"};
      
      .avatar{
        position: relative;
        .MuiAvatar-root{
          border-radius: 0 !important;
          width: 40px;
          height: 40px;
        }
        
        svg{
          position: absolute;
          color: ${isActive ? '#32B826' : '#EDCD23'};
          width: 10px;
          height: 10px;
          right: 0;
          bottom: 8px;
        }
      }
      
      
      h3{
        color: #000000;
        font-size: 18px;
      }
      
      h4{
        color: #9B98AC;
        font-size: 16px;
      }
      
      .timer{
        color: #9B98AC;
        font-size: 11px !important;
        width: 65px;
      }
    }
    
  `,

});

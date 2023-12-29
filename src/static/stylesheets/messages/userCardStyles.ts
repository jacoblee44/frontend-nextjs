import { css } from "@emotion/css";

export const useUserCardStyles = (isActive:boolean = false, selected:boolean = false) => ({
  root: css`
    p,h2,h3, h4{
      font-family: 'Urbanist', serif;
    }
    
    .user-box{
      display: flex;
      justify-content: space-between;
      padding: 12px;
      width: 345px;
      background: ${selected ? "#F5F6F7" : "transparent"};
      border-bottom: 1px solid #dedede;
      
      .avatar{
        position: relative;
        .MuiAvatar-root{
          border-radius: 0 !important;
          width: 45px;
          height: 45px;
        }
        
        svg{
          position: absolute;
          color: ${isActive ? '#32B826' : '#EDCD23'};
          width: 10px;
          height: 10px;
          right: 0;
          bottom: 5px;
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

import { css } from "@emotion/css";

export const useAdminSidebarStyles = () => ({
  root: css`
    padding: 10px 10px !important;
    
    .top-bar {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-family: Urbanist,serif;
      padding: 0 8px;
      
      * {
        color: #ffffff !important;
      }
    }
    
    .menu-items {
      margin-top: 20px;
      position:fixed;
      
      .menu-item {
        height: 60px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        gap: 12px;
        cursor: pointer;
        margin-bottom: 4px;
        color: #ffffff;
        transition: all 0.3s !important;
        
        :hover {
          background: #ffffff;
          * {
            color: #000000 !important;
          }
        }
        
        .menu-label {
          display: none;
        }
        
        .show {
          display: block;
          
          /*
          opacity: 0;
          animation: show 0.2s forwards;
          animation-delay: 0.2s;

          @keyframes show {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }*/
        }
      }
      
      .menu-item.active {
        background: #ffffff;
        * {
          color: #000000 !important;
          font-weight: 500;
        }
      }

      .menu-item.closed {
        width: auto !important;
        justify-content: center;
      }
    }
  `,
});
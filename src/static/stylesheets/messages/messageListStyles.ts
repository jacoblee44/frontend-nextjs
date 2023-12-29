import { css } from "@emotion/css";

export const useMessageListStyles = () => ({
  root: css`
    padding: 100px 30px;
    margin: 0 80px;
    p,h2,h3{
      font-family: 'Urbanist', serif;
    }

    .box{
      background: #F7F6FB 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      padding: 30px;

      .welcome-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        h2{
          font-size: 36px;
          font-weight: 600;
          color: #000000;
          padding-bottom: 30px;
        }        
        p{
          color: #000000;
          font-size: 24px;
          padding-bottom: 20px;
        }
      }
      
      .message-box{
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border-radius: 15px;       
        
        .tob-bar{
          border-bottom: 1px solid #E0E0E0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          .search{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 345px;
            padding: 10px;
            border-right: 1px solid #AAA9B2;
            height: 80px;
            p{
              display: flex;
              align-items: center;
              gap: 10px;
              color: #AAA9B2;
            }
            svg{
             color: #AAA9B2 ;
            }
          }
          
          .user{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            width: 72%;
            
            h2{
              color: #000000 ;
              font-size: 24px;
            }
            
            p{
              color: #9B98AC ;
              font-size: 16px;
            }
            
            svg{
              color: #AAA9B2;
            }
          }
        }
        .bottom-bar{
          display: flex;
          
          
          .user-list{
              width: 345px;
          }
          
          .chat-box{
            width: 100%;
          }
          
          .type-box{
            width: 100%;
            
            .input-box{
              width: 100%;
              padding-top: 10px;
              input{
                width: 100%;
                background: transparent;
                outline: none;
                border: none;
                color: #9B98AC;
                font-size: 18px;
                padding: 8px;
                
              }
            }
            
            .option-bar{
                display: flex;
                justify-content: space-between;
                padding: 8px;
                .right-icon-list{
                  display: flex;
                  gap: 10px;
                  svg{
                    color: #A0A0A0;
                    cursor: pointer;
                  }
                }
            }
          }
        }
      }
    }
    
  `,

});

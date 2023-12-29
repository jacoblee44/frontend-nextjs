import { css } from "@emotion/css";

export const useReviewCardStyles = (style: any = "normal") => ({
  root: css`
    font-family: "Urbanist", serif;

    .card {
      position: relative;
      padding: ${style === "border" ? "24px" : "12px 0"};
      border: ${style === "border"
        ? "2px solid #000000"
        : "2px solid transparent"};
      border-radius: 10px;
      @media only screen and (max-width: 700px) {
        padding: ${style === "border" ? "24px" : "3px 0"};
      }

      h2 {
        font-size: ${style === "border" ? "24px" : "17px"};
        font-weight: 600;
        padding: 0 !important;
        @media only screen and (max-width: 1024px) {
          font-size: 16px;
        }
        @media only screen and (max-width: 700px) {
          font-size: ${style === "border" ? "24px" : "12px"} !important;
        }
      }

      h4 {
        color: #000000;
        font-size: ${style === "border" ? "20px" : "16px"};
        @media only screen and (max-width: 500px) {
          font-size: ${style === "border" ? "20px" : "12px"};
        }
      }

      p {
        color: ${style === "border" ? "#000000" : "#5A5A5A"};
        font-size: ${style === "border" ? "18px" : "15px"};
        @media only screen and (max-width: 500px) {
          font-size: ${style === "border" ? "18px" : "12px"};
        }
      }

      .btn-group {
        position: absolute;
        top: 24px;
        right: ${style === "border" ? "24px" : "0"};
        display: flex;
        align-items: center;

        span {
          margin-left: 8px !important;
          width: 18px !important;
          height: 18px !important;
          cursor: pointer;

          @media only screen and (max-width: 500px) {
            width: 15px !important;
            height: 15px !important;
          }

          img {
            width: 100% !important;
            height: 100% !important;
          }
        }
      }
    }
  `,
});

// .card {
//   position: relative;
//   padding: ${style === "border" ? "24px" : "24px 0"};
//   border: ${style === "border" ? "2px solid #000000" : "2px solid transparent"};
//   border-radius: 10px;

//   h2 {
//     font-size: ${style==="border" ? "24px" : "28px"};
//     font-weight: 600;
//     padding: 0 !important;
//   }

//   h4 {
//     color: #000000;
//     font-size: ${style==="border" ? "20px" : "24px"};
//   }

//   p {
//     color: ${style==="border" ? "#000000" : "#5A5A5A"};
//     font-size: ${style==="border" ? "18px" : "24px"};
//   }

//   .btn-group {
//     position: absolute;
//     top: 24px;
//     right: ${style === "border" ? "24px" : "0"};
//     display: flex;
//     align-items: center;

//     span {
//       margin-left: 8px !important;
//       width: 24px !important;
//       height: 24px !important;
//       cursor: pointer;

//       img {
//         width: 100% !important;
//         height: 100% !important;
//       }
//     }
//   }
// }

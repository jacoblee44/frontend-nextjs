import { css } from "@emotion/css";

export const useEmployeeProfileStyles = () => ({
  root: css`
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 60px;
    width: 785px;
    margin: 0 auto;

    @media only screen and (max-width: 900px) {
      width: 100%;
      padding: 30px;
    }
    @media only screen and (max-width: 500px) {
      width: 100%;
      padding: 20px;
    }

    p,
    h2 {
      font-family: "Urbanist", serif;
    }

    .profile-img-contaienr {
      @media only screen and (max-width: 900px) {
        margin-bottom: 0;
      }

      .profile-img {
        width: 80px;
        height: 80px;
        padding: 15px;
        @media only screen and (max-width: 900px) {
          width: 70px;
          height: 70px;
        }
        @media only screen and (max-width: 500px) {
          width: 50px;
          height: 50px;
        }
      }
      .profile-name {
        font-size: 25px;
        @media only screen and (max-width: 900px) {
          font-size: 20px;
        }
        @media only screen and (max-width: 500px) {
          font-size: 16px;
        }
      }
    }

    .box {
      padding: 20px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 10px;
      margin: 20px 0;
      cursor: pointer;
      @media only screen and (max-width: 500px) {
        padding: 15px;
        margin: 10px 0;
      }

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          color: #000000;
          font-size: 17px;
          font-weight: 500;
          font-family: "Urbanist", serif;
          @media only screen and (max-width: 500px) {
            font-size: 14px;
          }
        }

        svg {
          color: #6d5086;
          @media only screen and (max-width: 500px) {
            font-size: 16px;
          }
        }
      }

      .resume {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          color: #000000;
          font-size: 16px;
          font-weight: 500;
          font-family: "Urbanist", serif;
          @media only screen and (max-width: 500px) {
            font-size: 15px;
          }
        }
        .image-container {
          width: 60px;
          @media only screen and (max-width: 500px) {
            width: 50px;
          }
        }

        p {
          color: #000000;
          font-size: 16px;
          font-family: "Urbanist", serif;
          @media only screen and (max-width: 500px) {
            font-size: 15px;
          }
        }

        svg {
          color: #6d5086;
          cursor: pointer;
          @media only screen and (max-width: 500px) {
            font-size: 16px;
          }
        }
      }
    }
    .profile-resume-title {
      font-size: 18px;
      @media only screen and (max-width: 500px) {
        font-size: 16px;
      }
    }

    .professional {
      background: #8f77a4;
      height: 190px;
      box-shadow: 0px 0px 20px #00000040;
      border-radius: 10px;
      position: relative;
      padding: 40px;

      h2 {
        font-size: 24px;
        color: #ffffff;
        font-weight: 600;
        font-family: "Urbanist", serif;
      }

      p {
        font-size: 21px;
        color: #ffffff;
        font-weight: 600;

        text-decoration: underline;
      }

      svg {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        color: #ffffff;
      }
    }

    .text-box {
      border: 1px solid #dadada;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        font-size: 18px;
        color: #000000;
        font-weight: 600;
      }

      p {
        color: #000000;
        font-size: 16px;
      }

      svg {
        color: #6d5086;
        cursor: pointer;
      }
    }

    .job-seekers {
      margin-top: 25px;

      h2 {
        font-size: 25px;
        font-weight: 500;
        color: #000000;
      }

      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #000000;
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        svg {
          color: #6d5086;
          cursor: pointer;
        }
      }
    }
  `,
});

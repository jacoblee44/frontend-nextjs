import { css } from "@emotion/css";
import { themeColors } from "@/config";

export const useHeaderStyles = () => ({
  root: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Quasimoda", serif;
    background: #ffffff;
    height: 68px;
    padding: 0 20px;
    box-shadow: 0px 5px 10px #1b113f40 !important;

    @media only screen and (max-width: 1100px) {
      padding: 0 15px;
    }

    .header-wrapper {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 68px;
      width: 1250px;

      @media only screen and (max-width: 480px) {
        width: 100%;
      }

      .mobile-menu-section {
        display: none;
        margin-right: 15px;

        @media only screen and (max-width: 1100px) {
          display: block;
          padding: 0 15px;
        }
      }

      .header-section {
        display: flex;
        width: 100%;
        //border: 1px solid red;
      }

      .brand-logo {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;

        .mobile-sidebar-menu-icon {
          display: none;

          @media only screen and (max-width: 995px) {
            display: block;
          }
        }

        a {
          cursor: pointer;
          font-family: Urbanist, serif;
          font-weight: bold;
          font-size: 40px;
          color: #000000;
          margin-right: 65px;

          @media only screen and (max-width: 1056px) {
            margin-right: 20px;
          }
          @media only screen and (max-width: 500px) {
            width: 100px;
          }

          img {
            width: 170px !important;
            margin-top: 10px;

            @media only screen and (max-width: 1076px) {
              width: 150px !important;
            }

            @media only screen and (max-width: 420px) {
              position: relative;
              width: 130px !important;
              top: -2px !important;
            }
          }
        }

        @media only screen and (max-width: 370px) {
          width: 150px;
          a {
            font-size: 25px;
          }
        }
      }

      .middle-section {
        width: 350px;

        @media only screen and (max-width: 995px) {
          display: none;
        }
      }

      .right-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .desktop-actions {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          @media only screen and (max-width: 995px) {
            display: none;
          }
        }

        .mobile-actions {
          display: none;

          @media only screen and (max-width: 995px) {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
          }
        }

        .icon-button-group {
          display: flex;
          flex-direction: row;
          gap: 32px;
          align-items: center;

          padding-right: 20px;
        }

        .icon-button {
          position: relative;
          cursor: pointer;

          img {
            width: 22px !important;
          }

          :hover {
            opacity: 0.8;
          }
        }

        .authentication-button-group {
          display: flex;
          gap: 10px;

          @media only screen and (max-width: 480px) {
            gap: 0;
          }

          .authentication-button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid ${themeColors.employerPrimary};
            border-radius: 5px;
            font-size: 14px;
            padding: 6px 15px;
            background: #ffffff;
            color: #2d2d2d;
            font-weight: bold;
            cursor: pointer;

            :hover {
              background: rgba(79, 57, 162, 0.2);
            }

            @media only screen and (max-width: 480px) {
              padding: 6px 5px;
            }
          }

          .authentication-button.no-border {
            border: 0;
            padding: 8px 15px;
          }
        }

        .authentication-button-group.sign-out {
          margin-right: 30px;
        }

        .admin-part {
          padding-left: 20px;
          border-left: 2px solid #000000;

          .profile-menu {
            .MuiMenu-paper {
              width: 400px !important;
              padding: 20px 40px !important;
              background: #f7f6fb !important;
              box-shadow: 0px 0px 20px #00000040;

              li {
                p {
                  font-size: 20px !important;
                }
              }
            }
          }
        }

        .post-job-button {
          display: flex;
          align-items: center;
          padding: 0 15px;
          border-left: 1px solid #000000;
          margin-left: 35px;
          font-family: Urbanist, serif;
          font-size: 16px;

          a {
            cursor: pointer;
            color: #000000;
          }

          @media only screen and (max-width: 670px) {
            display: none;
          }
        }
      }
    }
  `,

  headerTab: css`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;

    .tab-item {
      font-family: Urbanist, serif;
      font-size: 17px;
      color: #000000;
      height: 34px;
      padding: 0 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s !important;

      :hover {
        color: ${themeColors.contractorPrimary};
      }
    }

    .active {
      border-bottom: 2px solid #000000;
    }
  `,

  userDropdownPaper: css`
    position: relative;
    background: #f7f6fb 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 20px #00000040;
    width: 310px;
    padding: 12px;
    font-size: 18px !important;
    color: #2d2d2d;
    border-radius: 10px;

    img {
      width: 18px !important;
    }

    svg {
      font-size: 20px;
    }

    button {
      font-size: 17px !important;
    }

    .MuiMenuItem-root {
      border-radius: 10px;
      margin-bottom: 2px;

      :last-child {
        margin-bottom: 0;
      }
    }
  `,

  publicDrawer: css`
    width: 290px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: ${themeColors.employerPrimary};

    * {
      color: #ffffff;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 95px;

      img {
        width: 180px;
      }
    }

    .list-container {
      display: block;
      flex-grow: 1;
      padding: 10px 15px;

      li {
        border-bottom: 1px solid rgba(58, 30, 111, 0.82);

        :last-child {
          border-bottom: 0;
        }
      }
    }
  `,
});

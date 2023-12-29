import React, { useState } from "react";
import { useHeaderStyles } from "@/static/stylesheets";
import { HeaderTab } from "./HeaderTab";
import UserIcon from "@/static/images/icons/user.png";
import DropdownIcon from "@/static/images/icons/dropdown.png";
import MessageIcon from "@/static/images/icons/messages.png";
import NotificationIcon from "@/static/images/icons/notification.png";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import Image from "next/image";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Profile } from "../modal";
import { Button } from "@/components/atoms/button";
import { useAuthInfo } from "@/hooks/custom";
import { logout } from "@/redux/actions";
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";
import { PublicDrawer } from "@/components/organisms/header/PublicDrawer";

interface HeaderProps {
  variant?: "public" | "admin";
  showMobileMenuIcon?: boolean;

  onMobileMenuClick?(): void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const classes = useHeaderStyles();
  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
  const userDropdownMenuOpen = Boolean(menuAnchorEl);
  const { variant, showMobileMenuIcon, onMobileMenuClick } = props;
  const { loggedIn, userData } = useAuthInfo();
  const [publicDrawerOpen, setPublicDrawerOpen] = useState<boolean>(false);

  const handleClickUserButton = async () => {
    if (loggedIn) {
      if (userData?.accounttype == 'employer') {
        await router.push(routePaths.employer.dashboard);
      } else {
        await router.push(routePaths.employees.myJobs);
      }
    } else {
      await router.push(routePaths.login);
    }
  };

  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };

  const handleClickAccountSettings = async () => {
    await router.push(routePaths.accountSettings);
  };
  const handleClickMyJobs = async () => {
    await router.push(routePaths.employees.myJobs);
  };
  const handleClickProfile = async () => {
    if (userData?.accounttype == 'employer') {
      await router.push(routePaths.employer.employerAccount);
    } else {
      await router.push(routePaths.employees.profile);
    }
  };

  const handleClickMessage = async () => {
    await router.push(routePaths.Message);
  };

  const handleClickLoginButton = async () => {
    await router.push(routePaths.login);
  };

  const handleClickRegisterButton = async () => {
    await router.push(routePaths.contractor.signup);
  };

  const gotoEmployerDashboard = async () => {
    await router.push(routePaths.employer.dashboard);
  };

  const handleClickSignOut = () => {
    logout();
    setMenuAnchorEl(null);
  };

  const handleClickUserDropdownButton = (event: any) => {
    setMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={"header-wrapper"}>
          {showMobileMenuIcon && (
            <div className={"mobile-menu-section"}>
              <IconButton onClick={onMobileMenuClick}>
                <MenuIcon />
              </IconButton>
            </div>
          )}
          <div className={"header-section brand-logo"}>
            {props?.variant === "public" && (
              <div className={"mobile-sidebar-menu-icon"}>
                <IconButton onClick={() => setPublicDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </div>
            )}

            <a onClick={handleClickBrandLogo}>
              <img src={DayrateWorkLogo.src} alt={"Dayratework"} />
            </a>
          </div>
          {variant === "public" && (
            <div className={"header-section middle-section"}>
              <HeaderTab
                tabItems={[
                  {
                    label: "Find Contract Jobs",
                    active: false,
                    hidden: userData?.accounttype !== 'contractor',
                    onClick() {
                      router.push(`${routePaths?.root}./searchterm/-`);
                    }
                  },
                  {
                    label: "Find Resumes",
                    active: false,
                    hidden: userData?.accounttype !== 'employer',
                    onClick() {
                      router.push(routePaths?.employer.searchResume);
                    }
                  },
                  /*{
                    label: "Company Reviews",
                    active: false,
                  }*/
                ]}
              />
            </div>
          )}

          <div className={"header-section right-section"}>
            <div className={"desktop-actions"}>
              {loggedIn && (
                <div className={"authentication-button-group sign-out"}>
                  <span>
                    <button className={"authentication-button"} onClick={handleClickSignOut}>
                      Sign out
                    </button>
                  </span>
                </div>
              )}

              <div className={"icon-button-group"}>
                {/*<span className={"icon-button"} onClick={handleClickMessage}>
                <Image src={MessageIcon} />
              </span>

              <span className={"icon-button"}>
                <Image src={NotificationIcon} />
              </span>*/}

                {/*{variant === "public" && (
                <span className={"icon-button"} onClick={handleClickUserButton}>
                  <Image src={UserIcon} />
                </span>
              )}*/}

                {loggedIn && (
                  <>
                    <span
                      className={"icon-button"}
                      onClick={handleClickUserDropdownButton}
                    >
                      <Image src={UserIcon} />
                      <Image src={DropdownIcon} />
                    </span>
                  </>
                )}
              </div>

              {!loggedIn && (
                <div className={"authentication-button-group"}>
                  <span>
                    <button className={"authentication-button"} onClick={handleClickRegisterButton}>
                      Register
                    </button>
                  </span>

                  <span>
                    <button className={"authentication-button no-border"} onClick={handleClickLoginButton}>
                      Sign In
                    </button>
                  </span>
                </div>
              )}

              {variant === "public" && userData?.accounttype != 'contractor' && (
                <div className={"post-job-button"} onClick={gotoEmployerDashboard}>
                  <a>Employers / Post Job</a>
                </div>
              )}
            </div>

            <div className={"mobile-actions"}>
              {!loggedIn && (
                <div className={"authentication-button-group"}>
                  <span>
                    <button className={"authentication-button"} onClick={handleClickRegisterButton}>
                      Register
                    </button>
                  </span>

                  <span>
                    <button className={"authentication-button no-border"} onClick={handleClickLoginButton}>
                      Sign In
                    </button>
                  </span>
                </div>
              )}

              {loggedIn && (
                <>
                  <span
                    className={"icon-button"}
                    onClick={handleClickUserDropdownButton}
                  >
                    <Image src={UserIcon} />
                    <Image src={DropdownIcon} />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>


      <Menu
        sx={{
          mt: "45px",
        }}
        className="profile-menu"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={userDropdownMenuOpen}
        onClose={() => setMenuAnchorEl(null)}
        disableScrollLock={false}
        PaperProps={{
          className: classes.userDropdownPaper,
        }}
      >
        <Box>
          {/* <MenuItem key={1}>
                        <Typography>Verify your account</Typography>
                      </MenuItem>
                      <MenuItem key={2}>
                        <Typography>{userData?.email}</Typography>
                      </MenuItem>*/}
          {userData?.accounttype === 'contractor' && (
            <>
              <MenuItem key={4} onClick={handleClickProfile}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image src={UserIcon} />
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem key={5} onClick={handleClickMyJobs}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FavoriteBorderSharpIcon />
                <Typography>My Jobs</Typography>
              </MenuItem>
              <MenuItem key={3} onClick={handleClickAccountSettings}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SettingsIcon />
                <Typography>Settings</Typography>
              </MenuItem>
            </>
          )}
          {userData?.accounttype === 'employer' && (
            <>
              <MenuItem key={4} onClick={handleClickProfile}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image src={UserIcon} />
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem key={3} onClick={handleClickAccountSettings}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SettingsIcon />
                <Typography>Company settings</Typography>
              </MenuItem>
            </>
          )}

          <Box sx={{ ml: "18px", mr: "18px" }}>
            <Button onClick={handleClickSignOut} btnType="border" width={"100%"} title="Sign out" />
          </Box>
        </Box>
      </Menu>

      <PublicDrawer
        open={publicDrawerOpen}
        onOpen={() => setPublicDrawerOpen(true)}
        onClose={() => setPublicDrawerOpen(false)}
      />
    </>
  );
};

export { Header };

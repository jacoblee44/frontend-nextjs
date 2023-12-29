import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import { useHeaderStyles } from "@/static/stylesheets";
import WorkIcon from '@mui/icons-material/Work';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DayrateWorkLogo from "@/static/images/logo_dayratework_dark_mode.png";
import { useAuthInfo } from "@/hooks/custom";
import { logout } from "@/redux/actions";
import { routePaths } from "@/config";
import { useRouter } from "next/router";

interface PublicDrawerProps {
  open: boolean,

  onClose(): void,

  onOpen(): void,

  direction?: "left" | "right" | "top" | "bottom",
}

const PublicDrawer: React.FC<PublicDrawerProps> = (props) => {
  const classes = useHeaderStyles();
  const router = useRouter();
  const { open, direction, onOpen, onClose } = props;
  const { loggedIn, userData } = useAuthInfo();

  const handleClickBrandLogo = async () => {
    onClose();
    await router.push(routePaths.root);
  };

  const gotoEmployerDashboard = async () => {
    onClose();
    await router.push(routePaths.employer.dashboard);
  };

  const handleClickSignOut = () => {
    logout();
  };

  const handleClickRegisterButton = async () => {
    onClose();
    await router.push(routePaths.contractor.signup);
  };

  const handleClickLoginButton = async () => {
    onClose();
    await router.push(routePaths.login);
  };

  const handleClickProfile = async () => {
    onClose();

    if (userData?.accounttype == 'employer') {
      await router.push(routePaths.employer.employerAccount);
    } else {
      await router.push(routePaths.employees.profile);
    }
  };

  const handleClickAccountSettings = async () => {
    onClose();
    await router.push(routePaths.accountSettings);
  };

  const handleClickMyJobs = async () => {
    onClose();
    await router.push(routePaths.employees.myJobs);
  };

  return (
    <>
      <SwipeableDrawer
        anchor={direction ?? "left"}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Box className={classes.publicDrawer}>
          <Box className={"logo-container"} onClick={handleClickBrandLogo}>
            <img src={DayrateWorkLogo.src} alt={"Dayratework"} />
          </Box>

          <Box className={"list-container"}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Find Contract Jobs" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={gotoEmployerDashboard}>
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employers/Post Job" />
                </ListItemButton>
              </ListItem>

              {!loggedIn && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickLoginButton}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign In" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickRegisterButton}>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}

              {loggedIn && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickProfile}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                  </ListItem>

                  {userData?.accounttype === 'contractor' && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickMyJobs}>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary="My Jobs" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickAccountSettings}>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary="Settings" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                  {userData?.accounttype === 'employer' && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickAccountSettings}>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary="Company Settings" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickSignOut}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export { PublicDrawer };

import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { AdminSidebar } from "./AdminSidebar";

interface AdminMobileDrawerProps {
  open: boolean,

  onOpen(): void,

  onClose(): void,
}

const AdminMobileDrawer: React.FC<AdminMobileDrawerProps> = (props) => {
  return (
    <>
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onOpen={props.onOpen}
        onClose={props.onClose}
        PaperProps={{
          style: {
            background: "#1B113F",
            color: "#ffffff"
          }
        }}
      >
        <Box sx={{
          width: 300,
        }}>
          <AdminSidebar
            open={true}
            onToggle={props?.onClose}
          />
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export { AdminMobileDrawer };

import { useProfileStyles } from "@/static/stylesheets/modal/profileStyles";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

interface ProfileProps {
  open: boolean;
  modalClose(): void;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const classes = useProfileStyles();
  return (
    <Dialog
      onClose={() => {
        props?.modalClose();
      }}
      open={props?.open}
    >
      <Box className={classes.root}>
        <Typography component="h2">Hello</Typography>
      </Box>
    </Dialog>
  );
};

export { Profile };

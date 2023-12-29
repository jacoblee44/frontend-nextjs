import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLeftIconBoxStyles } from "@/static/stylesheets/leftIconBoxStyles";

interface LeftIconBoxProps {
  title?: string;
  icon?: any;
  onClick(): void;
  type?: "normal" | "border";
}

const LeftIconBox: React.FC<LeftIconBoxProps> = (props) => {
  const classes = useLeftIconBoxStyles(props?.type);
  return (
    <Box className={classes.root} classes="">
      <Box className="box" onClick={props?.onClick}>
        <IconButton onClick={props?.onClick} aria-label="add" size="small">
          <AddIcon fontSize="inherit" />
        </IconButton>
        <Typography>{props?.title}</Typography>
      </Box>
    </Box>
  );
};

export { LeftIconBox };

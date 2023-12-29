import React from "react";
import { useDividerStyles } from "@/static/stylesheets";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

interface DividerProps {
  dividerText?: string | null;
  style?: React.CSSProperties;
}

const CustomDivider: React.FC<DividerProps> = (props) => {
  const classes = useDividerStyles();
  return (
    <Box className={classes.root}>
      {props?.dividerText ? (
        <Divider style={props?.style}>{props?.dividerText}</Divider>
      ) : (
        <Divider style={props?.style} />
      )}
    </Box>
  );
};

export { CustomDivider };

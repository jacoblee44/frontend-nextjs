import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRightIconBoxStyles } from "@/static/stylesheets/rightIconBoxStyles";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import Image from "next/image";

interface RightIconBoxProps {
  title?: string;
  icon?: any;
  onClick(): void;
}

const RightIconBox: React.FC<RightIconBoxProps> = (props) => {
  const classes = useRightIconBoxStyles();
  return (
    <Box className={classes.root}>
      <Box className="box">
        <Typography>{props?.title}</Typography>

        <Image src={deleteIcon} alt="" onClick={props?.onClick} />
      </Box>
    </Box>
  );
};

export { RightIconBox };

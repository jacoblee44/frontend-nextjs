import React from "react";
import { Box, Typography } from "@mui/material";
import publicIcon from "@/static/images/icons/public.png";
import privateIcon from "@/static/images/icons/private.png";
import Image from "next/image";
import { useVisibilityCardStyles } from "@/static/stylesheets";

interface ReviewCardProps {
  title?: string;
  value?: string;
  description?: string;
  visibility?: boolean;
  onClick?(isPublic:boolean): void; 
}

const VisibilityCard: React.FC<ReviewCardProps> = (props) => {
  const classes = useVisibilityCardStyles();
  return (
    <Box className={classes.root} onClick={() => { props?.onClick?.(props?.visibility ? true : false) }}>
      <Box className="card" style={{ border: ((props?.visibility && props?.value == "Yes") || (!props?.visibility && props?.value == "No")) ? "2px solid #6D5086" : "1px solid #000000" }}>
        {props?.visibility ? (
          <Image src={publicIcon} alt="Public" />
        ) : (
          <Image alt="" src={privateIcon} />
        )}

        <Box className="content">
          <Typography component="h2" style={{ color: ((props?.visibility && props?.value == "Yes") || (!props?.visibility && props?.value == "No")) ? "#6D5086" : "#000000" }}>{props?.title}</Typography>
          <Typography component="h4">{props?.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { VisibilityCard };

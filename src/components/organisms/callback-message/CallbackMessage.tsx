import { Button } from "@/components/atoms/button";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import confirmImg from "@/static/images/pictures/picture3.png";
import { useMessageBoxStyles } from "@/static/stylesheets";

interface CallbackMessageProps {
  title?: string | any;
  subTitle?: string | any;
  hideConfirmationButton?: boolean,
  confirmButtonText?: string;
  onClickConfirmButton?(): void,
}

const CallbackMessage: React.FC<CallbackMessageProps> = (props) => {
  const classes = useMessageBoxStyles();
  return (
    <Box className={classes.root}>
      <Box className="confirm-box">
        <Image src={confirmImg} alt="confirmation" />
        <Typography component="h2">{props?.title}</Typography>
        <Typography>{props?.subTitle}</Typography>
        <Box sx={{ width: 180, margin: "0 auto" }}>
          {!props?.hideConfirmationButton && (
            <Button
              title={props?.confirmButtonText}
              height="60px"
              onClick={props?.onClickConfirmButton}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { CallbackMessage };

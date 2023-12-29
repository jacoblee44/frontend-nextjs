import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSocialButtonStyles } from "@/static/stylesheets";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import google from "@/static/images/icons/sign in_google.png";
import twitter from "@/static/images/icons/sign in_twitter.png";
import facebook from "@/static/images/icons/sign in_facebook.png";

interface SocialButtonProps {
  variant: "round" | "default" | "none";
  title?: string;
  type: "facebook" | "twitter" | "google",
  onClick?(): void;
}

const SocialButton: React.FC<SocialButtonProps> = (props) => {
  const { type, variant } = props;
  const classes = useSocialButtonStyles(variant);

  const SocialIcon = type === "facebook" ?
    <Image src={facebook} alt={props?.title} /> :
    type === "google" ?
      <Image src={google} alt={props?.title} /> :
      type === "twitter" ?
        <Image src={twitter} alt={props?.title} /> :
        null;

  return (
    <Box className={classes.root}>
      {props?.variant === "round" ? (
        <IconButton
          size="small"
          onClick={props?.onClick}
        >
          {SocialIcon}
        </IconButton>
      ) : (
        <Box
          className="social-button"
          onClick={props?.onClick}
        >
          {SocialIcon}
          <Typography>{props?.title}</Typography>
        </Box>
      )}
    </Box>
  );
};

export { SocialButton };

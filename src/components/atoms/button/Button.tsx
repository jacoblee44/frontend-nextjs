import { useButtonStyles } from "@/static/stylesheets";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import classNames from "classnames";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface ButtonProps {
  title?: string | any;
  height?: string;
  width?: string;
  btnType?: string; //"default" | "border"

  onClick?(): void;

  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  className?: string;
  sx?: SxProps<Theme>,
}

const Button: React.FC<ButtonProps> = (props) => {
  const classes = useButtonStyles(props?.height, props?.width, props?.btnType);
  return (
    <Box
      className={classNames(props?.className, {
        [classes.root]: true,
      })}
      style={props?.containerStyle}
      sx={props?.sx}
    >
      <button
        style={props?.style}
        className={classNames({
          ["disabled"]: props?.disabled || props?.loading,
        })}
        onClick={
          !props?.loading && !props?.disabled ? props?.onClick : undefined
        }
      >
        {props?.title}

        {props?.loading && <CircularProgress size={17} className={"loader"} />}
      </button>
    </Box>
  );
};

export { Button };

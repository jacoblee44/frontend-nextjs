import * as React from "react";
import Box from "@mui/material/Box";
import { useInputStyles } from "@/static/stylesheets";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { ForwardedRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface TextInputProps {
  type?:
    | "text"
    | "password"
    | "number"
    | "file"
    | "date"
    | "email"
    | "checkbox"
    | "search"
    | "hidden";
  label?: string;

  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;

  onBlur?(e: React.ChangeEvent<HTMLInputElement>): void;

  value?: string | any;
  required?: boolean;
  height?: any;
  width?: any;
  infoText?: any | null;
  error?: boolean | null | string;
  hint?: string | null;
  placeholder?: string;
  centerMode?: boolean;
  maxLength?: number;
  ref?: any;
  labelClass?: string;
  inputClass?: string;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;

  onKeyDown?(e: React.KeyboardEvent): void;

  onKeyUp?(e: React.KeyboardEvent): void;

  onPaste?(e: React.ClipboardEvent<HTMLInputElement>): void;
}

// eslint-disable-next-line react/display-name
const TextInput: React.FC<TextInputProps> = React.forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const classes = useInputStyles({
      height: props?.height,
      width: props?.width,
    });
    const [show, setShow] = useState(false);
    return (
      <Box className={classes.root} style={props?.containerStyle}>
        <label className={props?.labelClass} style={props?.labelStyle}>
          {props?.label}{" "}
          {props?.required ? <span className={"required-sign"}>*</span> : ""}
        </label>
        {props?.infoText && (
          <Typography className="infoText">{props?.infoText}</Typography>
        )}
        <Box sx={{ position: "relative" }}>
          <input
            ref={ref}
            required={props?.required}
            type={show ? "text" : props?.type}
            value={props?.value}
            onChange={props?.onChange}
            className={classNames(props?.inputClass, {
              "input-field": true,
              "center-mode": props?.centerMode,
              error: props?.error,
            })}
            placeholder={props?.placeholder}
            maxLength={props?.maxLength}
            onKeyUp={props?.onKeyUp}
            onKeyDown={props?.onKeyDown}
            onPaste={props?.onPaste}
            onBlur={props?.onBlur}
            style={props?.inputStyle}
          />
          {props?.type && props?.type == "password" && (
            <span
              className="icon flex items-center px-4"
              style={{
                position: "absolute",
                right: "10px",
                bottom: "5px",
                color: "#5f5f5f",
                cursor: "pointer",
              }}
              onClick={() => setShow(!show)}
            >
              {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          )}
        </Box>
        {props?.hint && (
          <div
            className={classNames({
              hint: true,
              error: true,
            })}
          >
            {props?.hint}
          </div>
        )}
      </Box>
    );
  }
);

export { TextInput };

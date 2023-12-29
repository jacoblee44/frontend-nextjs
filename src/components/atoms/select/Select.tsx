import React from "react";
import Box from "@mui/material/Box";
import { useSelectStyles } from "@/static/stylesheets";
import classNames from "classnames";

interface SelectInputProps {
  label?: string;

  onChange(e: any): void;

  value?: string | any;
  required?: boolean;
  data?: any;
  className?: string,
  wrapperStyle?: React.CSSProperties,
  selectStyle?: React.CSSProperties,
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const classes = useSelectStyles();
  return (
    <Box className={classNames(classes.root, props?.className)}>
      <label>
        {props?.label} {props?.required ? <span style={{ color: "red" }}>*</span> : ""}
      </label>

      <Box className={"select-wrapper"} style={props?.wrapperStyle}>
        <select
          required={props?.required}
          value={props?.value}
          onChange={props?.onChange}
          style={props?.selectStyle}
        >
          <option value="">Select Option</option>
          {props?.data.map((item: any, index: number) => (
            <option key={index} value={item?.id}>
              {item?.value}
            </option>
          ))}
        </select>
      </Box>
    </Box>
  );
};

export { SelectInput };

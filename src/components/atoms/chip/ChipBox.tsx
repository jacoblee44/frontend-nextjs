import { Box } from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";
import { useChipStyles } from "@/static/stylesheets";
import classNames from "classnames";

interface ChipBoxProps {
  label?: string;
  link?: string;
  icon?: any;
  selected?: boolean;

  selectType?(value: any): void;

  height?: string;
  style?: any;
}

const ChipBox: React.FC<ChipBoxProps> = (props) => {
  const classes = useChipStyles(props?.selected, props?.height);
  return (
    <Box
      className={classNames(classes.root, {
        [classes.active]: props?.selected,
      })}
      onClick={() => {
        if (props?.selectType) {
          props?.selectType(props?.label);
        }
      }}
    >
      {props?.icon}
      {props?.label && (
        <span>{props?.label}</span>
      )}
    </Box>
  );
};

export { ChipBox };

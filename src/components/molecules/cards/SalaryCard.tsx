import { useSalaryCardStyles } from "@/static/stylesheets/cards";
import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SalaryCardProps {
  title?: string;
  price?: number | any;
}

const SalaryCard: React.FC<SalaryCardProps> = (props) => {
  const classes = useSalaryCardStyles();
  return (
    <Box className={classes.root}>
      <Box className="card">
        <Typography component="h2">{props?.title}</Typography>
        <Typography component="h5">
          Average Salary $ {props?.price} per year <ArrowForwardIosIcon />
        </Typography>
        <Box className="bottom-items">
          <Typography component="a">Job openings</Typography>
          <Typography component="a">Skills</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { SalaryCard };

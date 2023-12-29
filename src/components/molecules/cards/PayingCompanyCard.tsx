import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { usePayingCompanyCardStyles } from "@/static/stylesheets/cards";
import Image from "next/image";
import rating from "@/static/images/icons/rating.png";
import pic1 from "@/static/images/pictures/resume.png";

interface PayingCompanyCardProps {
  title?: string;
  image?: any;
  total_review?: number;
}
const PayingCompanyCard: React.FC<PayingCompanyCardProps> = (props) => {
  const classes = usePayingCompanyCardStyles();
  return (
    <Box className={classes.root}>
      <Box className="card">
        <Box className="top-box">
          <span className="image">
            <Image className="img" src={props?.image ?? pic1} alt="Hello" />
          </span>
          <Box>
            <Typography component="h2">{props?.title}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <Image width={18} src={rating} alt="Rating" />{" "}
                <Image width={18} src={rating} alt="Rating" />
                <Image width={18} src={rating} alt="Rating" />
                <Image width={18} src={rating} alt="Rating" />
                <Image width={18} src={rating} alt="Rating" />
              </Box>
              <Typography component="h5">
                {props?.total_review} reviews
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="bottom-items">
          <Typography>Salaries</Typography>
          <Typography>Q&A</Typography>
          <Typography>Open jobs</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PayingCompanyCard;

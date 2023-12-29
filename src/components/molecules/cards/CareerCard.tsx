import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useCareerCardStyles } from "@/static/stylesheets/cards/careerCard";
import GoogleImg from "@/static/images/pictures/google.jpg";

interface CareerCardProps {
  image?: any;
  title?: string;
  price?: number;
  growth?: string;
  open_job?: string;
}

const CareerCard: React.FC<CareerCardProps> = (props) => {
  const classes = useCareerCardStyles();
  return (
    <Box className={classes.root}>
      <Card className="card">
        <CardMedia
          component="img"
          alt="green iguana"
          height="210"
          image={
            props?.image ??
            "https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg"
          }
        />
        <CardContent className="content">
          <Typography gutterBottom component="h2">
            {props?.title}
          </Typography>
          <Typography component="h3">$ {props?.price} per year</Typography>
          <Box className="growth">
            <Typography component="h4">{props?.growth}</Typography>
          </Box>
          <Typography component="h5">{props?.open_job}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export { CareerCard };

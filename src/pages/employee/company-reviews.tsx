import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { useFindSalariesStyles } from "@/static/stylesheets/findSalariesStyles";
import { PublicLayout } from "@/components/layouts";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PayingCompanyCard from "@/components/molecules/cards/PayingCompanyCard";
import { CareerCard, SalaryCard } from "@/components/molecules/cards";
import Image from "next/image";
import rating from "@/static/images/icons/rate.png";
import { useCompanyReviewsStyles } from "@/static/stylesheets";
import likeIcon from "@/static/images/pictures/rate_us.png";

const CompanyReviews = () => {
  const classes = useCompanyReviewsStyles();
  return (
    <PublicLayout
      pageProps={{
        title: "Find salaries",
      }}
      globalAccess={true}
    >
      <Box className={classes.root}>
        <Box className="top-bar">
          <Typography component={"h2"}>Find a career you'll love</Typography>
          <Typography component={"h5"}>
            Get access to millions of company reviews
          </Typography>

          <Box className="search-box">
            <Box sx={{ width: "52%", borderRight: "1px solid #000000" }}>
              <Typography>Company name ot job title</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginLeft: 2,
              }}
            >
              <Typography>Where</Typography>
              <select>
                <option value={""}>United Kingdom</option>
                <option value={""}>United Kingdom</option>
                <option value={""}>United Kingdom</option>
                <option value={""}>United Kingdom</option>
              </select>
            </Box>
            <IconButton aria-label="delete">
              <SearchIcon />
            </IconButton>
          </Box>
          <Typography>Do you want to search for salaries?</Typography>
        </Box>

        <Box className={"paying-jobs"}>
          <Typography component={"h2"}>Popular companies</Typography>

          <Grid container spacing={3} mt={3}>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={32435} />
            </Grid>
          </Grid>
        </Box>
        <Box className={"banner"}>
          <Image src={likeIcon} alt={"Rate us"} />
          <Typography component={"h3"}>Rate your recent employer:</Typography>
          <Box>
            <Image src={rating} alt="Rating" />
            <Image src={rating} alt="Rating" />
            <Image src={rating} alt="Rating" />
            <Image src={rating} alt="Rating" />
            <Image src={rating} alt="Rating" />
          </Box>
        </Box>
        <Box className={"frequently-search"} mt={3}>
          <Grid container spacing={3}>
            <Grid item md={6} sm={6} xs={12}>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#292929",
                  fontFamily: "'Urbanist', serif",
                }}
              >
                Popular Companies for other job Titles
              </Typography>
              <Typography component={"ul"}>
                <Typography component={"li"}>Order Picker</Typography>
                <Typography component={"li"}>Owner Operator Driver</Typography>
                <Typography component={"li"}>Auditor</Typography>
                <Typography component={"li"}>Warehouse Worker</Typography>
                <Typography component={"li"}>Registered Nurse</Typography>
                <Typography component={"li"}>Sales Manager</Typography>
              </Typography>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#292929",
                  fontFamily: "'Urbanist', serif",
                }}
              >
                Popular Companies in other Locations
              </Typography>
              <Typography component={"ul"}>
                <Typography component={"li"}>Bethesda, MD</Typography>
                <Typography component={"li"}>North Dakota</Typography>
                <Typography component={"li"}>Springfield, MO</Typography>
                <Typography component={"li"}>Milwaukee, WI</Typography>
                <Typography component={"li"}>San Jose, CA</Typography>
                <Typography component={"li"}>San Diego, CA</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default CompanyReviews;

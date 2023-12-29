import React from 'react';
import { Box, Grid, IconButton } from '@mui/material'
import { useFindSalariesStyles } from "@/static/stylesheets/findSalariesStyles";
import { PublicLayout } from "@/components/layouts";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PayingCompanyCard from "@/components/molecules/cards/PayingCompanyCard";
import { CareerCard, SalaryCard } from "@/components/molecules/cards";
import Image from "next/image";
import rating from "@/static/images/icons/rate.png";


const FindSalaries = () => {
  const classes = useFindSalariesStyles()
  return (
    <PublicLayout pageProps={{
      title: "Find salaries"
    }} globalAccess={true}>
      <Box className={classes.root}>
          <Box className="top-bar">
            <Typography component={"h2"}>Find a career you'll love</Typography>
            <Typography >Explore which careers have the highest job satisfaction, best salaries, and more</Typography>
          </Box>
        <Box className="search-box">
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography>What</Typography>
            <input
              width={500}
              type={"search"}
              placeholder="Job title, skills, benefits, certifications, any keyword..."
              style={{ borderRight: "2px solid #6D5086" }}
            />
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography>Where</Typography>
            <select >
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
        <Box className={"paying-jobs"}>
          <Typography component={"h2"}>Browse top paying jobs by industry</Typography>
          <select>
            <option value={""}>Choose an industry</option>
            <option value={""}>Software</option>
            <option value={""}>Design</option>
            <option value={""}>UI/UX</option>
          </select>

          <Grid container spacing={3} mt={3}>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <SalaryCard title={"Warehouse Associate"} price={24421}  />
            </Grid>
          </Grid>
        </Box>
        <Box className={"career"}>
          <Typography component={"h2"}>Find your career</Typography>
          <Grid container spacing={3} mt={3}>
            <Grid item md={3} sm={4} xs={12}>
              <CareerCard title={"Registered Nurse"} growth={"19.0% job growth"} open_job={"523,912 job openings"} price={74218} />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <CareerCard title={"Registered Nurse"} growth={"08.0% job growth"} open_job={"23,912 job openings"} price={4218} />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <CareerCard title={"Registered Nurse"} growth={"08.0% job growth"} open_job={"23,912 job openings"} price={4218} />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <CareerCard title={"Registered Nurse"} growth={"08.0% job growth"} open_job={"23,912 job openings"} price={4218} />
            </Grid>
          </Grid>
        </Box>
        <Box className={"paying-jobs"}>
          <Typography component={"h2"}>Browse top paying companies by industry</Typography>
          <select>
            <option value={""}>Choose an industry</option>
            <option value={""}>Software</option>
            <option value={""}>Design</option>
            <option value={""}>UI/UX</option>
          </select>

          <Grid container spacing={3} mt={3}>
            <Grid item md={4} sm={4} xs={6}>
             <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <PayingCompanyCard title={"Englewood, CO"} total_review={23442} />
            </Grid>

          </Grid>
        </Box>
        <Box className={"banner"}>
          <Typography component={"h3"}>Was this page helpful?</Typography>
          <Box>
            <Image  src={rating} alt="Rating" />
            <Image  src={rating} alt="Rating" />
            <Image  src={rating} alt="Rating" />
            <Image  src={rating} alt="Rating" />
            <Image  src={rating} alt="Rating" />
          </Box>
        </Box>
        <Box className={"frequently-search"} mt={3}>
          <Typography component={"h2"}>Frequently searched careers</Typography>
          <Grid container spacing={3}>
            <Grid item md={3} sm={4} xs={6}>
              <Typography component={"ul"}>
                <Typography component={"li"}>Order Picker</Typography>
                <Typography component={"li"}>Owner Operator Driver</Typography>
                <Typography component={"li"}>Auditor</Typography>
                <Typography component={"li"}>Warehouse Worker</Typography>
                <Typography component={"li"}>Registered Nurse</Typography>
                <Typography component={"li"}>Sales Manager</Typography>
              </Typography>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <Typography component={"ul"}>
                <Typography component={"li"}>Order Picker</Typography>
                <Typography component={"li"}>Owner Operator Driver</Typography>
                <Typography component={"li"}>Auditor</Typography>
                <Typography component={"li"}>Warehouse Worker</Typography>
                <Typography component={"li"}>Registered Nurse</Typography>
                <Typography component={"li"}>Sales Manager</Typography>
              </Typography>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <Typography component={"ul"}>
                <Typography component={"li"}>Order Picker</Typography>
                <Typography component={"li"}>Owner Operator Driver</Typography>
                <Typography component={"li"}>Auditor</Typography>
                <Typography component={"li"}>Warehouse Worker</Typography>
                <Typography component={"li"}>Registered Nurse</Typography>
                <Typography component={"li"}>Sales Manager</Typography>
              </Typography>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <Typography component={"ul"}>
                <Typography component={"li"}>Order Picker</Typography>
                <Typography component={"li"}>Owner Operator Driver</Typography>
                <Typography component={"li"}>Auditor</Typography>
                <Typography component={"li"}>Warehouse Worker</Typography>
                <Typography component={"li"}>Registered Nurse</Typography>
                <Typography component={"li"}>Sales Manager</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default FindSalaries;

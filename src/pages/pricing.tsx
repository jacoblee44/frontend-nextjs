import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material'
import { PublicLayout } from "@/components/layouts";
import { usePricingStyles } from "@/static/stylesheets/pricingStyles";
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from "next/router";

const Pricing = () => {
  const classes = usePricingStyles();
  const router = useRouter();

  const handleClickSelectPricing = (packageType: "free" | "premium") => {
    router.push(`/payment`, {
      query: {
        package: packageType,
      },
    });
  };

  return (
   <PublicLayout pageProps={{title: "Pricing"}} globalAccess={true}>
     <Box className={classes.root}>
        <Box className={"top-box"}>
            <Typography component={"h2"}>Start Package</Typography>
            <Typography>DayRateWork dolor sit amet, consectetur adipsicing elit, sed dobeiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus facilisis.</Typography>
        </Box>
       <Box className={"price-box"}>
         <Grid container spacing={5}>
           <Grid item md={6} sm={6} xs={12}>
             <Box className={"box"}>
               <Box className={"top-bar"}>
                 <Typography component={"h2"}>Free</Typography>
                 <Typography>Find Contractors</Typography>
                 <Typography component={"h2"} mt={5}>$0</Typography>
               </Box>
               <Box className={"content"}>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
               </Box>
               <Button onClick={() => handleClickSelectPricing("free")}>Select</Button>
             </Box>
           </Grid>
           <Grid item md={6} sm={6} xs={12}>
             <Box className={"box"}>
               <Box className={"top-bar1"}>
                 <Typography component={"h2"}>Premium</Typography>
                 <Typography>Find & Hire Contractors</Typography>
                 <Typography component={"h2"}>$0.99</Typography>
                 <Typography>$0.99 per applicants</Typography>
               </Box>
               <Box className={"content"}>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
                 <Typography> <CheckIcon/> Lorem ipsum dolor sit amet</Typography>
               </Box>
               <Button onClick={() => handleClickSelectPricing("premium")}>Select</Button>
             </Box>
           </Grid>
         </Grid>



       </Box>
     </Box>
   </PublicLayout>
  );
};

export default Pricing;

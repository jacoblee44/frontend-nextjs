import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { useHelpsUsStyles } from "@/static/stylesheets/helpsStyles";
import { PublicLayout } from "@/components/layouts";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpsPage = () => {
  const classes = useHelpsUsStyles()
  return (
    <PublicLayout pageProps={{ title:"Helps" }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Typography component={"h2"}>We are here to help you</Typography>
        </Box>
        <Box className={"box"}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              defaultChecked={true}
            >
              <Typography component={"h2"}>How to use Dayratework ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content  here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use  Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography component={"h2"}>How to use Dayratework ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography component={"h2"}>How to use Dayratework ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Box>
    </PublicLayout>
  );
};

export default HelpsPage;
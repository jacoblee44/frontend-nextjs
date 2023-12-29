import React from "react";
import { Box } from "@mui/material";
import { useSubmittedJobStyles } from "@/static/stylesheets/apply-job";
import applicationIcon from "@/static/images/pictures/application.png";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@/components/atoms/button";

const handleClickJobreturnButton = async () => {
  window.location.href = "/";
};

const JobSubmittedCard = () => {
  const classes = useSubmittedJobStyles();
  return (
    <Box className={classes.root}>
      <Box className={"box"}>
        <Image src={applicationIcon} alt={"Application"} />
        <Typography component={"h2"}>
          Your application has been submitted successfully!
        </Typography>

        <Button
          title={"Return to job search"}
          btnType={"border"}
          width={"100%"}
          height={"60px"}
          onClick={handleClickJobreturnButton}
        />
      </Box>
    </Box>
  );
};

export { JobSubmittedCard };

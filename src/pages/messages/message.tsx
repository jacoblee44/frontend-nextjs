import React from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { PublicLayout } from "@/components/layouts";
import { useMessageStyles } from "@/static/stylesheets/messages";
import { CustomDivider } from "@/components/atoms/divider";
import { Button } from "@/components/atoms/button";
import Image from 'next/image';
import MessageIcon from "@/static/images/pictures/message.jpg";

const Message = () => {
  const classes = useMessageStyles()
  return (
    <PublicLayout pageProps={{ title: "Message" }} globalAccess={true}>
      <Box className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={4} sm={5} xs={12}>
            <Box className={"left-box"}>
              <Typography component={"h2"}>Messages</Typography>
              <CustomDivider style={{borderColor: '#c2c2c2', height: '2px', background: '#c2c2c2'}} />
            </Box>
          </Grid>
          <Grid item md={8} sm={7} xs={12}>
            <Box className={"right-box"}>
                <Box className={"message-box"}>
                  <Image src={MessageIcon} alt={"Message"} width={200} height={200} />
                  <Box>
                    <Typography component={"h2"}>Welcome to Messages</Typography>
                    <Typography>When an employer contacts you.<br/> you will see messages here.</Typography>
                    <Button title={"Find jobs"} width={"275px"} onClick={() => alert()} />
                    <Button title={"Upload your resume"} width={"275px"} onClick={() => alert()} btnType={"border"} />
                  </Box>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PublicLayout>
  );
};

export default Message;

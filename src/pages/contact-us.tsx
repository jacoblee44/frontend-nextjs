import React from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { useContactUsStyles } from "@/static/stylesheets/contactUsStyles";
import image1 from "@/static/images/pictures/picture1.png";
import Image from 'next/image';
import { PublicLayout } from "@/components/layouts";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";

const ContactUs = () => {
  const classes = useContactUsStyles()
  return (
    <PublicLayout pageProps={{
      title: "Contact us"
    }} globalAccess={true}>
      <Box className={classes.root}>
        <Grid container >
          <Grid item md={6} sm={6} xs={12}>
            <Box className={"left-side"}>
              <Image width={300} height={300} src={image1} alt={""} />
            </Box>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Box className={"box"}>
                <Typography component={"h2"}>Get in Touch</Typography>
              <Box className={"form"}>
                <TextInput label={"Full name"} onChange={() => console.log("")} type={"text"} />
                <TextInput label={"Email"} onChange={() => console.log("")} type={"email"} />
                <TextInput label={"Contact Number"} onChange={() => console.log("")} type={"text"} />
                <TextInput label={"Subject"} onChange={() => console.log("")} type={"text"} />
               <Box mt={2.5}>
                 <label style={{color: '#000000', fontSize: "24px", fontWeight: 600, paddingBottom: '10px'}}>Message</label>
                 <textarea
                   style={{
                     width: '100%',
                     height: 90,
                     background: 'transparent',
                     borderRadius: '10px',
                     outline: 'none',
                     padding: "10px",
                     resize: "none",
                     marginTop: "6px",
                     fontFamily: "Urbanist",
                     fontSize: "17px",
                     fontWeight: "500",
                   }}
                   onChange={() => console.log("hello")}
                 >

                </textarea>
                 <Button title={"Send Message"} width={"70%"} height={"60px"} />
               </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PublicLayout>
  );
};

export default ContactUs;

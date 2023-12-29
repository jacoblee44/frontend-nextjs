import React, { useEffect, useState, ChangeEvent } from "react";
import { useBillingHistoryStyles } from "@/static/stylesheets/billinghistoryStyles";
import { Box, Typography, Grid, FormControlLabel, Radio, Checkbox } from "@mui/material";
import { AdminLayout } from "@/components/layouts";
import { CustomDivider } from "@/components/atoms/divider";
import { Button } from "@/components/atoms/button";
import { useAuthInfo } from "@/hooks/custom";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import toast from "react-hot-toast";
import { apiClient, endpoints } from "@/api";
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const Payment = () => {
  const classes = useBillingHistoryStyles();  
  const router = useRouter();
  const [jobfeedData, setJobFeedData] = useState([]);
  
  const getjobfeedapi = async () => {
    /*apiClient.get({
      url: "https://webautomation.io/api/extractors/run/53888/",
    }).then((res) => {
      alert(JSON.stringify(res?.data));
    }).catch(() => {
    });*/
    //r=requests.get()
    const res = await axios.get('https://webautomation.io/api/sessions/245273/', {
      // Axios looks for the `auth` option, and, if it is set, formats a
      // basic auth header for you automatically.
      auth: {
        username: 'toby@gocontract.com',
        password: '8jqBM03$@6l0'
      }
    });    
    console.log(res)
    res.status; // 200
  }

  

  useEffect(() => {
    getjobfeedapi(); 
  }, []);


  return (
    <AdminLayout>
    <Box className={classes.root}>
      <Box className="box">
        <Box className="top-bar">
          <Typography component="h3">API</Typography>
        </Box>

        
      </Box>
    </Box>
    </AdminLayout>
  );
};

export default Payment;

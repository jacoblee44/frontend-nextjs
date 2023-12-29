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

const Payment = () => {
  const classes = useBillingHistoryStyles();  
  const router = useRouter();
  const { loggedIn, userData } = useAuthInfo();
  const userId = userData?._id;
  const [loaded, setLoaded] = useState(false);
  const [billingHistory, setBillingHistory] = useState([]);
  var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getBillingHistory = () => {
    apiClient.post({
      url: endpoints.private.getBillingHistory,
      data: {
        userid: userId,
      }
    }).then((res) => {
      setBillingHistory(res?.data?.billhistory);
      //alert(JSON.stringify(res?.data?.billhistory));
    }).catch(() => {
      setBillingHistory([]);
    });
  }

  const handleMakePayment = (billId:any) => {
    apiClient.post({
      url: endpoints.private.monthlyBillingPayment,
      data: {
        billingid: billId,
        userid: userId,
      }
    }).then((res) => {
      //alert(JSON.stringify(res?.data));
      if(typeof res?.data?.message !== "undefined"){
        toast.error(res?.data?.message);
      } else {
        toast.success("Payment completed successfully");
        getBillingHistory();
      }
    }).catch(() => {
    });
  }

  useEffect(() => {
    getBillingHistory(); 
  }, [userData]);

  useEffect(() => {
    if (!loggedIn) {
      router.replace(routePaths.login);
      return;
    } else if(userData?.accounttype !== 'employer') {
      router.replace(routePaths.root);
      return;
    }    
    setLoaded(true);
  }, [loggedIn]);
  return (
    <AdminLayout pageProps={{title: "Billing History"}}>
    {loaded && (
    <Box className={classes.root}>
      <Box className="box">
        <Box className="top-bar">
          <Typography component="h3">Billing History</Typography>
        </Box>

        {billingHistory && billingHistory.length > 0 && billingHistory.map((row: any) => (
        <Box className="item-box" key={row?._id}>
          <Box className="single-item">
            {/*<Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={() => console.log("Hello")}
                    name="jason"
                  />
                }
                label=""
              />
              </Box>*/}
            <Box className="title">
              <Typography component="h4">Billing For {months[row?.month]} {row?.year}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#000000" }}><strong>{row?.amount} <span style={{textTransform:"uppercase"}}>{row?.currencycode}</span></strong> ({row?.credits} Credits)</Typography>
            </Box>
            <Box className={(row?.status == 'paid') ? "paid-box" : "pending-box"}>
              <Typography component="h2">{row?.status}</Typography>
            </Box>
            <Box className="action">
              {row?.status == 'pending' && (
                <Button title="Pay Now" onClick={() => {handleMakePayment?.(row?._id)}} style={{marginTop: 0}} />
              )}
            </Box>
          </Box>
        </Box>
        ))}
      </Box>
    </Box>
    )}
    </AdminLayout>
  );
};

export default Payment;

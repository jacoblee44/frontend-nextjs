import React, { useEffect, useState, ChangeEvent } from "react";
import { usePaymentStyles } from "@/static/stylesheets/paymentStyles";
import { Box, Typography, Grid, FormControlLabel, Radio } from "@mui/material";
import { AdminLayout } from "@/components/layouts";
import payCard1 from "@/static/images/icons/card1.png";
import payCard2 from "@/static/images/icons/card2.png";
import payCard3 from "@/static/images/icons/card3.png";
import Image from "next/image";
import { CustomDivider } from "@/components/atoms/divider";
import { TextInput } from "@/components/atoms/textInput";
import { SelectInput } from "@/components/atoms/select";
import { AutoComplete } from "@/components/atoms/autocomplete";
import { Button } from "@/components/atoms/button";
import { useAppSelector, useInput } from "@/hooks";
import { useAuthInfo } from "@/hooks/custom";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import toast from "react-hot-toast";
import { apiClient, endpoints } from "@/api";

const month_list = [
  { id: 0, value: "MM" },
  { id: 1, value: "Jan" },
  { id: 2, value: "Feb" },
  { id: 3, value: "Mar" },
  { id: 4, value: "Apr" },
  { id: 5, value: "May" },
  { id: 6, value: "Jun" },
  { id: 7, value: "Jul" },
  { id: 8, value: "Aug" },
  { id: 9, value: "Sep" },
  { id: 10, value: "Oct" },
  { id: 11, value: "Nov" },
  { id: 12, value: "Dec" },
];

//const year_list = [];
const year_list = [
  { id: 0, value: "YYYY" },
];
let curyr =  new Date().getFullYear();
for(var ci=0; ci<=5; ci++){
  year_list.push({ id: (curyr+ci), value:""+(curyr+ci) });
}

const Payment = () => {
  const classes = usePaymentStyles();  
  const router = useRouter();
  const { loggedIn, userData } = useAuthInfo();
  const userId = userData?._id;
  const [loaded, setLoaded] = useState(false);
  const [hascard, setHascard] = useState(false);
  const [ccmonth, setCCMonth] = useState(0);
  const [ccyear, setCCYear] = useState(0);
  const [country, setCountry] = useState('US');
  const [cardlast4, setCardlast4] = useState('');
  const [cardexpY, setCardexpY] = useState('');
  const [cardexpM, setCardexpM] = useState('');
  const [cardbrand, setCardbrand] = useState('');
  const [cardtype, setCardtype] = useState('Type1');
  

  const { 
    value: firstName, error: firstnameError, bind: bindFirstname, reset: resetFirstname,
  } = useInput('', {validate(value) {
    if (value === "") { return "Please enter a first name!"; } return true;
  }});

  const { 
    value: lastName, error: lastnameError, bind: bindLastname, reset: resetLastname,
  } = useInput('', {validate(value) {
    if (value === "") { return "Please enter a last name!"; } return true;
  }});

  const { 
    value: creditCard, error: creditcardError, bind: bindCreditcard, reset: resetCreditcard,
  } = useInput('', {validate(value) {
    if (value === "") { return "Please enter a card no.!"; } return true;
  }});

  const { 
    value: secureCode, error: securecodeError, bind: bindSecurecode, reset: resetSecurecode,
  } = useInput('', {validate(value) {
    if (value === "") { return "Please enter a secure code!"; } return true;
  }}); 

  const { 
    value: postalCode, error: postalcodeError, bind: bindPostalcode, reset: resetPostalcode,
  } = useInput('', {validate(value) {
    if (value === "") { return "Please enter a postal code!"; } return true;
  }});  

  const regPaymentMethod = () => {
    var validdata = true;
    if(firstnameError.check()) validdata = false;
    if(lastnameError.check()) validdata = false;
    if(creditcardError.check()) validdata = false;
    if(securecodeError.check()) validdata = false;
    if(postalcodeError.check()) validdata = false;
    if(ccmonth == 0) validdata = false;
    if(ccyear == 0) validdata = false;

    if (!validdata) {
      toast.error("Please Input all required fields!");
      return false;
    }  

    let data: { [key: string]: any } = {};    
    data.userid = userId; 
    data.ccnumber = creditCard;
    data.expmonth = ccmonth;
    data.expyear = ccyear;
    data.cvc = secureCode;
    data.firstname = firstName;
    data.lastname = lastName;
    data.address_zip = postalCode;
    data.address_country = country;
    data.card_type = cardtype;
    //console.log(JSON.stringify(data));
    apiClient.post({
      url: endpoints.private.updateStripeCard,
      data,
    }).then((res) => {
      //alert(JSON.stringify(res));
      router.replace(routePaths.employer.dashboard);
    }).catch(() => {
    });    
  };

  const getPaymentMethod = () => {
    apiClient.post({
      url: endpoints.private.retrieveCardDetails,
      data: {
        userid: userId,
      }
    }).then((res) => {
      if(typeof res?.data?.carddetails !== "undefined"){
        setHascard(true);        
        setCardlast4(res?.data?.carddetails.last4);
        setCardexpY(res?.data?.carddetails.exp_year);
        setCardexpM(res?.data?.carddetails.exp_month);
        setCardbrand(res?.data?.carddetails.brand);
        //alert(JSON.stringify(res?.data));
      }
      setLoaded(true);
    }).catch((error) => {
    });
  }

  useEffect(() => {
    if (!loggedIn) {
      router.replace(routePaths.login);
      return;
    } else if(userData?.accounttype !== 'employer') {
      router.replace(routePaths.root);
      return;
    }
    getPaymentMethod();
  }, [loggedIn]);

  return (
    <AdminLayout pageProps={{title: "Payment"}}>
    {loaded && (
    <Box className={classes.root}>
      {(hascard) ? (
        <Box className="box">
          <Typography component="h2">Existing card details</Typography>
          <Typography component="h2">XXXX XXXX XXXX {cardlast4} ({cardbrand}) {cardexpM}/{cardexpY}</Typography>
          <Button
            title="Change"
            onClick={() => {setHascard(false)}}
            style={{marginTop: 0}}
          />
        </Box>
      ):(
      <Box className="box">
        <Typography component="h2">Select your payment method</Typography>
        <CustomDivider
          style={{ background: "#ebebeb", borderColor: "#ebebeb" }}
        />
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item md={5} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              value="Optional"
              control={<Radio />}
              label=""
              onClick={() => { setCardtype("Type1"); }} 
              checked={(cardtype === "Type1") ? true : false}
            />
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Image src={payCard1} alt="" />
              <Image src={payCard2} alt="" />
              <Image src={payCard3} alt="" />
            </Box>
          </Grid>
          <Grid item md={4} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              value="Optional"
              control={<Radio />}
              label=""
              onClick={() => { setCardtype("Type2"); }} 
              checked={(cardtype === "Type2") ? true : false}
            />
            <Image src={payCard3} alt="" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6} sm={6} xs={12}>
            <TextInput
              label="First name"
              required={true}
              {...bindFirstname}
              error={firstnameError.error}
              type="text"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextInput
              label="Last name"
              required={true}
              {...bindLastname}
              error={lastnameError.error}
              type="text"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextInput
              label="Credit or debit card number"
              required={true}
              {...bindCreditcard}
              error={creditcardError.error}
              type="text"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={7} sm={6} xs={12}>
                <Typography
                  sx={{
                    color: "#000000",
                    paddingTop: "20px !important",
                    fontWeight: "600 !important",
                  }}
                >
                  Expiration date <span style={{ color: "red" }}>*</span>
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: "-45px" }}>
                  <Grid item md={6} sm={6} xs={12}>
                    <SelectInput
                      value={ccmonth}
                      data={month_list}
                      onChange={(e: any) => setCCMonth(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <SelectInput
                      value={ccyear}
                      data={year_list}
                      onChange={(e: any) => setCCYear(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={5} sm={6} xs={12}>
                <TextInput
                  label="Security code"
                  required={true}
                  {...bindSecurecode}
                  error={securecodeError.error}
                  type="text"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Box sx={{ marginTop: "0px" }}>
              <AutoComplete label="Country" value={country} required={true} data={[]} onChange={(e) => { setCountry((typeof e.code !== "undefined") ? e.code : 'US'); }} />
            </Box>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={7} sm={6} xs={12}>
                <TextInput
                  label="Postal Code"
                  type="text"
                  {...bindPostalcode}
                  error={postalcodeError.error}
                  required={true}
                />
              </Grid>
              <Grid item md={5} sm={6} xs={12}>
                <TextInput
                  label="VAT"
                  type="text"
                  placeholder="Optional"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button title="Add" width="170px" height="52px" onClick={regPaymentMethod} />
        <Typography sx={{ color: "#000000", fontFamily: "normal" }}>
          You only pay when someone views your job.{" "}
          <a href="" style={{ color: "#6D5086" }}>
            Learn more
          </a>
        </Typography>
      </Box>
        
      )}
    </Box>
    )}
    </AdminLayout>
  );
};

export default Payment;

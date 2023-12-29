import React, { useEffect, useRef } from 'react';
import { useAppSelector, useInput } from "@/hooks";
import { Box, Typography } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import toast from "react-hot-toast";
import { checkOTP, clearOtpCheckResponse, storeAuthInfo } from "@/redux/actions";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { routePaths } from "@/config";

interface OtpFormProps {
  email: string,

  onClickLogin?(): void,
}

const OtpForm: React.FC<OtpFormProps> = (props) => {
  const digit1ref = useRef<any>(null);
  const digit2ref = useRef<any>(null);
  const digit3ref = useRef<any>(null);
  const digit4ref = useRef<any>(null);
  const digit5ref = useRef<any>(null);
  const digit6ref = useRef<any>(null);

  const otpCheckResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.OTP_CHECK];

  const otpDigitValidator = (value: any) => {
    if (value?.toString().trim() === "" || isNaN(Number(value)) || Number(value) < 0) {
      return "Invalid otp digit!";
    }

    return true;
  };

  const {
    value: otp1,
    error: otp1Error,
    bind: bindOtp1,
    setValue: setOtp1,
    reset: resetOtp1,
    setError: setOtp1Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const {
    value: otp2,
    error: otp2Error,
    bind: bindOtp2,
    setValue: setOtp2,
    reset: resetOtp2,
    setError: setOtp2Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const {
    value: otp3,
    error: otp3Error,
    bind: bindOtp3,
    setValue: setOtp3,
    reset: resetOtp3,
    setError: setOtp3Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const {
    value: otp4,
    error: otp4Error,
    bind: bindOtp4,
    setValue: setOtp4,
    reset: resetOtp4,
    setError: setOtp4Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const {
    value: otp5,
    error: otp5Error,
    bind: bindOtp5,
    setValue: setOtp5,
    reset: resetOtp5,
    setError: setOtp5Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const {
    value: otp6,
    error: otp6Error,
    bind: bindOtp6,
    setValue: setOtp6,
    reset: resetOtp6,
    setError: setOtp6Error,
  } =
    useInput('', {
      validate: otpDigitValidator,
    });

  const resetOtpFields = (error: boolean) => {
    resetOtp1();
    resetOtp2();
    resetOtp3();
    resetOtp4();
    resetOtp5();
    resetOtp6();

    if (error) {
      setTimeout(() => {
        setOtp1Error("Invalid Code!");
        setOtp2Error("Invalid Code!");
        setOtp3Error("Invalid Code!");
        setOtp4Error("Invalid Code!");
        setOtp5Error("Invalid Code!");
        setOtp6Error("Invalid Code!");
      }, 80);
    }
  };

  const handlePasteOTP = (value: any) => {
    if (value?.length > 0) {
      const digits = value?.split('');
      if (digits && digits?.length > 0 && digits?.length >= 6) {
        for (let i = 0; i < 6; i++) {
          const digit = digits[i];
          switch (i) {
            case 0 :
              setOtp1(digit);
              break;
            case 1 :
              setOtp2(digit);
              break;
            case 2 :
              setOtp3(digit);
              break;
            case 3 :
              setOtp4(digit);
              break;
            case 4 :
              setOtp5(digit);
              break;
            case 5 :
              setOtp6(digit);
              break;
          }
        }
      }
    }
  };

  const submitOtp = () => {
    otp1Error.check();
    otp2Error.check();
    otp3Error.check();
    otp4Error.check();
    otp5Error.check();
    otp6Error.check();
    if (
      otp1Error?.check() ||
      otp2Error?.check() ||
      otp3Error?.check() ||
      otp4Error?.check() ||
      otp5Error?.check() ||
      otp6Error?.check()
    ) {
      toast.error("Please enter the 6 digit otp code!");
      return;
    }

    checkOTP({
      email: props?.email,
      otpcode: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
    });
  };

  useEffect(() => {
    if (otp1?.toString()?.trim() !== "") {
      digit2ref?.current?.focus();
    }
  }, [otp1, digit2ref]);

  useEffect(() => {
    if (otp2?.toString()?.trim() !== "") {
      digit3ref?.current?.focus();
    }
  }, [otp2, digit3ref]);

  useEffect(() => {
    if (otp3?.toString()?.trim() !== "") {
      digit4ref?.current?.focus();
    }
  }, [otp3, digit4ref]);

  useEffect(() => {
    if (otp4?.toString()?.trim() !== "") {
      digit5ref?.current?.focus();
    }
  }, [otp4, digit5ref]);

  useEffect(() => {
    if (otp5?.toString()?.trim() !== "") {
      digit6ref?.current?.focus();
    }
  }, [otp5, digit6ref]); 
  
  useEffect(() => {
    if (otpCheckResponse && otpCheckResponse?.success) {
      const data = otpCheckResponse?.data;
      let loginredirect = routePaths?.root;
      if(data?.status && data?.token) {
        if(data?.user.accounttype === 'employer') {
          loginredirect = routePaths.employer.dashboard;
       } else {
          loginredirect = routePaths.root;
       }
        storeAuthInfo({
          token: data?.token,
          userData: data?.user,
          loggedIn: true,
          loginRedirectRef: loginredirect,
        });
      }
      toast.success("Logged in successfully!");
      clearOtpCheckResponse();
      return;
    }

    if (otpCheckResponse && otpCheckResponse?.error) {
      toast.error("Invalid Otp code!");
      resetOtpFields(true);
      clearOtpCheckResponse();
      return;
    }
  }, [otpCheckResponse]);

  return (
    <>
      <Box className="login-form">
        <Typography component="h3">Enter OTP</Typography>
        <Box sx={{
          display: 'flex',
          gap: '20px',
        }}>
          <TextInput
            ref={digit1ref}
            type="text"
            {...bindOtp1}
            error={otp1Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
          <TextInput
            ref={digit2ref}
            type="text"
            {...bindOtp2}
            error={otp2Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onKeyDown={(e) => {
              if (e?.keyCode === 8 && otp2?.toString() === "") {
                digit1ref?.current?.focus();
              }
            }}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
          <TextInput
            ref={digit3ref}
            type="text"
            {...bindOtp3}
            error={otp3Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onKeyDown={(e) => {
              if (e?.keyCode === 8 && otp3?.toString() === "") {
                digit2ref?.current?.focus();
              }
            }}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
          <TextInput
            ref={digit4ref}
            type="text"
            {...bindOtp4}
            error={otp4Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onKeyDown={(e) => {
              if (e?.keyCode === 8 && otp4?.toString() === "") {
                digit3ref?.current?.focus();
              }
            }}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
          <TextInput
            ref={digit5ref}
            type="text"
            {...bindOtp5}
            error={otp5Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onKeyDown={(e) => {
              if (e?.keyCode === 8 && otp5?.toString() === "") {
                digit4ref?.current?.focus();
              }
            }}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
          <TextInput
            ref={digit6ref}
            type="text"
            {...bindOtp6}
            error={otp6Error.error}
            placeholder={"X"}
            centerMode={true}
            maxLength={1}
            onKeyDown={(e) => {
              if (e?.keyCode === 8 && otp6?.toString() === "") {
                digit5ref?.current?.focus();
              }
            }}
            onPaste={(e) => {
              const value = e.clipboardData.getData('Text/plain');
              handlePasteOTP(value)
            }}
          />
        </Box>
        <Button
          title={"Verify"}
          loading={otpCheckResponse?.loading}
          onClick={submitOtp}
        />
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (props?.onClickLogin) {
              props?.onClickLogin();
            }
          }}>
          {`Login again`} <TrendingFlatIcon />
        </a>
      </Box>
    </>
  );
};

export { OtpForm };

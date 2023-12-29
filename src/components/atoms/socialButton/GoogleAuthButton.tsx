import React from 'react';
import { SocialButton } from "@/components/atoms/socialButton/SocialButton";
import { appConfig } from "@/config";
import { useGoogleLogin } from '@react-oauth/google';

interface GoogleAuthButtonProps {
  onSuccess?(response: {
    email?: string,
    sub?: string | number,
  }): void,

  onFailure?(error: any): void,

  variant: "round" | "default" | "none",
  title?: string,
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = (props) => {
  const fetchGoogleUserInfo = (accessToken?: string) => {
    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`)
      .then((res) => res?.json())
      .then((res) => {
        console.log("GOOGLE RESPONSE", res);
        if (props?.onSuccess) {
          props?.onSuccess({
            email: res?.email,
            sub: res?.sub,
          });
        }
      })
      .catch((error) => {
        if (props?.onFailure) {
          props?.onFailure(error);
        }
      });
  };

  const login = useGoogleLogin({
    onSuccess: credentialResponse => {
      fetchGoogleUserInfo(credentialResponse?.access_token);
    },
    onError: (errorResponse) => {
      if (props?.onFailure) {
        props?.onFailure(errorResponse);
      }
    },
    flow: undefined,
    scope: "profile"
  });
  return (
    <>
      <SocialButton
        variant={props?.variant}
        type={"google"}
        onClick={login}
        title={props?.title}
      />
    </>
  );
};

export { GoogleAuthButton };

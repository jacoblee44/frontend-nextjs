import React from 'react';
//import TwitterLogin from "react-twitter-login";
import TwitterLogin from "react-twitter-oauth";
import { appConfig } from "@/config";
import { SocialButton } from "@/components/atoms/socialButton/SocialButton";

interface TwitterAuthButtonProps {
  variant: "round" | "default" | "none",
  title?: string,
}

const TwitterAuthButton: React.FC<TwitterAuthButtonProps> = (props) => {
  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  return (
    <>
     {/*<TwitterLogin
        authCallback={authHandler}
        consumerKey={appConfig.socialLogins.twitter.apiKey}
        consumerSecret={appConfig.socialLogins.twitter.secretKey}
      />*/}

      <TwitterLogin
        authCallback={authHandler}
        consumerKey={appConfig.socialLogins.twitter.apiKey}
        consumerSecret={appConfig.socialLogins.twitter.secretKey}
        requestTokenUrl={"https://api.twitter.com/oauth/request_token"}
        accessTokenUrl={"https://api.twitter.com/oauth/access_token"}
    /> 
    </>
  );
};

export { TwitterAuthButton };

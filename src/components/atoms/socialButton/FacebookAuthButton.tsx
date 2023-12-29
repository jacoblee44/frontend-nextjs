import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { appConfig } from "@/config";
import { css } from "@emotion/css";
import facebookIcon from "@/static/images/icons/sign in_facebook.png";
import Image from "next/image";

interface FacebookAuthButtonProps {
  onClick?(): void,

  variant?: "default" | "round",

  onSuccess?(response: ReactFacebookLoginInfo): void,

  onFailure?: any,
}

const FacebookAuthButton: React.FC<FacebookAuthButtonProps> = (props) => {
  const { variant } = props;

  const getVariantValue = (defaultVariant: any, roundVariant: any) => {
    return variant === "default" ? defaultVariant : roundVariant;
  }

  const rootClass = css`
    position: relative;

    .default-icon {
      position: absolute !important;
      left: 25px !important;
      top: 22px !important;
      
      img {
        width: 20px !important;
      }
    }
  `;

  const buttonClassName = css`
    border: 1px solid #c7c7c7;
    border-radius: ${getVariantValue("10px", "100%")};
    height: ${getVariantValue("45px", "50px")};
    width: ${getVariantValue("100%", "50px")};
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    padding: ${getVariantValue("7px 30px", "0px")};
    position: relative;
    color: #3f3f3f !important;

    :hover {
      opacity: 0.6;
    }

    img {
      width: 16px !important;
    }
  `;

  return (
    <>
      <span className={rootClass}>
        <FacebookLogin
          cssClass={buttonClassName}
          containerStyle={{
            display: "flex",
          }}
          appId={appConfig.socialLogins.facebook.appId}
          autoLoad={false}
          fields="name,email,picture"
          onClick={props?.onClick}
          callback={(response) => {
            console.log("FB RESPONSE", response);
            if (response && "status" in response && response?.status) {
              if (props?.onFailure) {
                props?.onFailure();
              }
              return;
            }

            if (response && "userID" in response && response?.userID) {
              console.log(props?.onSuccess)
              if (props?.onSuccess) {
                props?.onSuccess(response);
              }
              return;
            }
          }}
          textButton={variant === "default" ? "Continue with Facebook" : ""}
          icon={
            getVariantValue(undefined, <Image src={facebookIcon} />)
          }
        />
        {getVariantValue(
          <span className={"default-icon"}>
            <Image src={facebookIcon} />
          </span>,
          null
        )}
      </span>
    </>
  );
};

export { FacebookAuthButton };

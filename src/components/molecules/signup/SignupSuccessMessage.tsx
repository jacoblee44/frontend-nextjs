import React from 'react';
import { CallbackMessage } from "@/components/organisms/callback-message";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface SignupSuccessMessageProps {
  verificationEmail?: string,
}

const SignupSuccessMessage: React.FC<SignupSuccessMessageProps> = (props) => {
  const router = useRouter();
  const handleClickConfirm = async () => {
    await router.push(routePaths?.login);
  };

  return (
    <>
      <CallbackMessage
        title={"Thank you for your registration!"}
        subTitle={`We have sent a confirmation email to ${props?.verificationEmail}. Please confirm your email address to activate your account.`}
        confirmButtonText={"Continue"}
        onClickConfirmButton={handleClickConfirm}
      />
    </>
  );
};

export { SignupSuccessMessage };

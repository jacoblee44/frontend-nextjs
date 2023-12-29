import React from 'react';
import { CallbackMessage } from "@/components/organisms/callback-message";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface PasswordResetSuccessMessageProps {

}

const PasswordResetSuccessMessage: React.FC<PasswordResetSuccessMessageProps> = () => {
  const router = useRouter();

  const handleClickConfirm = async () => {
    await router.push(routePaths?.login);
  };

  return (
    <>
      <CallbackMessage
        title={"Successful"}
        subTitle={`You have successfully changed your password!`}
        confirmButtonText={"Login"}
        onClickConfirmButton={handleClickConfirm}
      />
    </>
  );
};

export { PasswordResetSuccessMessage };

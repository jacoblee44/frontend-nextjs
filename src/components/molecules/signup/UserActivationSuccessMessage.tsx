import React from 'react';
import { CallbackMessage } from "@/components/organisms/callback-message";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface UserActivationSuccessMessageProps {

}

const UserActivationSuccessMessage: React.FC<UserActivationSuccessMessageProps> = () => {
  const router = useRouter();
  const handleClickConfirm = async () => {
    await router.push(routePaths?.login);
  };

  return (
    <>
      <CallbackMessage
        title={"Account Activated"}
        subTitle={`Your account has been successfully activated!`}
        confirmButtonText={"Login"}
        onClickConfirmButton={handleClickConfirm}
      />
    </>
  );
};

export { UserActivationSuccessMessage };

import React from 'react';
import { CallbackMessage } from "@/components/organisms/callback-message";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { AuthService } from "@/services/auth";
import { useAuthInfo } from "@/hooks/custom";
import { storeAuthInfo } from "@/redux/actions";


interface ChangeEmailSuccessMessageProps {

}

const ChangeEmailSuccessMessage: React.FC<ChangeEmailSuccessMessageProps> = () => {
  const router = useRouter();
  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;  
  const handleClickConfirm = async () => {
    
    new AuthService().getAuthUser(userid, (userData) => {
      storeAuthInfo({userData: userData});
    });
    await router.push(routePaths?.accountSettings);
  };

  return (
    <>
      <CallbackMessage
        title={"Account Email Updated"}
        subTitle={`Email has been successfully updated!`}
        confirmButtonText={"Back to Settings"}
        onClickConfirmButton={handleClickConfirm}
      />
    </>
  );
};

export { ChangeEmailSuccessMessage };

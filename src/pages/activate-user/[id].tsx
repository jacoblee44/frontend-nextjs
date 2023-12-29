import React, { useEffect, useState } from 'react';
import { appConfig } from "@/config";
import { apiClient, endpoints } from "@/api";
import Error from "next/error";
import { useRouter } from "next/router";
import { UserActivationSuccessMessage } from "@/components/molecules/signup";
import { PublicLayout } from "@/components/layouts";

interface ActivateUserProps {

}

const ActivateUser: React.FC<ActivateUserProps> = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const encData = router?.query?.id;

  const activateUser = () => {
    apiClient.post({
      url: endpoints.public.activateUser,
      data: {
        encdata: encData,
        url: appConfig.appBaseUrl,
      },
    }).then(() => {
      setSuccess(true);
    }).catch(() => {
      setError(true);
    });
  };

  useEffect(() => {
    if(encData) {
      activateUser();
    }
  }, [encData]);

  return (
    <>
      {error ? (
        <Error statusCode={401} />
      ) : (
        <>
          {success && (
            <PublicLayout pageProps={{
              title: "Account activated",
            }}>
              <UserActivationSuccessMessage />
            </PublicLayout>
          )}
        </>
      )}
    </>
  );
};

export default ActivateUser;

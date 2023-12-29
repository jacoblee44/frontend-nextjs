import React, { useEffect, useState } from 'react';
import { appConfig } from "@/config";
import { apiClient, endpoints } from "@/api";
import Error from "next/error";
import { useRouter } from "next/router";
import { ChangeEmailSuccessMessage } from "@/components/molecules/changeemail/ChangeEmailSuccessMessage";
import { AdminLayout } from "@/components/layouts";

interface ChangeEmailProps {

}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const encData = router?.query?.id;

  const changeEmail = () => {
    apiClient.post({
      url: endpoints.public.changeEmail,
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
      changeEmail();
    }
  }, [encData]);

  return (
    <>
      {error ? (
        <Error statusCode={401} />
      ) : (
        <>
          {success && (
            <AdminLayout pageProps={{
              title: "Change Email",
            }}>
              <ChangeEmailSuccessMessage />
            </AdminLayout>
          )}
        </>
      )}
    </>
  );
};

export default ChangeEmail;

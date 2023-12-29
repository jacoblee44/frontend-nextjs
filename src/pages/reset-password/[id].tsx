import { PublicLayout } from "@/components/layouts";
import React, { useState } from "react";
import { PasswordResetSuccessMessage, ResetPasswordForm } from "@/components/molecules/password-recovery";

const ResetPassword = () => {
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  return (
    <PublicLayout
      pageProps={{
        title: "Change Password",
      }}
      hideHeader={true}
    >
      {!resetSuccess ? (
        <ResetPasswordForm
          onSuccess={() => setResetSuccess(true)}
        />
      ) : (
        <PasswordResetSuccessMessage />
      )}
    </PublicLayout>
  );
};

export default ResetPassword;

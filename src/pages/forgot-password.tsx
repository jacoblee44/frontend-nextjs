import { PublicLayout } from "@/components/layouts";
import React, { useState } from "react";
import {
  ForgotPasswordForm,
  VerificationSentSuccessMessage
} from "@/components/molecules/password-recovery";

const ForgotPassword = () => {
  const [verificationLink, setVerificationLink] = useState<{
    sent?: boolean,
    email?: string,
  }>({
    sent: false,
    email: '',
  });

  return (
    <PublicLayout
      pageProps={{
        title: "Forgot Password",
      }}
      hideHeader={true}
    >
      {!verificationLink.sent ? (
        <ForgotPasswordForm
          onSuccess={(email) => setVerificationLink(() => ({
            sent: true,
            email,
          }))}
        />
      ) : (
        <VerificationSentSuccessMessage
          verificationEmail={verificationLink?.email}
        />
      )}
    </PublicLayout>
  );
};

export default ForgotPassword;

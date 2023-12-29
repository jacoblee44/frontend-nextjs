import React from 'react';
import { CallbackMessage } from "@/components/organisms/callback-message";

interface VerificationSentSuccessMessageProps {
  verificationEmail?: string,
}

const VerificationSentSuccessMessage: React.FC<VerificationSentSuccessMessageProps> = (props) => {
  return (
    <>
      <CallbackMessage
        title={"Verification Link Sent!"}
        subTitle={`We've sent a verification link to ${props?.verificationEmail}. Please click the link in your inbox and follow the instructions to reset your password.`}
        hideConfirmationButton={true}
      />
    </>
  );
};

export { VerificationSentSuccessMessage };

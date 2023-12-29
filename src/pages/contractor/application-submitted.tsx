import React from 'react';
import { PrivateLayout } from "@/components/layouts";
import { JobSubmittedCard } from "@/components/molecules/apply-job";

const ApplicationSubmitted = () => {
  return (
    <PrivateLayout pageProps={{title: "Application submitted"}} globalAccess={true}>
      <JobSubmittedCard/>
    </PrivateLayout>
  );
};

export default ApplicationSubmitted;

import React from 'react';
import { AdminLayout } from "@/components/layouts";
import { JobStepper } from "@/components/molecules/employer-job";
import { useAuthInfo } from "@/hooks/custom";




const CreateJob = () => {
  const { userData } = useAuthInfo();

if (userData?.accounttype == 'contractor') {  
  window.location.href = '/signup/employer';
}
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Job",
        }}
      >
        <JobStepper step={1} jobid={0} />
      </AdminLayout>
    </>
  );
};

export default CreateJob;

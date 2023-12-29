import React from 'react';
import { AdminLayout } from "@/components/layouts";
import { JobStepper } from "@/components/molecules/employer-job";
import { useRouter } from "next/router";

const EditJob = () => {
  
  const router = useRouter();
  const jobID = router?.query?.jid;
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Job",
        }}
      >
        <JobStepper step={2} jobid={jobID} />
        
      </AdminLayout>
    </>
  );
};

export default EditJob;

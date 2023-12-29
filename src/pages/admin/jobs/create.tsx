import React from 'react';
import { AdminLayout } from "@/components/layouts";
import { JobPostType } from "@/components/molecules/employer-job";

const CreateJob = () => {
  return (
    <>
      <AdminLayout pageProps={{
        title: "Create a job"
      }}>
        <JobPostType />
      </AdminLayout>
    </>
  );
};

export default CreateJob;

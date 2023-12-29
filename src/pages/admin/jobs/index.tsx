import { AdminLayout } from "@/components/layouts";
import { JobStepper } from "@/components/molecules/employer-job";

const JobPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Job",
        }}
      >
        <JobStepper />
      </AdminLayout>
    </>
  );
};

export default JobPage;

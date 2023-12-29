import { AdminLayout } from "@/components/layouts";
import { DescribeJobForm } from "@/components/molecules/employer-job";

const DescribeJobPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Describe job",
        }}
      >
        <DescribeJobForm />
      </AdminLayout>
    </>
  );
};

export default DescribeJobPage;

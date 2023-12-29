import { AdminLayout } from "@/components/layouts";
import {
  BasicInformation,
  EmployeeJobDetails,
} from "@/components/molecules/employer-job";

const DetailsPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Job details",
        }}
      >
        <EmployeeJobDetails />
      </AdminLayout>
    </>
  );
};

export default DetailsPage;

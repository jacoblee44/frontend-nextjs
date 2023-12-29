import { AdminLayout } from "@/components/layouts";
import {
  BasicInformation,
  CompensationForm,
  EmployeeJobDetails,
} from "@/components/molecules/employer-job";

const CompensationPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Compensation",
        }}
      >
        <CompensationForm />
      </AdminLayout>
    </>
  );
};

export default CompensationPage;

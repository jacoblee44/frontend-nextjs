import { AdminLayout } from "@/components/layouts";
import { BasicInformation } from "@/components/molecules/employer-job";

const BasicInformationPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Basic information",
        }}
      >
        <BasicInformation />
      </AdminLayout>
    </>
  );
};

export default BasicInformationPage;

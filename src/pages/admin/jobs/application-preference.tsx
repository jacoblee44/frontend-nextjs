import { AdminLayout } from "@/components/layouts";
import { SetApplicationPreferenceForm } from "@/components/molecules/employer-job";

const ApplicationPreferencePage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Set application preference",
        }}
      >
        <SetApplicationPreferenceForm />
      </AdminLayout>
    </>
  );
};

export default ApplicationPreferencePage;

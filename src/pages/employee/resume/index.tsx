import { PrivateLayout, PublicLayout } from "@/components/layouts";
import { ResumeStepper } from "@/components/molecules/resume";

const ResumePage = () => {
  return (
    <>
      <PrivateLayout
        pageProps={{
          title: "Resume",
        }}
      >
        <ResumeStepper />
      </PrivateLayout>
    </>
  );
};

export default ResumePage;

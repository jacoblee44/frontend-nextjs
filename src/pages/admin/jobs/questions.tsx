import { AdminLayout } from "@/components/layouts";
import { QuestionForm } from "@/components/molecules/employer-job";

const QuestionsPage = () => {
  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Questions",
        }}
      >
        <QuestionForm />
      </AdminLayout>
    </>
  );
};

export default QuestionsPage;

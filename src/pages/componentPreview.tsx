import { CareerCard } from "@/components/molecules/cards";
import PayingCompanyCard from "@/components/molecules/cards/PayingCompanyCard";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { PublicLayout } from "@/components/layouts";
import { JobSubmittedCard } from "@/components/molecules/apply-job";
import { JobPostConfirmation } from "@/components/molecules/employer-job";

const ComponentPreview = () => {
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  return (
    <PublicLayout pageProps={{
      title: "Component preview"
    }} globalAccess={true}>
      <JobPostConfirmation/>
    </PublicLayout>
  );
};

export default ComponentPreview;

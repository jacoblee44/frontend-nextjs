import { AdminLayout, PrivateLayout } from "@/components/layouts";
import React from "react";
import { DashboardElements } from "@/components/molecules/dashboard";

import { useAuthInfo } from "@/hooks/custom";



const Dashboard = () => {
  const { userData } = useAuthInfo();

if (userData?.accounttype == 'contractor') {  
  window.location.href = '/';
}

  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Dashboard",
        }}
      >
        <DashboardElements />
      </AdminLayout>
    </>
  );
};

export default Dashboard;

import React from 'react';
import { PrivateLayout } from "@/components/layouts/PrivateLayout";

const AdminDashboard = () => {
  return (
    <>
      <PrivateLayout pageProps={{
        title: "Admin Login",
      }}>
        Test Admin Dashboard Page
      </PrivateLayout>
    </>
  );
};

export default AdminDashboard;

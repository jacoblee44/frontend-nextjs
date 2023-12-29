import React from 'react';
import { Header } from "@/components/organisms/header";

interface AdminHeaderProps {
  onMenuToggle?(): void,
}

const AdminHeader: React.FC<AdminHeaderProps> = (props) => {
  return (
    <>
      <Header
        variant={"admin"}
        showMobileMenuIcon={true}
        onMobileMenuClick={props?.onMenuToggle}
      />
    </>
  );
};

export { AdminHeader };

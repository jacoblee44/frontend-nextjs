import React, { useState } from 'react';
import { AdminHeader } from "@/components/molecules/header";
import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { useAdminLayoutStyles } from "@/static/stylesheets/layouts";
import { PageLayoutProps } from "@/components/layouts/PageLayout";
import { AdminMobileDrawer, AdminSidebar } from "@/components/molecules/sidebar";
import classNames from "classnames";
import { Footer } from "@/components/organisms/footer";
import { useAuthInfo } from "@/hooks/custom";

interface AdminLayoutProps {
  pageProps: PageLayoutProps,
  children?: React.ReactNode,
}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const { userData } = useAuthInfo();
  const classes = useAdminLayoutStyles();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      <PrivateLayout pageProps={props?.pageProps}>
        <div className={classes.root}>
          
        {userData?.accounttype == 'employer' && (
          <div className={classNames({
            [classes.sidebarPanel]: true,
            [classes.sidebarPanelOpen]: sidebarOpen,
          })}>
            <AdminSidebar
              open={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
          )}
          <div className={classes.mainPanel}>
            <div className={classes.headerContainer}>
              <AdminHeader onMenuToggle={() => setMobileDrawerOpen(!mobileDrawerOpen)} />
            </div>
            <div className={classes.contentContainer}>
              {props?.children}
            </div>
          </div>
        </div>
        <Footer />
      </PrivateLayout>

      <AdminMobileDrawer
        open={mobileDrawerOpen}
        onOpen={() => setMobileDrawerOpen(true)}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </>
  );
};

export { AdminLayout };

import React, { useEffect, useState } from 'react';
import { PageLayout, PageLayoutProps } from "@/components/layouts/PageLayout";
import { useRouter } from "next/router";
import { Footer } from "@/components/organisms/footer";
import { resetAuthInfo, storeAuthInfo } from "@/redux/actions";
import { AuthService } from "@/services/auth";
import { PublicHeader } from "@/components/molecules/header";
import { useAuthInfo } from "@/hooks/custom";
import { getUserDashboard } from "@/utils";

interface PublicLayoutProps {
  pageProps: PageLayoutProps,
  children?: React.ReactNode,
  hideHeader?: boolean,
  globalAccess?: boolean,
}

const PublicLayout: React.FC<PublicLayoutProps> = (props) => {
  const { pageProps, children, hideHeader } = props;
  const router = useRouter();
  const { loggedIn, loginRedirectRef, userData: authUser } = useAuthInfo();

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (loggedIn && authUser && new AuthService().isLoggedIn() && !props?.globalAccess) {
      const dashboardUrl = getUserDashboard(authUser?.accounttype);

      router.replace(loginRedirectRef ?? dashboardUrl).then(() => {
        if (loginRedirectRef) {
          storeAuthInfo({
            loginRedirectRef: null,
          });
        }
      });
      
    }
    setReady(true)
  }, [loggedIn, loginRedirectRef, authUser]);

  useEffect(() => {
    if (!new AuthService().isLoggedIn()) {
      resetAuthInfo();
    }
  }, []);

  return (
    <>
      <PageLayout {...pageProps}>
        {ready && (
          <>
            {(props?.hideHeader) ? (``) : (<PublicHeader />)}              
            {children}
            {(props?.hideHeader) ? (``) : (<Footer />)}
          </>
        )}
      </PageLayout>
    </>
  );
};

export { PublicLayout };

import React, { useEffect, useState } from "react";
import { PageLayout, PageLayoutProps } from "@/components/layouts/PageLayout";
import { useAppSelector } from "@/hooks";
import { selectAuthState } from "@/redux/reducers/authSlice";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface PrivateLayoutProps {
  pageProps: PageLayoutProps;
  children?: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = (props) => {
  const { pageProps, children } = props;
  const router = useRouter();
  const { loggedIn } = useAppSelector(selectAuthState);

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!loggedIn) {
      router.replace(routePaths.login);
      return;
    }

    setReady(true);
  }, [loggedIn]);

  return (
    <>
      <PageLayout {...pageProps}>
        {ready && (
          <>
            {/* <PublicHeader /> */}
            {children}
          </>
        )}
      </PageLayout>
    </>
  );
};

export { PrivateLayout };

import React from 'react';
import Head from "next/head";

export interface PageLayoutProps {
  title?: string,
  children?: React.ReactNode,
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export  { PageLayout };

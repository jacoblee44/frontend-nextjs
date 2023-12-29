import React from 'react';
import NextDocument, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { renderStatic } from '@/shared/emotion-css/renderer';
import Script from "next/script";

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const styledComponentSheet = new StyledComponentSheets()
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              <App {...props} />
            ),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {styledComponentSheet.getStyleElement()}
            <style
              data-emotion={`css ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          </React.Fragment>,
        ],
      }
    } finally {
      styledComponentSheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/*<meta name="google-signin-client_id" content="1002532873122-ehp221hp6klmf6pe6682jdsm7jqhsab2.apps.googleusercontent.com" />*/}
          <script src="https://accounts.google.com/gsi/client" async defer></script>
          <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

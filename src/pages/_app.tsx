import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/static/css/global.css';
import { ReduxService } from "@/components/startup";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        height={3}
        color={"#6D5086"}
        showOnShallow={true}
        nonce={""}
        options={undefined}
        startPosition={undefined}
        stopDelayMs={undefined}
      />

      <Toaster
        position="top-right"
        reverseOrder={true}
      />

      <Provider store={store}>
        <ReduxService>
          <GoogleOAuthProvider clientId="197161667164-pv8lr8n4j5ms2od2fsln0e1kmfao0dav.apps.googleusercontent.com">
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </ReduxService>
      </Provider>
    </>
  );
}

export default MyApp;
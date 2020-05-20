import { Global, css } from "@emotion/core";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
    <Global
      styles={css`
        :root {
          --primary: #ff3868;
          --accelerate: cubic-bezier(0.9, 0.1, 1, 0.2);
          --decelerate: cubic-bezier(0.1, 0.9, 0.2, 1);
          --standard-ease: cubic-bezier(0.8, 0, 0.2, 1);

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-size: 16px;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }
      `}
    />
    <Component {...pageProps} />
  </>
);

export default App;

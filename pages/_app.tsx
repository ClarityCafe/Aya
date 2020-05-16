import { Global, css } from "@emotion/core";
import { AppProps } from "next/app";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Global
      styles={css`
        :root {
          --primary: #ff3868;
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

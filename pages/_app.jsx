import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/_makeStore";
import Footer from "../components/Footer";
import LoaderBar from "../components/LoaderBar";
import ConnectedMenuBar from "../components/MenuBarContainer";
import "./_appStyles.css";

/*
 * If in prod, initialize Sentry, our error logging tool.
 */
if (process.env.NODE_ENV === "production") {
  const Sentry = require("@sentry/node"); // eslint-disable-line

  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
const App = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592 (needed for Sentry).
  const modifiedPageProps = { ...pageProps, err };

  return (
    <Provider store={makeStore()}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=1"
        />
        <link rel="manifest" href="/site.webmanifest?v=1" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=1"
          color="#0062ff"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...modifiedPageProps} />
      <Footer />
      <LoaderBar />
      <ConnectedMenuBar />
    </Provider>
  );
};

export default App;

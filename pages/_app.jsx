import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/_makeStore";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Text from "../components/Text";
import "./_appStyles.css";

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
const App = ({ Component, pageProps }) => {
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
      {Component.isMDXComponent ? (
        <Section>
          <Text>
            <Component {...pageProps} />
          </Text>
        </Section>
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </Provider>
  );
};

export default App;

import React from "react";
import App from "next/app";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/Footer";
import LoaderBar, { loaderBarStyles } from "../components/LoaderBar";
import MenuBar from "../components/MenuBar";

const PositionedMenuBar = styled.div`
  position: fixed;
  width: 100%;
  z-index: 2;
`;

/**
 * These styles may be assumed to be included on all pages, so that font availability and rendering
 * is guaranteed to be consistent. Additionally, this constant is exported so that utilities outside
 * the main application, e.g. Storybook, can import and use these values as well.
 */
export const fontStyles = `
  @font-face {
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    src: url("/IBMPlexSans-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 700;
    src: url("/IBMPlexSans-Bold.woff") format("woff");
  }

  body {
    font-family: "IBM Plex Sans", sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

/**
 * The module `<PageTransition>` component needs these global classes to do its magic. This is
 * an external dependency (`next-page-transitions`) and as such, we do not have a way to circumvent
 * this requirement (unless we decide to adopt & modify the module).
 */
const pageTransitionStyles = `
  .page-transition-enter {
    opacity: 0;
  }

  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

/**
 * Styling defaults aiding consistency. May be overridden at the component level.
 */
const ApplicationStyles = createGlobalStyle`
  body {
    background-color: #f2f4f8;
    margin: 0;
  }

  ${fontStyles}

  ${pageTransitionStyles}

  ${loaderBarStyles}
`;

/*
 * If in prod, initialize Sentry, our error logging tool.
 *
 * We import it conditionally because other tools importing from this file might break otherwise.
 * For example, Storybook imports styles from this file but its Webpack config isn't prepared for
 * Sentry, which it'll try to initialise nevertheless.
 */
if (process.env.NODE_ENV === "production") {
  const Sentry = require("@sentry/node"); // eslint-disable-line

  Sentry.init({
    dsn: "https://fa43df39e992475094d25e8b0f56d014@sentry.io/1863682"
  });
}

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
export default class RecordRigApp extends App {
  render() {
    const {
      /** The "Component" component refers to whatever the currently active page component is. */
      Component,
      /**
       * Page-specific data, the fetches of which are defined along with the page
       * and executed from the root `RecordRigApp` component.
       */
      pageProps,
      /** Used to set a unique key on the page component based on the current route. */
      router
    } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592 (needed for Sentry)
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <>
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
        <PositionedMenuBar>
          <MenuBar />
        </PositionedMenuBar>
        <Component key={router.route} {...modifiedPageProps} />
        <Footer />
        {/*
         * LoaderBar manages its own lifecycle based on Next's Router and as such
         * is NOT passed along as a prop with `PageTransition`.
         */}
        <LoaderBar />
        <ApplicationStyles />
      </>
    );
  }
}

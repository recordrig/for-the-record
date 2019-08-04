import React from "react";
import App, { Container } from "next/app";
// Fetch is used in an example which can be commented out.
import fetch from 'isomorphic-unfetch'; // eslint-disable-line
import { createGlobalStyle } from "styled-components";
import { PageTransition } from "next-page-transitions";
import LoaderBar, { loaderBarStyles } from "../components/LoaderBar";
import TopMenu from "../components/TopMenu";

/**
 * Styling defaults aiding consistency. May be overridden at the component level.
 */
const RecordRigStyling = createGlobalStyle`
  @font-face {
    font-family: "IBM Plex Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Sans"), local("IBMPlexSans"), url("/static/fonts/IBMPlexSans-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "IBM Plex Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Sans Bold"), local("IBMPlexSans-Bold"), url("/static/fonts/IBMPlexSans-Bold.woff") format("woff");
  }
  
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, p, a, li {
    font-family: "IBM Plex Sans", sans-serif;
  }

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

  ${loaderBarStyles}
`;

/**
 * Get app-wide data.
 */
const getAppData = async () => {
  /**
   * Shows fetch use - replace with e.g. actual product data when available.
   * Currently an example stub.
   */
  // if (process.env.NODE_ENV === 'production') {
  //   const res = await fetch('https://api.github.com/repos/zeit/next.js');
  //   const json = await res.json();
  //   return { stars: json.stargazers_count };
  // }
  /** In development, do not fetch but use mock data instead. */
  const appData = require('../data/mockAppData'); // eslint-disable-line
  return appData;
};

/** Helper to determine runtime environment. */
const isServer = typeof window === "undefined";

/** Instantiate an empty client-side store (or not). */
const clientStore = isServer ? null : {};

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component. Pages can access and pass down `appData`.
 */
export default class RecordRigApp extends App {
  static async getInitialProps({ Component, ctx }) {
    /** Set appData from clientStore (exists if fetched previously) or execute the fetch(es) now. */
    const appData = clientStore ? clientStore.appData : await getAppData();

    let pageProps = {};

    /** If the page component has an `getInitialProps` method defined, we'll execute it. */
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { appData, pageProps };
  }

  constructor(props) {
    super(props);

    /** Fill clientStore with appData from initialProps (if it was instantiated). */
    if (clientStore && !clientStore.appData) {
      clientStore.appData = props.appData;
    }
  }

  render() {
    const {
      /**
       * App-wide data which is defined at the root and also fetched
       * from the root `RecordRigApp` component.
       */
      appData,
      /** The "Component" component refers to whatever the currently active page component is. */
      Component,
      /** Used to set a unique key on the page component based on the current route. */
      router,
      /**
       * Page-specific data, the fetches of which are defined along with the page
       * and executed from the root `RecordRigApp` component.
       */
      pageProps
    } = this.props;

    return (
      <Container>
        <TopMenu />
        <PageTransition
          classNames="page-transition"
          skipInitialTransition
          timeout={200}
        >
          <Component appData={appData} key={router.route} {...pageProps} />
        </PageTransition>
        {/**
         * LoaderBar manages its own lifecycle based on Next's Router and as such
         * is NOT passed along as a prop with `PageTransition`.
         */}
        <LoaderBar />
        <RecordRigStyling />
      </Container>
    );
  }
}

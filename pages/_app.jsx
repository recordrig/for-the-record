import React from "react";
import App, { Container } from "next/app";
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
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component. Pages can access and pass down `appData`.
 */
export default class RecordRigApp extends App {
  render() {
    const {
      /** The "Component" component refers to whatever the currently active page component is. */
      Component,
      /** Used to set a unique key on the page component based on the current route. */
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
          <Component {...pageProps} />
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

import React from "react";
import App from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import { PageTransition } from "next-page-transitions";
import LoaderBar, { loaderBarStyles } from "../components/LoaderBar";
import MenuBar from "../components/MenuBar";

const PositionedMenuBar = styled.div`
  position: fixed;
  width: 100%;
`;

/**
 * These styles may be assumed to be included on all pages, so that font availability and rendering
 * is guaranteed to be consistent. Additionally, this constant is exported so that utilities outside
 * the main application, e.g. Storybook, can import and use these values as well.
 */
export const fontStyles = `
  @font-face {
    font-family: "IBM Plex Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    src: url("/static/fonts/IBMPlexSans-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "IBM Plex Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    src: url("/static/fonts/IBMPlexSans-Bold.woff") format("woff");
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
  /* A margin reset on the body prevents us from defining an entire custom layout component
  to achieve this simple functionality. */
  body {
    margin: 0;
  }

  ${fontStyles}

  ${pageTransitionStyles}

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
      <>
        <PositionedMenuBar>
          <MenuBar />
        </PositionedMenuBar>
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
        <ApplicationStyles />
      </>
    );
  }
}

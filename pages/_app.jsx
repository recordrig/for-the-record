import React from "react";
import App from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from "redux-state-sync";
import rootReducer from "../store/_rootReducer";
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
    dsn: "https://fa43df39e992475094d25e8b0f56d014@sentry.io/1863682"
  });
}

/**
 * The app's state when the store has just been instantiated. It presets some key names.
 */
const initialStatePreset = {
  account: {
    customerId: null
  },
  shoppingBag: []
};

/**
 * Creates a an initial Redux store to aid SSR.
 *
 * NB: The server-side store does not intend to be used as a store on the server.
 * Rather, it's created in order aid SSR: the initiated server store is passed to
 * the client, prerendered. But only on the client-side will this store actually
 * function as a store.
 */
const makeInitialStore = (initialState = initialStatePreset) =>
  createStore(rootReducer, initialState);

/**
 * Creates the Redux store which we'll use to manage client-side global state.
 *
 * It'll be enhanced with devtools and mechanisms that'll keep browser tabs synced,
 * and will fetch some parts of the startup state from localStorage (e.g. the shopping bag).
 */
const makeClientStore = (initialState = initialStatePreset) => {
  const middlewares = [createStateSyncMiddleware({})];

  // TODO: Fetch shopping bag from localStorage for initial state.
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  initStateWithPrevTab(store);
  return store;
};

// Since the same code is executed on both the server and the client, we'll need to determine
// where we are in order to create the appropriate store.
const isClient = !(typeof window === "undefined");
const makeStore = isClient ? makeClientStore : makeInitialStore;

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
class RecordRigApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // We can dispatch from here too
    // ctx.store.dispatch({ type: "FOO", payload: "foo" });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

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
      router,
      /** Application's store made available through connecting with Redux. */
      store
    } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592 (needed for Sentry).
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <Provider store={store}>
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
        <Component key={router.route} {...modifiedPageProps} />
        <Footer />
        {/*
         * LoaderBar manages its own lifecycle based on Next's Router and as such
         * is NOT passed along as a prop with `PageTransition`.
         */}
        <LoaderBar />
        <ConnectedMenuBar />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(RecordRigApp);

import React from "react";
import { Provider } from "react-redux";
import makeStore from "../store/_makeStore";
import "./_appStyles.css";

const Noop = ({ children }) => children;

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
const App = ({ Component, pageProps }) => {
  const Layout = Component.Layout || Noop;

  return (
    <Provider store={makeStore()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;

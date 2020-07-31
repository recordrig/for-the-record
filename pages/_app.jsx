import React from "react";
import { Provider } from "react-redux";
import makeStore from "../store/_makeStore";
import "./_appStyles.css";
import BlogLayout from "../components/BlogLayout";
import SiteLayout from "../components/SiteLayout";

const getLayout = (pageProps) => {
  if (pageProps.layout === "Blog") return BlogLayout;
  if (pageProps.layout === "Site") return SiteLayout;
  return ({ children }) => children;
};

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
const App = ({ Component, pageProps }) => {
  const Layout = getLayout(pageProps);

  return (
    <Provider store={makeStore()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;

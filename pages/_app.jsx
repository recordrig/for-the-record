import React from "react";
import { Provider } from "react-redux";
import { MDXProvider } from "@mdx-js/react";
import makeStore from "../store/_makeStore";
import "./_appStyles.css";
import BlogLayout from "../components/BlogLayout";

// const Noop = ({ children }) => children;

const components = {
  wrapper: ({ ...props }) => {
    // this is the layout component
    return (
      <BlogLayout>
        <main>
          <p>Je moeder</p>
          <div {...props} />
        </main>
      </BlogLayout>
    );
  },
};

// const getLayout = (Component) => {
//   if (Component.Layout) return Component.Layout;
//   if (Component.isMDXComponent) {
//     // TODO: Check if it has metadata.layoutComponent & match to Layout
//     console.log("Component:", Component);
//     console.log("<Component />:", <Component />);
//     return (
//       <MDXProvider components={components}>
//         <Component />
//       </MDXProvider>
//     );
//   }
//   return Noop;
// };

/**
 * Overrides Next.js' default `App` component which is used for page initialization.
 * `Component` refers to the active page component.
 */
const App = ({ Component, pageProps }) => {
  // const Layout = getLayout(Component);

  return (
    <Provider store={makeStore()}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Provider>
  );
};

export default App;

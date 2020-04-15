import { configure } from "@storybook/react";

/*
 * This same file is used by both Jest's unit tests and Storybook. We only want to apply global
 * CSS in Storybook. (Jest will currently crash if we try to import global CSS without adding support
 * for it in our Webpack config - but we don't need the global styles in the Jest env anyway.)
 */
if (process.env.NODE_ENV !== "test") {
  require("../pages/_appStyles.css");
}

/**
* `require.context()` is a special feature supported by webpack's compiler that allows you to get
* all matching modules starting from some base directory. The intention is to tell webpack at
* compile time to transform that expression into a dynamic list of all the possible matching
* module requests that it can resolve, in turn adding them as build dependencies and allowing
* you to require them at runtime.
* 
* See [Explanation on Stackoverflow](https://stackoverflow.com/a/54066904) and/or
* [Webpack's documentation on the feature](https://webpack.js.org/guides/dependency-management/#require-context)
*/
const req = require.context("../components", true, /\.stories\.tsx$/);

/**
 * Import all `.stories` files dynamically.
 */
const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);

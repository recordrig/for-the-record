module.exports = {
  "presets": [
    "next/babel"
  ],
  "plugins": [
    [
      /*
       * Custom config (rather than Next.js default) is required to support universal styles with styled components.
       * See [Zeit's with-styled-components full example](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)
       */
      "styled-components",
      {
        "ssr": true
      },
    ],
    /*
     * Temporary patch, see file for details.
     */
    "./babel-plugin-nextjs-mdx-patch"
  ],
  "env": {
    "test": {
      /*
       * Tell Babel to use the polyfill plugin we need to integrate Jest with Storybook's
       * Storyshots. We need to polyfill Webpack's `require.context()` feature.
       * 
       * The plugin is only added to the test environment otherwise it could replace
       * Webpack's version of it.
       */
      "plugins": ["require-context-hook"]
    }
  }
};

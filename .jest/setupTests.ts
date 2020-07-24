import "jest";
import registerRequireContextHook from "babel-plugin-require-context-hook/register";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// In Storybook's config, all `.stories` files are imported dynamically using Webpack's
// `require.context()`. However, when running Jest which uses Storybook's Storyshots,
// this obviously does not work since we're not running with Webpack.
// To fix the issue, we'll opt to polyfill the functionality by means of a
// [Babel plugin](https://www.npmjs.com/package/babel-plugin-require-context-hook).
registerRequireContextHook();

import 'jest';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

/**
 * Storybook's `withInfo()` generates prop tables for our components based on a component's
 * defined properties and their associated comments. When running Storyshots however, using Jest,
 * Jest does not know how to compile the CSS-classnames for these tables which it runs into, as it
 * iterates through all defined `.stories`. 
 * 
 * To fix this issue, we mock `withInfo()` so that these tables are not generated when running
 * Storyshots, thus not leading to compile errors, either.
 *
 * See [issue on Stackoverflow](https://github.com/storybookjs/storybook/issues/1011).
 */
jest.mock('@storybook/addon-info', () => ({
  withInfo: () => storyFn => storyFn,
}));

/**
 * In Storybook's config, all `.stories` files are imported dynamically using Webpack's
 * `require.context()`. However, when running Jest which uses Storybook's Storyshots,
 * this obviously does not work since we're not running with Webpack.
 * 
 * To fix the issue, we'll opt to polyfill the functionality by means of a
 * [Babel plugin](https://www.npmjs.com/package/babel-plugin-require-context-hook).
 */
registerRequireContextHook();

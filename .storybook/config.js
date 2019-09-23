import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { fontStyles } from '../pages/_app';

/**
 * Styling defaults aiding consistency. May be overridden at the component level. Inherits `fontStyles`
 * from the main application so that they are always the exact same.
 */
const RecordRigFontStyles = createGlobalStyle`
  ${fontStyles}
`;

/**
 * Custom Storybook decorator which will wrap whatever the current story is with our global styles.
 */
const withRecordRigFontStyles = (story) => (
  <>
    {story()}
    <RecordRigFontStyles />
  </>
);

/**
 * Add the RecordRig globally required font styles to every story through Storybook's decorator
 * mechanism.
 */
addDecorator(withRecordRigFontStyles);

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
const req = require.context('../components', true, /\.stories\.tsx$/);

/**
 * Import all `.stories` files dynamically.
 */
const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);

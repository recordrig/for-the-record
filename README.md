# RecordRig

Site for RecordRig.

## Getting Started

You'll need a local installation of [Node + NPM](https://nodejs.org/en/).

Run locally:

```
npm run dev
```

Pushes to GitHub on any branch will trigger an auto-deploy to a unique URL (staging) through Now integration with GitHub.

Merge a branch into `master` to create a new release. This can only be done through a pull request in GitHub.

**TODO:** Any change to the `master` branch will auto-deploy to http://recordrig.com (production).

## Core Functionality

Built with [Next.js](https://github.com/zeit/next.js/), a React framework which makes SSR, along with some other things like code splitting, supported out of the box.

The `.pages/_app.js` file is our application's container, and takes care of anything global, like the importing/fetching of app-wide required data, shared style definitions, and inclusion of components which must be shared by all frontend pages.

Any file or folder under `./pages` will be rendered on its own route, with `./pages/_app.js` and `./pages/_document.js` as notable exceptions.

Server-side functionality and other automations may be put over at `./pages/api`.

Each individual file in the `./pages` folder will be served as a Lambda when using Now.

## Components

All React components are defined in the `./components` folder. Run Storybook to view component specifications and to develop/debug components in isolation:

```bash
npm run storybook
```

## Automated Tests

Use Jest, which will run all files bearing the name suffix "`.test`", including snapshots for Storybook stories (as defined in `./components/_storyshots.test.ts`):

```bash
npm run test
```

For end to end test, first make sure the application is running locally in dev mode, and then launch Cypress:

```bash
npm run e2e
```

Cypress will use an actual browser to visit the local running app instance and go through all defined tests in `./.cypress/integration`.

## Coding Standards

We use TypeScript as much as possible and use ESLint combined with Prettier to help us maintain a high standard of code quality and coherent coding style. For Prettier, an ESLint plugin is used, so that the Prettier may be run through ESLint itself. As such, there is no need for a separate step to run Prettier.

Run ESlint:

```bash
npm run lint
```

Auto-fix found issues:

```bash
npm run lint:fix
```

Configure your IDE of choice to use this project's version of ESLint for in-editor errors and warnings. Most editors have plugins available for both ESLint and Prettier.

## Styling

We use inline styles with help of the Styled Components package. Styling definitions should be co-located with components as they are intrinsically related.

One section of global styles in defined in `./pages/_app.js`. Global styles should be kept to a minimum, because we want component definitions to make complete sense on their own. Any global styles that do exist should also be included when running through Storybook. 

The main font is IBM Plex Sans. We include it as an NPM dependency to make sure not to lose it in the future, and to know which version is currently active, but don't import it from the package directly. Rather, we straight-up copy the files found in `node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff` (only the Bold and Regular types) into our `public` folder, so that we can use them with CSS's @font-face which is well-supported by web browsers.

As for units of measurement, [just use pixels](https://benfrain.com/just-use-pixels/). Rem + em is nice in theory, when you're still naive enough to think that it is possible to devise one grand, coherent styling and spacing system, until you find out such an interconnected codebase is horribly unmaintainable (because everything now depends on the rem instead of the px which, in essence, is just some arbitrary value several times larger than a px (OR depends on 1001 spacing variables which you have to look up & change/add to every time you _just_ want to change the distance between two elements/resize something) AND you have to get out a goddamn calculator every. single. time.) and find out that there are so many exceptions to your "coherent" sizing system (often due to HTML & CSS's [quirk](https://mor10.com/removing-white-space-image-elements-inline-elements-descenders/)s, but also often enough because things simply visually LOOK "un[balance](https://visualhierarchy.co/blog/balance-in-web-design-and-why-it-is-important/)d" due to all sorts of things nothing to do with inconsistent spacings and sizes, but instead with where the brightest colors are located in an image, for example, or how your custom font of choice HAPPENS to have extra-long [descenders](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align), and so on) that you are robbed of your innocence forever.

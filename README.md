# RecordRig

This is a monorepo which currently only contains the main product frontend site under `www`.

---

- [Quickstart](#quickstart)
- [Slowstart](#slowstart)
  - [Main Frontend](#main-frontend)
    - [Core Functionality](#core-functionality)
    - [Automated Tests](#automated-tests)
    - [Coding Standards](#coding-standards)
    - [Styling](#styling)

## Quickstart

```bash
cd www # Navigate to main frontend folder (will be published at site root)
npm install # Install dependencies
npm run dev # Dev mode with hot reloading and no need for internet connectivity
```

http://localhost:3000

## Slowstart

Core guiding principles when developing are: 

- If it can be done in a simple way, implement it in a simple way ([The Best Code is No Code At All](http://blog.codinghorror.com/the-best-code-is-no-code-at-all/)).
- Keep in mind the future human reader of the codebase; optimise for understandability.
- Performance is important to the extent that human users should experience our applications as "nice to use".

### Main Frontend

The main site under `www` is built with [Next.js](https://github.com/zeit/next.js/), a React framework which makes SSR, along with some other things like code splitting, supported out of the box.

Dependencies: 
- A locally installed version of Node, the version of which is defined in `./package.json`.
- NPM packages defined in `./package.json`.

Install NPM packages: 

```bash
npm install
```

#### Core Functionality

Any file or folder under `./pages` will be rendered on its own **route**, with `./pages/_app.js` and `./pages/_document.js` as notable exceptions.

The `_app.js` file is our application's container, and takes care of anything global, like the importing/fetching of app-wide required data, shared style definitions, and inclusion of components which must be shared by all pages. 

All **React components** are defined in the `./components` folder. Run Storybook to view component specifications and to develop/debug components in isolation:

```bash
npm run storybook
```

#### Automated Tests

For React component tests you may launch Jest, which will run all files bearing the name suffix "`.test`", including snapshots for Storybook stories (as defined in `./components/_storyshots.test.ts`):

```bash
npm run test
```

For end to end test, first make sure the application is running locally in dev mode, and then launch Cypress, which will use an actual browser to visit the local running app instance and go through all defined tests in `./.cypress/integration`:

```bash
npm run e2e
```

#### Coding Standards

We use TypeScript as much as possible and use ESLint combined with Prettier to help us maintain a high standard of code quality and coherent codoing style. For Prettier, an ESLint plugin is used, so that the Prettier may be run through ESLint itself. As such, there is no need for a separate step to run Prettier.

Run ESlint:

```bash
npm run lint
```

Auto-fix found issues:

```bash
npm run lint:fix
```

Configure your IDE of choice to use this project's version of ESLint for in-editor errors and warnings. Most editors have plugins available for both ESLint and Prettier.

#### Styling

We use inline styles with help of the Styled Components package. Styling definitions should be co-located with components as they are intrinsically related.

The main font is called IBM Plex Sans. We include it as an NPM dependency to make sure not to lose it in the future, and to know which version is currently active, but don't import it from the package directly. Rather, we straight-up copy the files found in `node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff` (only the Bold and Regular types) into our `static` folder, so that we can use them with CSS's @font-face which is well-supported by web browsers.

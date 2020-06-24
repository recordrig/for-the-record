# RecordRig

Website for RecordRig - dedicated gameplay streaming PC.

## Getting Started

You'll need a local installation of [Node + NPM](https://nodejs.org/en/).

If it's the first time you're running the application, first install dependencies:

```
npm install
```

Now you can run the development server:

```
npm run dev
```

## Development Guidelines

| ✅ &nbsp;Do                                                                                                                                                                                                                                                                                                                                          | ❌ &nbsp;Do not                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| - **Do** put code that's related in the same file<br /><br />  - **Do** write code that can be understood without relying on your personal knowledge of the context or memory<br /><br />  - **Do** create a separately testable utility ( ./utils ) for code that's used in many places and/or is Very Important (e.g. pricing calculations) | - **Do not** split up code into seperate files based on arbitrary "kinds of code" (e.g. seperating Styled Components from their parent React Components)<br /><br />  - **Do not** create needless folder hierarchies<br /><br />  - **Do not** create [needless abstractions or dependencies](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction) |

## Coding Standards

We use TypeScript as much as possible and use ESLint to help us maintain a high standard of code quality and coherent coding style.

Note that our coding "standards" are **always evolving** as some rules make more sense in some settings than others. Feel free to commit changes to the ESLint configuration alongside your code, however: when considering a change to the ESLint configuration, ask yourself if you are considering this change out of laziness ("I just want this to compile!!1") or whether you genuinely do not agree with the rule. In any case, include comments explaning the rationale of the change so that it can be understood and/or discussed.

It's recommended to configure your IDE or text editor to use this project's ESLint settings (`./eslintrc.js`) for in-editor warnings and "auto-fix" shortcuts (most editors have ESLint plugins available or support built-in).

Alternatively, you can run ESLint on the command line:

```
npm run lint
```

Auto-fix found issues (if possible):

```
npm run lint:fix
```

## Core Functionality

Built with [Next.js](https://github.com/vercel/next.js/), a React framework which makes SSR, along with some other things like code splitting, supported out of the box.

The `.pages/_app.js` file is our application's container, and takes care of anything global, like the instantiation of the Redux store, shared style definitions, and inclusion of components which must be shared by all frontend pages.

Any file or folder under `./pages` will be rendered on its own route, with `./pages/_app.js` and `./pages/_document.js` as notable exceptions.

Server-side functionality and other automations may be put over at `./pages/api`. Only use server-side functionality when you really need it, as it can be less performant (Static Rendering is much faster than Server Side Rendering) and costs more resources than just offloading things to the client. Server-side should be utilised for things the client can't be "trusted" with, e.g. for fetches to API's utilising secret API keys that should not be exposed to the client.

## Components

All React components are defined in the `./components` folder. Run Storybook to view component specifications and to develop/debug components in isolation:

```
npm run storybook
```

As a rule of thumb, keep your components "dumb", meaning they do not depend on external state (e.g. Redux) or globals (e.g. Stripe). This makes developing and testing them in isolation easier as it keeps them self-contained, and prevents us from having to descend into mocking/stubbing hell.

An additional benefit of keeping components self-contained is that these components will depend more on predictable props as a natural consequence, the Storybook stories of which can be seperately defined and automatically snapshotted with Jest, preventing much of the need of manual unit test writing. When a component's user interactions (changes of state) are important, it can be reasonably assumed that these would be tested as part of a Cypress **integration** test, and therefore writing a seperate **unit** test could be considered a testing duplicate and waste of effort (especially in early development stages, wherein we find ourselves at the time of writing).

## Store

We maintain the application's client side state with Redux in `./store`. We co-locate all related logic within the same file and/or folder.

Install the [Redux Devtools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to aid with debugging.

## Automated Tests

We use Jest for unit tests. It will run all files bearing the name suffix "`.jest`", including snapshots for Storybook stories (as defined in `./components/_storyshots.jest.ts`):

```
npm run jest
```

We only write unit tests for components and store logic, both of which can be adequately tested in isolation. Other code will be tested using integration tests.

For integration test, first make sure the application is running locally in dev mode, and then launch Cypress:

```
npm run cypress
```

Cypress will use an actual browser to visit the local running app instance and go through all defined tests in `./cypress/integration`.

## Styling

We use inline styles with help of the Styled Components package. Styling definitions should be co-located with components as they are intrinsically related.

Global, shared styles are defined in `./pages/_appStyles.css`. Global styles should be kept to a minimum, because we want component definitions to make complete sense on their own. Any global styles that do exist should also be included when running through Storybook. 

The main font is IBM Plex Sans. We include it as an NPM dependency to make sure not to lose it in the future, and to know which version is currently active, but don't import it from the package directly. Rather, we straight-up copy the files found in `node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff` (only the Bold and Regular types) into our `public` folder, so that we can use them with CSS's @font-face which is well-supported by web browsers.

As for units of measurement, [just use pixels](https://benfrain.com/just-use-pixels/). Rem + em is nice in theory, when you're still naive enough to think that it is possible to devise one grand, coherent styling and spacing system, until you realise that such an interconnected codebase is horribly unmaintainable (because everything now depends on the rem instead of the px which, in essence, is just some arbitrary value several times larger than a px (OR depends on 1001 spacing variables which you have to look up & change/add to every time you _just_ want to change the distance between two elements/resize something) AND you have to get out a calculator every. single. time.) and find out that there are so many exceptions to your "coherent" sizing system (often due to HTML & CSS's [quirk](https://mor10.com/removing-white-space-image-elements-inline-elements-descenders/)s, but also often enough because things simply visually LOOK "un[balance](https://visualhierarchy.co/blog/balance-in-web-design-and-why-it-is-important/)d" due to all sorts of things nothing to do with inconsistent spacings and sizes, but instead with where the brightest colors are located in an image, for example, or how your custom font of choice HAPPENS to have extra-long [descenders](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align), and so on) that you are robbed of your innocence forever.

## CI/CD Pipeline

A push to any branch will deploy a preview to a unique URL through Vercel integration with GitHub.

The creation of a pull request targeting `master` will trigger a Quality Assurance GitHub workflow (see `./.github/qa.yml`) via GitHub Actions which runs our automated tests.

Any change to the `master` branch will auto-deploy to http://recordrig.com.

## External API's

We integrate with various external services, such as Stripe. While not running in production, we tend not to use any external API's. This is so that we can develop on the go, and so that our integration tests (with Cypress) do not rely on external resources that we cannot control, making them less flaky.

To add offline support, just add an if-else clause like so:

```
if (process.env.NODE_ENV !== "production") {
  // Offline mode stuff
} else {
  // Fetch from API things
  // Utilise env vars
  // Etc
}
```

Note that `process.env.NODE_ENV` will be set to `production` in all these circumstances:

- When the app is running online in production on recordrig.com (auto-deployed from `master`)
- When the app us running online in preview mode on a unique URL (auto-deployed after you pushed any branch)
- When the app is running **locally** via `npm run build` and then `npm start` (that's an optimised production build)

While actively developing features which rely on external API's, such as Stripe's, it might be useful to opt-out of this "offline mode" and connect directly to the Stripe testing API's so that you can get feedback to your code changes quickly, as you are developing.

In those situations, omit the `process.env.NODE_ENV !== "production"` check where you'd normally run your offline mode code, and add the required API keys to a file in the root of the project named `.env.local`. In the case of Stripe, the file would look something like:

```
# Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_12345
STRIPE_SECRET_KEY=sk_12345
```

You'd access these variables like so:

```
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // "pk_12345"
console.log(process.env.STRIPE_SECRET_KEY); // "sk_12345"
```

The `.env.local` file should never be committed as they are unique to your environment _and_ might contain environment variables that should never be made public (like Stripe's secret key), even if these are only used to connect to testing API's. Environment variables used online in production and in previews are managed elsewhere.


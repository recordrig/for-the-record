# RecordRig

![Quality Assurance](https://github.com/recordrig/recordrig-site/workflows/Quality%20Assurance/badge.svg?branch=master)&nbsp;(`master`)
&nbsp;|&nbsp;
![Quality Assurance](https://github.com/recordrig/recordrig-site/workflows/Quality%20Assurance/badge.svg?branch=develop)&nbsp;(`develop`)

Website for RecordRig - dedicated gameplay streaming PC.

Familiarise yourself with the entirety of this README before starting development.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Coding Standards](#coding-standards)
- [Core Functionality](#core-functionality)
- [React Components](#react-components)
- [Redux Store](#redux-store)
- [Automated Tests](#automated-tests)
  - [Unit tests](#unit-tests)
  - [Integration tests](#integration-tests)
  - [Visual tests](#visual-tests)
- [Styling](#styling)
  - [Global style definitions](#global-style-definitions)
  - [Look & feel & resources](#look--feel--resources)
  - [Images](#images)
  - [Units of measurement](#units-of-measurement)
- [Advanced Setup](#advanced-setup)
- [Development Workflow](#development-workflow)
  - [1. Local development](#1-local-development)
  - [2. Local testing](#2-local-testing)
  - [3. Submitting a pull request](#3-submitting-a-pull-request)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Details](#environment-details)
- [Dependencies](#dependencies)
- [Legal](#legal)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

Clone this repository to your local machine and navigate to its folder. We assume you can [connect to GitHub using SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

```shell
git clone git@github.com:recordrig/recordrig-site.git
cd recordrig-site
```

To run the app locally, you'll need a local installation of [Node](https://nodejs.org/en/). We recommend you use [Node Version Manager](https://github.com/nvm-sh/nvm) so that you can easily switch Node + NPM versions to support future versions of this app, as well as develop for other apps which might require other verions on your machine. Check `./package.json` for this application's supported Node + NPM versions.

If it's the first time you're running the application, start by installing dependencies (this might take some minutes):

```shell
npm install
```

You can verify that everything works by starting the development server:

```shell
npm run dev

# ready - started server on http://localhost:3000
```

## Development Guidelines

| ✅ &nbsp;Do                                                                                                                                                                                                                                                                                                                                          | ❌ &nbsp;Do not                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| - **Do** put code that's related in the same file<br /><br />  - **Do** write code that can be understood without relying on your personal knowledge of the context or memory<br /><br />  - **Do** create a separately testable utility (`./utils`) for code that's used in many places and/or is Very Important (e.g. pricing calculations) | - **Do not** split up code into seperate files based on arbitrary "kinds of code" (e.g. seperating Styled Components from their parent React Components)<br /><br />  - **Do not** create needless folder hierarchies<br /><br />  - **Do not** create [needless abstractions or dependencies](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction) |

## Coding Standards

We use TypeScript as much as possible and use ESLint to help us maintain a high standard of code quality and coherent coding style.

Note that our coding "standards" are **always evolving** as some rules make more sense in some settings than others. Feel free to commit changes to the ESLint configuration alongside your code, however, make sure to include comments explaining the rationale of the change so that it can be understood and/or discussed.

It's recommended to configure your IDE or text editor to use this project's ESLint settings (`./eslintrc.js`) for in-editor warnings and "auto-fix" shortcuts (most editors have ESLint plugins available or support built-in):

- [VSCode ESLint Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Alternatively, you can run ESLint on the command line using `npm run lint`, and fix found issues (if possible) with `npm run lint:fix`.

## Core Functionality

Built with [Next.js](https://github.com/vercel/next.js/), a React framework which makes SSR, along with some other things like code splitting, supported out of the box.

The `./pages/_app.js` file is our application's container, and takes care of anything global, like the instantiation of the Redux store, shared style definitions, and inclusion of components which must be shared by all frontend pages.

This app container will also have access to page props defined by `getInitialProps()` and `getStaticProps()`. We can use `getStaticProps()` to define which layout to use:

```
export function getStaticProps() {
  return {
    props: {
      layout: "Blog",
    },
  };
}
```

## Pages

Any file or folder under `./pages` will be rendered on its own route, with `./pages/_app.js` and `./pages/_document.js` as notable exceptions.

## API Routes

Server-side functionality and other automations may be put over at `./pages/api`.

Only write server-side code when it's really required, as it can be less performant (pre-building the complete site with Static Site Generation will result in a much faster client experience than performing Server Side Rendering on page requests) and costs more resources than just offloading things to the client.

Server-side should be utilised for things the client simply cannot do or be "trusted" with, e.g. for fetches to API's utilising secret API keys that should not be exposed to the client.

## React Components

All React components are defined in the `./components` folder. Run Storybook to view component specifications and to develop/debug components in isolation:

```shell
npm run storybook
```

As a rule of thumb, keep your components "dumb", meaning they do not depend on external state (e.g. Redux) or globals (e.g. Stripe). This makes developing and testing them in isolation easier as it keeps them self-contained, and prevents us from having to descend into mocking/stubbing hell.

An additional benefit of keeping components self-contained is that these components will depend more on predictable props as a natural consequence, the Storybook stories of which can be seperately defined and automatically snapshotted with Jest, preventing much of the need of manual unit test writing.

When a component's user interactions (changes of state) are important, it can be reasonably assumed that these would be tested as part of a Cypress **integration** test, and therefore we consider writing a seperate **unit** test a testing duplicate and waste of effort.

## Redux Store

We maintain the application's client side state with Redux in `./store`. We co-locate all related logic within the same file and/or folder.

Install the [Redux Devtools](https://github.com/zalmoxisus/redux-devtools-extension) for Chrome or Firefox to aid with debugging.

## Automated Tests

### Unit tests

We use Jest for unit tests. It will run all files bearing the name suffix "`.jest`", including snapshots for Storybook stories (as defined in `./components/_storyshots.jest.ts`):

```shell
npm run jest
```

We only write unit tests for components and store logic, both of which can be adequately tested in isolation. Other code will be tested using integration tests.

### Integration tests

For integration test, first make sure the application is running locally in dev mode, and then launch Cypress:

```shell
npm run cypress:open
```

Cypress will use an actual browser to visit the local running app instance and go through all defined tests in `./cypress/integration`.

NOTE that Cypress seems to have a bug in which, whenever its browser window is out of focus, tests fail. You can safely ignore these types of failures. Re-focus the window and re-test to verify the failure was invalid.

Alternatively, you can run Cypress on the command line:

```shell
npm run cypress
```

### Visual tests

We integrate with [Percy](https://percy.io/0117db51/recordrig-site) for visual regression testing. Percy commands will only run in the CI environment and will be ignored locally.

## Styling

We use inline styles with help of the Styled Components package. Styling definitions should be co-located with components as they are intrinsically related.

### Global style definitions

Global, shared styles are defined in `./pages/_appStyles.css`. Global styles should be kept to a minimum, because we want component definitions to make complete sense on their own.

Any global styles that do exist should also be included when running through Storybook - this can be achieved by a simple import of needed `.css` files inside `./.storybook/config.js`. Storybook's Webpack will pick up any imported files.

### Look & feel & resources

Though we do not follow any strict design system, our current look & feel _is_ inspired by IBM's [Carbon Design System](https://www.carbondesignsystem.com/):

- [Colors](https://www.ibm.com/design/language/color/) (use "cool" varieties for greys)
- [Icons](https://www.ibm.com/design/language/iconography/ui-icons/library) (adopt SVG's inside `./components/Icon.svg`)

The main font is IBM Plex Sans. We include it as an NPM dependency to make sure not to lose it in the future, and to know which version is currently active, but don't import it from the package directly. Rather, we straight-up copy the files found in `node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff` (only the Bold and Regular types) into our `public` folder, so that we can use them with CSS's @font-face which is well-supported by web browsers.

### Images

When replacing images with new versions, make sure to use a `?v=1` suffix where it's linked to prevent image caching issues. By supplying a unique suffix, we can be certain browsers will load the new image instead of an outdated one from a cache.

Be careful about removing images from the repository. Even if they are not linked from within this repository, they might still be used by external sources. For example, the product image located in `./public/recordrig.png` is also used in the emails we send out for order confirmations. Removing it would break these images. When in doubt, leave the image present (they're not hurting anyone by sticking around in our repo sometime longer). 

When creating new images, make sure that they are large enough in terms of width and height for screens with a high pixel density, optimised for web, and compressed to a reasonable margin to save unnecessary bandwidth. Protip: [ImageOptim](https://imageoptim.com/).

### Units of measurement

[Just use pixels](https://benfrain.com/just-use-pixels/). Rem + em is nice in theory, when you're still naive enough to think that it is possible to devise one grand, coherent styling and spacing system, until you realise that such an interconnected codebase is horribly unmaintainable (because everything now depends on the rem instead of the px which, in essence, is just some arbitrary value several times larger than a px (OR depends on 1001 spacing variables which you have to look up & change/add to every time you _just_ want to change the distance between two elements/resize something) AND you have to get out a calculator every. single. time.) and find out that there are so many exceptions to your "coherent" sizing system (often due to HTML & CSS's [quirk](https://mor10.com/removing-white-space-image-elements-inline-elements-descenders/)s, but also often enough because things simply visually LOOK "un[balance](https://visualhierarchy.co/blog/balance-in-web-design-and-why-it-is-important/)d" due to all sorts of things nothing to do with inconsistent spacings and sizes, but instead with where the brightest colors are located in an image, for example, or how your custom font of choice HAPPENS to have extra-long [descenders](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align), and so on) that you are robbed of your innocence forever.

## Advanced Setup

If you'd like to use all application features locally, including things like Check Out, you'll need to add a `.env.local` file in the root of this project and fill it with all required information. If you're a registered repository collaborator, you can get a prefilled `.env.local` file and shared Test API keys from the repository maintainer.

If you are not a registered repository collaborator, you'll need to manually set up the `.env.local` file using the instructions for [Advanced Setup](./docs/advanced-setup.md).

While working on features which relate to our webhooks, you might want to use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward Stripe events to your locally running application:

```shell
stripe listen --forward-to localhost:3000/api/hooks/stripe
```

This command will also generate a `STRIPE_WEBHOOK_SECRET` which you should add to `.env.local`. Now, Stripe will forward all events to this locally running webhook handler instead of the webhook URL defined in the Stripe dashboard.

## Development Workflow

The stable branch is `master`. We never modify this branch directly.

The default branch is `develop`. This branch contains the most recent version of the app. You should always branch off from this branch when you start developing a new feature or fix.

### 1. Local development

Verify that you are on the `develop` branch:

```shell
git status

# On branch develop
# Your branch is up to date with 'origin/develop'.
```

When developing a feature of your own, create a new branch:

```shell
git checkout -b my-new-branch

# Switched to a new branch 'my-new-branch'
```

On this new branch, you can make all required changes.

### 2. Local testing

While developing your feature, it's recommended to continuously run automated tests to prevent [regression bugs](https://en.wikipedia.org/wiki/Software_regression).

Run unit tests and watch for changes:

```shell
npm run jest:watch
```

In a seperate window, run integration tests and watch for file changes (the app must be running locally):

```shell
npm run cypress:open
```

NOTE that Cypress seems to have a bug in which, whenever its browser window is out of focus, tests fail. You can safely ignore these types of failures. Re-focus the window and re-test to verify the failure was invalid.

If you've configured your IDE with ESLint, you should be warned of Linter issues on an ongoing basis and be able to fix them as they occur. You could do one more complete, final run to outrule Linter issues locally before pushing to remote:

```shell
npm run lint
```

### 3. Submitting a pull request

Once you are done developing this feature or fix, commit your changes:

```shell
git add .
git commit -m "My new changes"

# [my-new-branch abcd123] My new changes
# x files changed, x insertions(+), x deletions(-)
```

Do not merge branches manually - changes should first be reviewed online. Push to remote (GitHub):

```shell
git push
```

If this is the first time you're trying to push this branch, git will complain that it does not know where to push to:

```shell
# fatal: The current branch my-new-branch has no upstream branch.
# To push the current branch and set the remote as upstream, use

#     git push --set-upstream origin my-new-branch
```

Copy-paste this command to push to a new remote branch which will bear the same name as you local branch ("my-new-branch"):

```shell
git push --set-upstream origin my-new-branch

# (...)
# remote: Create a pull request for 'my-new-branch' on GitHub by visiting:
# remote:      https://github.com/recordrig/recordrig-site/pull/new/my-new-branch
# (...)
# 
# To github.com:recordrig/recordrig-site.git
#  * [new branch]      my-new-branch -> my-new-branch
# Branch 'my-new-branch' set up to track remote branch 'my-new-branch' from 'origin'.
```

If you consider your changes to be ready for review, visit the supplied link to create a pull request targeting the `develop` branch in GitHub.

Of course, if more changes are needed, you can always add more commits to your branch and re-push the modifications to remote (GitHub).

## Blogging Workflow

Our blog (For The Record) is added as a `git subtree`. This is so that the blog posts themselves can sit in a public repository, benefiting from community contributions, while our core repository remains private.

Blog posts can be updated right here from the core repository, as any other file. To publish changes from this core repository to the subtree, use:

```
git subtree push --prefix pages/blog/ git@github.com:recordrig/for-the-record.git master
```

If there have been changes in the [For The Record repository](https://github.com/recordrig/for-the-record), and you'd like to pull in those changes, use:

```
git subtree pull --prefix pages/blog/ https://github.com/recordrig/for-the-record.git master
```

You might get this error when both repos have modifications, and pulling in the subtree doesn't fix it like it normally would:

```
 ! [rejected]        abcabcabcabc -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:recordrig/for-the-record.git'
hint: Updates were rejected because a pushed branch tip is behind its remote
hint: counterpart. Check out this branch and integrate the remote changes
hint: (e.g. 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

We can fix this by force pushing the subtree. However, **make sure that indeed all remote changes have been incorporated to your local repository, first**, or they will be lost.

```
TODO
```

### Translations

We consider English as the default, which is why any `index` page will be English. Additionally, any extra content should appear in at least English. The addition of other languages is supplementary.

It's fine if menu's and other "interfaces" remain English, while the main article appears in a different language. We assume our visitor has at least a basic understanding of English.

Though Google Translate can be used as a starting point for adding content in other languages, the purpose should be to get content translated by a native speaker. This is also why the posts reside in a public repository.

In order to get the most out of automated as well as human translations, follow [these translation guidelines by Google](https://developers.google.com/style/translation).

Always use the [ISO_639-1](https://en.wikipedia.org/wiki/ISO_639-1) two-letter code when defining languages.

## CI/CD Pipeline

A push to any branch will deploy a Unique Preview to a unique URL through Vercel integration with GitHub.

You can find a list of all active Unique Previews in [GitHub's Deployment overview](https://github.com/recordrig/recordrig-site/deployments/activity_log?environment=Preview).

The creation of a pull request targeting `develop` or `master` will trigger a Quality Assurance GitHub workflow (see `./.github/workflows/qa.yml`) via GitHub Actions which runs our automated checks & tests.

Note that visual diffing with Percy does NOT throw errors in the CI logs and will NOT prevent a branch from being merged. Visual changes can be reviewed by a human in [Percy's dashboard](https://percy.io/0117db51/recordrig-site). Comment in the open pull request on GitHub and link/upload screenshots from Percy to collaborate on visual issues.

Any change to the `master` branch will auto-deploy to Production.

## Environment Details

| Environment    | Description / Notes                        | URL / Domain                                                                                                             | Env Variables                          | Branch                                          |
|----------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|----------------------------------------|-------------------------------------------------|
| Local          | The app running locally, on your machine   | http://localhost:3000                                                                                                    | Your local project's root `.env.local` | Any you check out locally using `git checkout ` |
| Unique Preview | A unique version of the app running online | Generated. Check [Deployments](https://github.com/recordrig/recordrig-site/deployments/activity_log?environment=Preview) | Vercel PREVIEW variables               | Any that was pushed to remote (GitHub)          |
| Shared Preview | A merged release candidate.                | https://recordrig-site.now.sh                                                                                            | Vercel PREVIEW variables               | `develop`                                       |
| Production     | A stable release.                          | https://recordrig.com                                                                                                    | Vercel PRODUCTION variables            | `master`                                        |

## Dependencies

All dependencies are auto-updated though [Dependabot](https://docs.github.com/en/github/administering-a-repository/keeping-your-dependencies-updated-automatically) integration with GitHub. Dependabot will open a pull request anytime a dependency can be updated.

If QA checks do not pass, check out Dependabot's branch (e.g. `dependabot/npm_and_yarn/develop/prettier-2.0.5`) locally:

```
git fetch
git checkout dependabot/npm_and_yarn/develop/prettier-2.0.5
```

Don't forget to also re-install all dependencies to make sure you've got the same versions locally:

```
npm install
```

Now you can fix issues locally, run automated tests, and `git push` to remote when done. The pull request will update, and re-run QA checks.

## Legal

Copyright © 2020 RecordRig. All rights reserved.

RecordRig is a trade name by DC Development, registered with the Netherlands Chamber of Commerce. KvK&nbsp;ID:&nbsp;67196802. Tax&nbsp;ID:&nbsp;NL002217700B75.

All materials contained in this repository are protected by copyright laws and may not be reproduced, distributed, transmitted, displayed, published or broadcast without the prior written permission of RecordRig. No part of the materials available through the contents of this code repository or its associated domain names and sites may be copied, photocopied, reproduced, translated or reduced to any electronic medium or machine-readable form, in whole or in part, without prior written consent of RecordRig. Any other reproduction in any form without the permission of RecordRig is strictly prohibited. 

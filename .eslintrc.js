module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:functional/no-mutations"
  ],
  "overrides": [
    /*
     * Allow jest-specific variabled in test files.
     */
    {
      "files": ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      "env": {
        "jest": true
      }
    },
    {
      /*
       * For TypeScript files, we want to be strict. We turned these rules off further
       * down, but that's intended just for JavaScript files, for which we want to be
       * more lax as we've usually adopted these from other codebases (and as such, we
       * consider them maintained by others).
       */
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "functional/immutable-data": "warn",
        "functional/no-let": "error",
        "react/jsx-props-no-spreading": ["error"],
        "@typescript-eslint/explicit-function-return-type": ["error"]
      }
    },
    /*
     * Allow non-camelcase in files that communicate with external API's (and have to
     * abide by their rules).
     */
    {
      "files": ["./pages/api/**/*.ts"],
      "rules": {
        "@typescript-eslint/camelcase": "off"
      }
    },
    /*
     * Do not require the explicit definition of return types in these folders where we often
     * integrate with 3rd party interfaces/API's.
     */
    {
      "files": ["./components/**/*.tsx", "./pages/**/*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    },
    /*
     * Be more lax in config files which are not transpiled.
     */
    {
      "files": ["**.config.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "functional/immutable-data": "off"
      }
    },
    /*
     * Allow triple slashes `///` in this file which is generated and maintained automatically by Next.js.
     * We want to keep the original structure intact as a [Triple-Slash Directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) is a compiler directive used by TypeScript.
     */
    {
      "files": ["next-env.d.ts"],
      "rules": {
        "spaced-comment": "off",
      }
    },
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "project": "./tsconfig.json"
    },
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "react",
    "functional"
  ],
  "rules": {
    /*
     * Turn off until we have better alternatives. (Set to "warn" and "error" in TS/TSX files.)
     */
    "functional/immutable-data": "off",
    "functional/no-let": "off",
    /*
     * Airbnb's config assumes `js` and `jsx` files to be supported natively, but doesn't
     * know about `ts` and `tsx` files on its own. We want to allow e.g. `import "./myModule"`
     * without having to suffix with `ts`.
     */
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    /*
     * Allow imports from packages listed under `devDependencies` for dev and test files.
     */
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.stories.tsx",
          "**/*.test.ts",
        ]
      }
    ],
    /*
     * Custom rule to support Next.js' present-day Link API.
     * See [related issue on GitHub](https://github.com/zeit/next.js/issues/5533).
     */
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": [
          "Link"
        ],
        "specialLink": [
          "hrefLeft",
          "hrefRight"
        ],
        "aspects": [
          "invalidHref",
          "preferButton"
        ]
      }
    ],
    /*
     * ESLint should error when it finds issues related to the Prettier config which was extended.
     */
    "prettier/prettier": ["error"],
    /*
     * Turn off because it conflicts with Prettier.
     */
    "react/jsx-curly-newline": "off",
    /*
     * Airbnb's config doesn't account for any TypeScript configuration so we need to tell it
     * that it's ok if we encounter JSX in `.tsx` files.
     */
    "react/jsx-filename-extension": [
      1,
      { 
        "extensions": [".jsx", ".tsx"]
      }
    ],
    /*
     * We turn this off here so that we can use this in (usually adopted) JavaScript files, but turn
     * this back on for `.ts` and `.tsx` files further up, which are written and maintained by ourselves.
     */
    "react/jsx-props-no-spreading": "off",
    /*
     * Resolve a conflict between Prettier and Airbnb's configs by disabling errors on the lack of
     * parenthesis around multilines.
     */
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": false,
        "assignment": false
      }
    ],
    /*
     * This rule often collides with Prettier's rules so we'll turn it off. Prettier takes care of JSX
     * formatting adequately on its own.
     */
    "react/jsx-one-expression-per-line": "off",
    /*
     * We use TypeScript to declare a component's parameters ("props") and as such have no need for
     * React prop types.
     */
    "react/prop-types": "off",
    /*
     * Disable lint errors on functional React and Styled components that don't declare a return type.
     * These components shouldn't need to declare this; TypeScript can instead infer them.
     * Community agrees; will be removed from `typescript-eslint` in a future version. See [PR on GitHub](https://github.com/typescript-eslint/typescript-eslint/pull/260).
     * For now, we'll disable manually. Also see [discussion on GitHub](https://github.com/typescript-eslint/typescript-eslint/issues/149).
     */
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true, // Styled components
      "allowTypedFunctionExpressions": true // React components
    }],
    /*
     * Manage indentation with Prettier instead.
     */
    "@typescript-eslint/indent": "off",
    /*
     * Rule has [no right to exist](https://github.com/typescript-eslint/typescript-eslint/issues/433).
     * Will be removed from `typescript-eslint` in a future major version (since it's a breaking change). For now we'll disable manually.
     */ 
    "@typescript-eslint/prefer-interface": 0,
    /*
     * Disable in general, but we turn this back on for `.ts` and `.tsx` files in the "overrides"
     * section further up. We just want it disabled for `.js` and `.jsx` files as it doesn't _do_
     * type declarations and such.
     */
    "@typescript-eslint/explicit-function-return-type": "off",
     /*
     * Error instead of warn on unused vars in order to align with TS (TS will not compile if
     * there are unused vars).
     */
    "@typescript-eslint/no-unused-vars": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"] // Don't give errors for .ts and .tsx files.
      }
    }
  }
};

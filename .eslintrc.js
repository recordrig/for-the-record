/**
 * Import original airbnbStyleRules to override some rules set by other packages
 * e.g. `@typescript-eslint`'s indentation settings (4 spaces vs 2).
 */
const airbnbStyleRules = require('eslint-config-airbnb-base/rules/style').rules;

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    /**
     * Allow triple slashes `///` in this file which is generated and maintained automatically by Next.js.
     * We want to keep the original structure intact as a [Triple-Slash Directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) is a compiler directive used by TypeScript.
     */
    {
      "files": ["next-env.d.ts"],
      "rules": {
        "spaced-comment": "off",
      }
    },
    /**
     * Enable Jest-specific keywords (like `toEqual`, `test`) in files ending in `test.ts`.
     */
    {
      "files": ["**/*.test.ts"],
      "env": {
        "jest": true
      },
      "plugins": ["jest/recommended"]
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "react"
  ],
  "rules": {
    /**
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
    /**
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
    /**
     * ESLint should error when it finds issues related to the Prettier config which was extended.
     */
    "prettier/prettier": ["error"],
    /**
     * Airbnb's config doesn't account for any TypeScript configuration so we need to tell it
     * that it's ok if we encounter JSX in `.tsx` files.
     */
    "react/jsx-filename-extension": [
      1,
      { 
        "extensions": [".jsx", ".tsx"]
      }
    ],
    /**
     * Resolve a conflict between Prettier and Airbnb's configs by disabling errors on the lack of
     * parenthesis around multilines.
     */
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": false,
        "assignment": false
      }],
    /**
     * Disable lint errors on functional React and Styled components that don't declare a return type.
     * These components shouldn't need to declare this; TypeScript can instead infer them.
     * Community agrees; will be removed from `typescript-eslint` in a future version. See [PR on GitHub](https://github.com/typescript-eslint/typescript-eslint/pull/260).
     * For now, we'll disable manually. Also see [discussion on GitHub](https://github.com/typescript-eslint/typescript-eslint/issues/149).
     */
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true, // Styled components
      "allowTypedFunctionExpressions": true // React components
    }],
    /**
     * Keep original indent preferences (2-space basis and others) (opinionated) instead of
     * TypeScript's 4-space indentation.
     */
    "@typescript-eslint/indent": airbnbStyleRules.indent,
    /**
     * Rule has [no right to exist](https://github.com/typescript-eslint/typescript-eslint/issues/433).
     * Will be removed from `typescript-eslint` in a future major version (since it's a breaking change). For now we'll disable manually.
     */ 
    "@typescript-eslint/prefer-interface": 0
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"] // Don't give errors for .ts and .tsx files.
      }
    }
  }
};

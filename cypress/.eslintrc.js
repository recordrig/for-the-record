module.exports = {
  "extends": [
    "../.eslintrc.js",
    "plugin:cypress/recommended"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules":
  /*
    * Allow jest-specific variabled in Jest's test files.
    */
  {
    "import/no-extraneous-dependencies":
    [
      "error",
      {
        "devDependencies": true
      }
    ]
  }
};

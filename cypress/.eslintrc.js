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
};

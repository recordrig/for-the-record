const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withMdxEnhanced({
  layoutPath: "components",
  defaultLayout: false,
  fileExtensions: ["mdx"],
})();

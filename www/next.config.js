const withTypescript = require('@zeit/next-typescript'); //eslint-disable-line

module.exports = withTypescript({
  target: "serverless"
});

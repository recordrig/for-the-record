import initStoryshots from "@storybook/addon-storyshots";

/**
 * Storyshot's is Storybook's integration with Jest's snapshot testing. It auto-generates
 * snapshots based on stories so that we don't have to manually define them. As Jest iterates
 * through all files matching the `.test` pattern, this initiation function will be executed.
 *
 * See [Jest's documentation on shapshot testing](https://jestjs.io/docs/en/snapshot-testing)
 * and [Storybook's documentation on Storyshot](https://storybook.js.org/docs/testing/structural-testing/).
 */
initStoryshots({});

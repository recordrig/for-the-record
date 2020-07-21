import initStoryshots from "@storybook/addon-storyshots";
/*
 * Simply importing this module improves our snapshot diffs. Classnames will become
 * deterministic (instead of changing whenever e.g. a child component changed) and more
 * details will be provided in the terminal as to WHAT styled changed, exactly.
 */
import "jest-styled-components";

/**
 * Storyshot's is Storybook's integration with Jest's snapshot testing. It auto-generates
 * snapshots based on stories so that we don't have to manually define them. As Jest iterates
 * through all files matching the `.jest` pattern, this initiation function will be executed.
 *
 * See [Jest's documentation on shapshot testing](https://jestjs.io/docs/en/snapshot-testing)
 * and [Storybook's documentation on Storyshot](https://storybook.js.org/docs/testing/structural-testing/).
 */
initStoryshots({});

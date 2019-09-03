import * as React from "react";
import { storiesOf } from "@storybook/react";
import TopMenu from "./TopMenu";

storiesOf("TopMenu", module).add("TopMenu", () => <TopMenu />, {
  info: { inline: true }
});

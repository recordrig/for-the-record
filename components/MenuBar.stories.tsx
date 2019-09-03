import * as React from "react";
import { storiesOf } from "@storybook/react";
import MenuBar from "./MenuBar";

storiesOf("MenuBar", module).add("MenuBar", () => <MenuBar />, {
  info: { inline: true }
});

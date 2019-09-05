import * as React from "react";
import { storiesOf } from "@storybook/react";
import MenuBar from "./MenuBar";

storiesOf("MenuBar", module)
  .add("Default", () => <MenuBar />)
  .add("Items in bag", () => <MenuBar itemsInBag={2} />);

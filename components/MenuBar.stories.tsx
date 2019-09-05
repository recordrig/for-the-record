import * as React from "react";
import { storiesOf } from "@storybook/react";
import MenuBar from "./MenuBar";

storiesOf("MenuBar", module)
  .add("default", () => <MenuBar />)
  .add("items in bag", () => <MenuBar itemsInBag={2} />);

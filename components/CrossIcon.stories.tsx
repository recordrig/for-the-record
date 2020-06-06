import React from "react";
import { storiesOf } from "@storybook/react";
import CrossIcon from "./CrossIcon";

storiesOf("CrossIcon", module)
  .add("default", () => <CrossIcon />)
  .add("color", () => <CrossIcon color="#ff0000" />)
  .add("type outline", () => <CrossIcon type="outline" />);

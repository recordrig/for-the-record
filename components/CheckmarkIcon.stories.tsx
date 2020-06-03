import React from "react";
import { storiesOf } from "@storybook/react";
import CheckmarkIcon from "./CheckmarkIcon";

storiesOf("CheckmarkIcon", module)
  .add("default", () => <CheckmarkIcon />)
  .add("color", () => <CheckmarkIcon color="#ff0000" />)
  .add("type filled", () => <CheckmarkIcon type="filled" />)
  .add("type outline", () => <CheckmarkIcon type="outline" />);

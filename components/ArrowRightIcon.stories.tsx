import React from "react";
import { storiesOf } from "@storybook/react";
import ArrowRightIcon from "./ArrowRightIcon";

storiesOf("ArrowRightIcon", module)
  .add("default", () => <ArrowRightIcon />)
  .add("color", () => <ArrowRightIcon color="#ff0000" />);

import React from "react";
import { storiesOf } from "@storybook/react";
import InfoIcon from "./InfoIcon";

storiesOf("InfoIcon", module)
  .add("default", () => <InfoIcon />)
  .add("color", () => <InfoIcon color="#ff0000" />)
  .add("type outline", () => <InfoIcon type="outline" />);

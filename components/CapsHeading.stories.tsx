import * as React from "react";
import { storiesOf } from "@storybook/react";
import CapsHeading from "./CapsHeading";

storiesOf("CapsHeading", module)
  .add("default", () => <CapsHeading text="Capture 4K UHD gameplay" />)
  .add("custom color", () => (
    <CapsHeading text="60 frames per second" fontColor="#da1e28" />
  ))
  .add("custom selector", () => (
    <CapsHeading text="Capture HDR gameplay videos" selector={4} />
  ));

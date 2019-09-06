import * as React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./Heading";

storiesOf("Heading", module)
  .add("default", () => <Heading text="Cinematic 4K HDR video example." />)
  .add("custom color", () => (
    <Heading text="4K 60FPS + HDR videos are the future." fontColor="#408bfc" />
  ))
  .add("custom selector", () => (
    <Heading text="RecordRig technical specifications." selector={1} />
  ))
  .add("centered", () => (
    <Heading text="Record your gameplay in the highest quality." center />
  ));

import * as React from "react";
import { storiesOf } from "@storybook/react";
import Text, { Heading, InlineHeading, CapsHeading, Paragraph } from "./Text";

const text =
  "Demand for high-quality gameplay videos is booming. Now, with RecordRig, recording games in the same high quality you play them is easier than ever. Capture your gameplay in its full glory and give your audience the complete, immersive experience that they crave.";

storiesOf("Text", module)
  .add("default", () => <Text>{text}</Text>)
  .add("text custom color", () => (
    <div style={{ backgroundColor: "#13171a" }}>
      <Text color="#d5d9e0">{text}</Text>
    </div>
  ))
  .add("paragraph", () => <Paragraph>{text}</Paragraph>)
  .add("paragraph custom color", () => (
    <div style={{ backgroundColor: "#13171a" }}>
      <Paragraph color="#d5d9e0">{text}</Paragraph>
    </div>
  ))
  .add("heading", () => (
    <Heading>
      Cinematic 4K HDR
      <br />
      video example.
    </Heading>
  ))
  .add("heading custom color", () => (
    <Heading color="#408bfc">
      4K 60FPS + HDR
      <br />
      videos are the future.
    </Heading>
  ))
  .add("heading custom selector", () => (
    <Heading h={1}>RecordRig technical specifications.</Heading>
  ))
  .add("heading centered", () => (
    <Heading center>Record your gameplay in the highest quality.</Heading>
  ))
  .add("inline heading", () => (
    <InlineHeading>Technical Specifications</InlineHeading>
  ))
  .add("inline heading custom color", () => (
    <InlineHeading>Technical Specifications</InlineHeading>
  ))
  .add("capsheading", () => (
    <CapsHeading>Capture HDR gameplay videos</CapsHeading>
  ))
  .add("capsheading custom color", () => (
    <CapsHeading color="#da1e28">Capture HDR gameplay videos</CapsHeading>
  ))
  .add("capsheading custom selector", () => (
    <CapsHeading h={4}>Capture HDR gameplay videos</CapsHeading>
  ));

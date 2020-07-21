import * as React from "react";
import { storiesOf } from "@storybook/react";
import Text, {
  Heading,
  SubHeading,
  InlineHeading,
  CapsHeading,
  Paragraph
} from "./Text";

const text =
  "Demand for high-quality gameplay videos is booming. Now, with RecordRig, recording games in the same high quality you play them is easier than ever. Capture your gameplay in its full glory and give your audience the complete, immersive experience that they crave.";

storiesOf("Text", module)
  .add("default", () => <Text>{text}</Text>)
  .add("text custom color", () => (
    <div style={{ backgroundColor: "#13171a" }}>
      <Text color="#d5d9e0">{text}</Text>
    </div>
  ))
  .add("text as wrapper", () => (
    <Text>
      <h1>Biggest h1 heading.</h1>
      <p>Some text.</p>
      <h2>Fairly big h2 heading.</h2>
      <p>Some text.</p>
      <h3>Smaller h3 subheading.</h3>
      <p>Some more text.</p>
      <ul>
        <li>List item</li>
        <li>Another list item</li>
      </ul>
    </Text>
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
  .add("subheading", () => <SubHeading>In the box</SubHeading>)
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

import * as React from "react";
import { storiesOf } from "@storybook/react";
import Paragraph from "./Paragraph";

const text =
  "Demand for high-quality gameplay videos is booming. Now, with RecordRig, recording games in the same high quality you play them is easier than ever. Capture your gameplay in its full glory and give your audience the complete, immersive experience that they crave.";

storiesOf("Paragraph", module)
  .add("default", () => <Paragraph text={text} />)
  .add("custom color", () => (
    <div style={{ backgroundColor: "#13171a" }}>
      <Paragraph text={text} fontColor="#d5d9e0" />
    </div>
));

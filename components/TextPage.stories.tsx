import * as React from "react";
import { storiesOf } from "@storybook/react";
import TextPage from "./TextPage";

const metadata = {
  title: "About RecordRig",
  description: "Description for search engines.",
};

const text =
  "Demand for high-quality gameplay videos is booming. Now, with RecordRig, recording games in the same high quality you play them is easier than ever. Capture your gameplay in its full glory and give your audience the complete, immersive experience that they crave.";

storiesOf("TextPage", module).add("default", () => (
  <TextPage metadata={metadata}>
    <>
      <h1>Heading</h1>
      <p>{text}</p>
    </>
  </TextPage>
));

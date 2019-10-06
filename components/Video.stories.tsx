import * as React from "react";
import { storiesOf } from "@storybook/react";
import Video from "./Video";

storiesOf("Video", module).add("default", () => (
  <div style={{ maxWidth: "600px" }}>
    <Video source="/witcher_60fps.mp4" thumbnail="/witcher_60fps_thumb.jpg" />
  </div>
));

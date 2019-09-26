import * as React from "react";
import { storiesOf } from "@storybook/react";
import OptimizedVideo from "./OptimizedVideo";

storiesOf("OptimizedVideo", module).add("default", () => (
  <div style={{ maxWidth: "600px" }}>
    <OptimizedVideo
      source="/static/witcher_60fps.mp4"
      thumbnail="/static/witcher_60fps_thumb.jpg"
    />
  </div>
));

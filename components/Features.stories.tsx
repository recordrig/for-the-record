import * as React from "react";
import { storiesOf } from "@storybook/react";
import Features from "./Features";

storiesOf("Features", module).add("default", () => (
  <div style={{ backgroundColor: "#000000" }}>
    <Features
      texts={[
        "RecordRig is your dedicated gameplay recording PC.",
        "Hook it up to your Xbox, PS4 or even your gaming PC.",
        "Capture your gameplay videos in immersive 4K HDR quality.",
        "Stream directly to YouTube and Twitch, or save for later."
      ]}
    />
  </div>
));

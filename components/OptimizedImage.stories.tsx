import * as React from "react";
import ReactCompareImage from "react-compare-image";
import { storiesOf } from "@storybook/react";
import OptimizedImage, { Image } from "./OptimizedImage";

storiesOf("OptimizedImage", module)
  .add("default", () => (
    <>
      <p>Scroll down for pictures.</p>
      <div style={{ paddingTop: "3000px", maxWidth: "600px" }}>
        <OptimizedImage
          hires={<Image src="/static/god_of_war_hdr_white.jpg" />}
          lowres={<Image src="/static/god_of_war_hdr_white_lowres.jpg" />}
        />
      </div>
    </>
  ))
  .add("custom node", () => (
    <>
      <p>Scroll down for pictures.</p>
      <div style={{ paddingTop: "3000px", maxWidth: "600px" }}>
        <OptimizedImage
          hires={
            <ReactCompareImage
              leftImage="/static/god_of_war_compare_hdr_on.jpg"
              rightImage="/static/god_of_war_compare_hdr_off.jpg"
            />
          }
          lowres={<Image src="/static/god_of_war_compare_hdr_on_lowres.jpg" />}
        />
      </div>
    </>
  ));

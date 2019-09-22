import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CapsHeading, Paragraph } from "./Text";
import Tile, { Container } from "./Tile";

storiesOf("Tile", module)
  .add("default", () => (
    <div style={{ maxWidth: "488px" }}>
      <Tile>
        <Container>
          <CapsHeading>Pay later or pay in parts</CapsHeading>
          <Paragraph>
            If you&apos;re located in Austria, Denmark, Finland, Germany, the
            Netherlands, Norway, Sweden or the United Kingdom you can use Klarna
            to place your order now and Pay Later, after you&apos;ve received
            your RecordRig. Or, Slice It: pay in equal parts over a larger
            period of time, completely interest-free, only starting payments
            after having received your RecordRig.
          </Paragraph>
        </Container>
      </Tile>
    </div>
  ))
  .add("custom colors", () => (
    <div style={{ maxWidth: "488px" }}>
      <Tile backgroundColor="#13171a">
        <Container>
          <img
            alt=""
            src="/static/icon-record-blue-large.png"
            style={{ height: "58px", marginBottom: "20px", width: "58px" }}
          />
          <CapsHeading color="#408bfc">
            Record with the click of a button
          </CapsHeading>
          <Paragraph color="#ffffff">
            RECentral comes pre-installed and pre-configured, ready to start
            recording.Spend less time configuring and getting to know your tool,
            and more time doing what you do best: gaming.
          </Paragraph>
        </Container>
      </Tile>
    </div>
  ))
  .add("bottom image", () => (
    <div style={{ maxWidth: "488px" }}>
      <Tile backgroundColor="#13171a">
        <Container>
          <CapsHeading color="#24a148">Record 4K HDR on Xbox One</CapsHeading>
          <Paragraph color="#ffffff">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </Container>
        <div style={{ textAlign: "center" }}>
          <img
            alt=""
            src="/static/controller-xbox.png"
            style={{ maxWidth: "100%", verticalAlign: "bottom" }}
          />
        </div>
      </Tile>
    </div>
  ))
  .add("top image", () => (
    <div style={{ maxWidth: "488px" }}>
      <Tile backgroundColor="#f2f4f8">
        <div style={{ textAlign: "center" }}>
          <img
            alt=""
            src="/static/4k_hdr_god_of_war_white.jpg"
            style={{ maxWidth: "100%", verticalAlign: "bottom" }}
          />
        </div>
        <Container>
          <CapsHeading color="#da1e28">Brightest whites</CapsHeading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </Container>
      </Tile>
    </div>
  ))
  .add("wide panel with contained image", () => (
    <div style={{ maxWidth: "992px" }}>
      <Tile backgroundColor="#13171a">
        <Container>
          <CapsHeading color="#408bfc">
            Record with confidence using RECentral
          </CapsHeading>
          <Paragraph color="#ffffff">
            Maecenas nec neque facilisis, aliquet sem sed, placerat lorem. Donec
            quis mauris risus. Quisque sodales diam ut elementum ultricies.
            Pellentesque laoreet commodo mauris, ut condimentum nisi cursus
            eget. In scelerisque at elit vitae dictum.
          </Paragraph>
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <img
              alt=""
              src="/static/4k_hdr_streaming_capturing_software.png"
              style={{ maxWidth: "100%", verticalAlign: "bottom" }}
            />
          </div>
        </Container>
      </Tile>
    </div>
  ))
  .add("link", () => (
    <div style={{ maxWidth: "488px" }}>
      <Tile accentColor="#009c98" backgroundColor="#f2f4f8" link="/tech-specs">
        <Container>
          <CapsHeading color="#009c98">Technical specifications</CapsHeading>
          <p style={{ fontSize: "48px", lineHeight: "56px", margin: "64px 0" }}>
            Get the full list of what&apos;s included with RecordRig.
          </p>
          <p style={{ color: "#009c98", fontSize: "18px", textAlign: "right" }}>
            Learn more
          </p>
        </Container>
      </Tile>
    </div>
  ));

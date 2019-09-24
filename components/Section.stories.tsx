import * as React from "react";
import { storiesOf } from "@storybook/react";
import Section, { SectionIntro, SectionRow, SubSection } from "./Section";
import { CapsHeading, Heading, Paragraph } from "./Text";
import Tile, { Container } from "./Tile";

storiesOf("Section", module)
  .add("default", () => (
    <>
      <Section>
        <Heading>Some heading.</Heading>
        <Paragraph>Some paragraph.</Paragraph>
      </Section>
      <Section>
        <Heading>Another heading.</Heading>
        <Paragraph>Another paragraph.</Paragraph>
      </Section>
    </>
  ))
  .add("intro", () => (
    <Section>
      <SectionIntro>
        <Heading color="#da1e28">
          4K 60FPS + HDR
          <br />
          videos are the future.
        </Heading>
        <Paragraph>
          Demand for high-quality gameplay videos is booming. Now, with
          RecordRig, recording games in the same high quality you play them is
          easier than ever. Capture your gameplay in its full glory and give
          your audience the complete, immersive experience that they crave.
        </Paragraph>
      </SectionIntro>
    </Section>
  ))
  .add("rows", () => (
    <Section>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <img
            alt=""
            src="/static/god_of_war_compare_hdr_on.jpg?v=1"
            style={{ width: "100%", verticalAlign: "bottom" }}
          />
          <Container>
            <CapsHeading color="#da1e28">
              Capture HDR gameplay videos
            </CapsHeading>
            <Paragraph color="#ffffff">
              With RecordRig, you gain the ability to capture the darkest
              blacks, the brightest whites, and the full HDR (High Dynamic
              Range) color spectrum of the original game.
            </Paragraph>
          </Container>
        </Tile>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <img
            alt=""
            src="/static/god_of_war_compare_hdr_off.jpg?v=1"
            style={{ width: "100%", verticalAlign: "bottom" }}
          />
          <Container>
            <CapsHeading color="#da1e28">
              Capture HDR gameplay videos
            </CapsHeading>
            <Paragraph color="#ffffff">
              With RecordRig, you gain the ability to capture the darkest
              blacks, the brightest whites, and the full HDR (High Dynamic
              Range) color spectrum of the original game.
            </Paragraph>
          </Container>
        </Tile>
      </SectionRow>
    </Section>
  ))
  .add("subsections", () => (
    <Section>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <img
              alt=""
              src="/static/god_of_war_hdr_black.jpg?v=1"
              style={{ width: "100%", verticalAlign: "bottom" }}
            />
            <Container>
              <CapsHeading color="#da1e28">Darkest blacks</CapsHeading>
              <Paragraph color="#ffffff">
                Capture the full atmosphere of the darkest scenes without losing
                any visibility.
              </Paragraph>
            </Container>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#f2f4f8">
            <img
              alt=""
              src="/static/god_of_war_hdr_white.jpg?v=1"
              style={{ width: "100%", verticalAlign: "bottom" }}
            />
            <Container>
              <CapsHeading color="#da1e28">Brightest whites</CapsHeading>
              <Paragraph>
                Vibrant, alive scenes are a given when capturing in HDR.
              </Paragraph>
            </Container>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
  ));

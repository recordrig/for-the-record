import * as React from "react";
import { storiesOf } from "@storybook/react";
import Section, {
  SectionIntro,
  InfoSection,
  SectionRow,
  SubSection,
} from "./Section";
import { CapsHeading, Heading, Paragraph } from "./Text";
import Tile, { TileContainer } from "./Tile";

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
  .add("dark", () => (
    <>
      <Section dark>
        <Heading color="#ffffff">Some heading.</Heading>
        <Paragraph color="#ffffff">Some paragraph.</Paragraph>
      </Section>
      <Section dark>
        <Heading color="#ffffff">Another heading.</Heading>
        <Paragraph color="#ffffff">Another paragraph.</Paragraph>
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
            src="/god_of_war_compare_hdr_on.jpg?v=1"
            style={{ width: "100%", verticalAlign: "bottom" }}
          />
          <TileContainer>
            <CapsHeading color="#da1e28">
              Capture HDR gameplay videos
            </CapsHeading>
            <Paragraph color="#ffffff">
              With RecordRig, you gain the ability to capture the darkest
              blacks, the brightest whites, and the full HDR (High Dynamic
              Range) color spectrum of the original game.
            </Paragraph>
          </TileContainer>
        </Tile>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <img
            alt=""
            src="/god_of_war_compare_hdr_off.jpg?v=1"
            style={{ width: "100%", verticalAlign: "bottom" }}
          />
          <TileContainer>
            <CapsHeading color="#da1e28">
              Capture HDR gameplay videos
            </CapsHeading>
            <Paragraph color="#ffffff">
              With RecordRig, you gain the ability to capture the darkest
              blacks, the brightest whites, and the full HDR (High Dynamic
              Range) color spectrum of the original game.
            </Paragraph>
          </TileContainer>
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
              src="/god_of_war_hdr_black.jpg?v=1"
              style={{ width: "100%", verticalAlign: "bottom" }}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">Darkest blacks</CapsHeading>
              <Paragraph color="#ffffff">
                Capture the full atmosphere of the darkest scenes without losing
                any visibility.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#f2f4f8">
            <img
              alt=""
              src="/god_of_war_hdr_white.jpg?v=1"
              style={{ width: "100%", verticalAlign: "bottom" }}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">Brightest whites</CapsHeading>
              <Paragraph>
                Vibrant, alive scenes are a given when capturing in HDR.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
  ))
  .add("info section", () => (
    <Section>
      <SectionIntro>
        <Heading>RecordRig dedicated streaming PC tech&nbsp;specs.</Heading>
        <Paragraph>
          Each RecordRig dedicated streaming PC is assembled and tested
          individually, just for you, to make sure that each single unit that we
          ship can do exactly what it should do, without hiccups. Say goodbye to
          the many days or weeks of PC parts selection + assemblage, random
          driver problems and the various compatibility issues involved in
          building your own PC. A RecordRig is guaranteed to always be delivered
          with the ready-to-go capability of recording 4K 60FPS + HDR, and to
          interface well with the PS4 Pro, Xbox One X or your Windows gaming PC.
        </Paragraph>
      </SectionIntro>
      <InfoSection>
        <div>
          <h2>Processor</h2>
        </div>
        <div>
          <Paragraph>
            3.7GHz 8‑core AMD Ryzen 2700X, Max Boost up to 4.3GHz, with 4MB L2
            cache and 16MB L3 cache, support for 16 threads (multithreading).
          </Paragraph>
        </div>
      </InfoSection>
      <InfoSection>
        <div>
          <h2>Graphics</h2>
        </div>
        <div>
          <div>
            <h3>Video Card</h3>
            <Paragraph>
              Nvidia GeForce GTX 1050 Ti X with 4GB of GDDR5 memory or
              equivalent.
            </Paragraph>
          </div>
          <div>
            <h3>Capture Card</h3>
            <Paragraph>
              AVerMedia Live Gamer 4K GC573 internal game capture card with
              support up to 4kp60 HDR, 1440p60 HDR, 1080p60 HDR, 1440p144,
              1080p240 recording and pass-through (always play on the same or
              even a higher resolution than you capture).
            </Paragraph>
          </div>
        </div>
      </InfoSection>
    </Section>
  ));

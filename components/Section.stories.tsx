import * as React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Section, { SectionIntro, SectionRow, SubSection } from "./Section";

storiesOf("Section", module)
  .add("default", () => (
    <Section>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </Section>
  ))
  .add("rows", () => (
    <Section>
      <SectionRow>
        <div style={{ backgroundColor: "#d5d9e0", width: "100%" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </SectionRow>
      <SectionRow>
        <div style={{ backgroundColor: "#d5d9e0", width: "100%" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </SectionRow>
    </Section>
  ))
  .add("subsections", () => (
    <Section>
      <SectionRow>
        <SubSection>
          <div style={{ backgroundColor: "#d5d9e0", width: "100%" }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </SubSection>
        <SubSection>
          <div style={{ backgroundColor: "#d5d9e0", width: "100%" }}>
            <p>I get the full height of my neighbour.</p>
          </div>
        </SubSection>
      </SectionRow>
    </Section>
  ))
  .add("intro", () => (
    <Section>
      <SectionIntro>
        <Heading text="Stream your gameplay like a pro." />
        <Paragraph
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
        />
      </SectionIntro>
    </Section>
  ));

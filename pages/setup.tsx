import React, { FunctionComponent } from "react";
import Head from "next/head";
import styled from "styled-components";
import Section, { SectionIntro, InfoSection } from "../components/Section";
import { Heading, Paragraph } from "../components/Text";

const StyledList = styled.ul`
  color: #878d96;
  font-weight: bold;
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 8px;
  }
`;

const SetupPage: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>RecordRig Setup Guide for Xbox, PlayStation and PC.</title>
        <meta
          name="description"
          content="Record 4K HDR 60FPS from your Xbox, PlayStation or gaming PC with RecordRig dedicated gameplay streaming PC in three simple steps."
        />
      </Head>
      <Section>
        <SectionIntro>
          <Heading>
            RecordRig dedicated streaming PC setup for Xbox, PlayStation
            and&nbsp;PC.
          </Heading>
          <Paragraph>
            When you use RecordRig as your dedicated gameplay streaming PC,
            sharing your gameplay is a breeze. RecordRig comes fully installed
            and pre-configured. All you need to do, is use the included
            high-bandwidth HDMI cables to connect your gaming device and
            display(s).
          </Paragraph>
        </SectionIntro>
        <InfoSection>
          <div>
            <h2>Component overview</h2>
          </div>
          <div>
            <div style={{ paddingBottom: "32px", minWidth: "100%" }}>
              <StyledList>
                <li>RecordRig gameplay streaming PC</li>
                <li>Gaming PC or console (Xbox/PlayStation)</li>
                <li>Display (TV/monitor)</li>
                <li>OPTIONAL: Additional display (TV/monitor)</li>
                <li>3 high-bandwidth HDMI cables</li>
              </StyledList>
            </div>
            <div style={{ paddingBottom: "48px" }}>
              <img alt="" src="/setup-overview-recordrig.svg" />
            </div>
            <div style={{ paddingBottom: "48px" }}>
              <img alt="" src="/setup-overview-gaming-pc-console.svg" />
            </div>
            <div style={{ paddingBottom: "48px" }}>
              <img alt="" src="/setup-overview-display.svg" />
            </div>
            <div style={{ paddingBottom: "48px" }}>
              <img alt="" src="/setup-overview-display-2.svg" />
            </div>
            <div style={{ paddingBottom: "48px", minWidth: "100%" }}>
              <img alt="" src="/setup-overview-cables.svg" />
            </div>
          </div>
        </InfoSection>
      </Section>
    </>
  );
};

export default SetupPage;

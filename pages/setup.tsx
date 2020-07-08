import React, { FunctionComponent } from "react";
import Head from "next/head";
import styled from "styled-components";
import Section, { SectionIntro, InfoSection } from "../components/Section";
import { Heading, Paragraph } from "../components/Text";

const StyledNumber = styled.span`
  border: 1px solid #000000;
  border-radius: 100%;
  display: inline-block;
  font-size: 22px;
  height: 48px;
  line-height: 48px;
  margin-bottom: 12px;
  text-align: center;
  width: 48px;
`;

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
        <InfoSection>
          <div>
            <h2>Simple setup with 1 display</h2>
          </div>
          <div>
            <div style={{ paddingBottom: "64px", minWidth: "100%" }}>
              <StyledNumber>1</StyledNumber>
              <Paragraph>
                Use a HDMI cable to connect from your gaming PC/console&apos;s
                HDMI OUT slot to RecordRig&apos;s HDMI IN slot.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px" }}
                src="/setup-step1.svg"
              />
            </div>
            <div style={{ paddingBottom: "64px", minWidth: "100%" }}>
              <StyledNumber>2</StyledNumber>
              <Paragraph>
                Use a second HDMI cable to connect from your RecordRig&apos;s
                bottom HDMI OUT slot to your TV/monitor&apos;s HDMI IN slot.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px", marginBottom: "32px" }}
                src="/setup-step2.svg"
              />
              <Paragraph>
                The HDMI signal now runs through RecordRig before it passes on
                to your TV/monitor. This allows RecordRig to capture your
                gameplay&apos;s video and sound.
              </Paragraph>
            </div>
            <div style={{ paddingBottom: "64px", minWidth: "100%" }}>
              <StyledNumber>3</StyledNumber>
              <Paragraph>
                Use a third HDMI cable to connect from your RecordRig&apos;s
                HDMI OUT slot to another one of your TV/monitor&apos;s HDMI IN
                slots.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px", marginBottom: "16px" }}
                src="/setup-step3.svg"
              />
            </div>
            <div style={{ paddingBottom: "0px", minWidth: "100%" }}>
              <h3>Simple setup overview</h3>
              <Paragraph>
                This concludes the simple setup. You will now be able to use
                both your RecordRig&apos;s Microsoft Windows as well as your
                gaming PC/console on the SAME display. You&apos;ll need to
                change your display&apos;s source settings to switch between the
                two HDMI signals.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px" }}
                src="/setup-overview-simple.svg"
              />
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Advanced setup with 2 displays (optional)</h2>
          </div>
          <div>
            <div style={{ paddingBottom: "64px", minWidth: "100%" }}>
              <StyledNumber>4</StyledNumber>
              <Paragraph>
                If you&apos;d like to be able to view your gameplay as well as
                use your RecordRig&apos;s Microsoft Windows at the same time,
                connect the third HDMI cable from your RecordRig&apos;s HDMI OUT
                slot to a SECONDARY TV/monitor.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px" }}
                src="/setup-step4.svg"
              />
            </div>
            <div style={{ paddingBottom: "0px", minWidth: "100%" }}>
              <h3>Advanced setup overview</h3>
              <Paragraph>
                This concludes the advanced setup. You will now be able to use
                both your RecordRig&apos;s Microsoft Windows as well as your
                gaming PC/console at the same time, on two SEPERATE displays.
                This is a great setup if you are a live gameplay streamer, and
                would like to keep an eye on your chat and other settings as you
                play.
              </Paragraph>
              <img
                alt=""
                style={{ marginTop: "16px" }}
                src="/setup-overview-advanced.svg"
              />
            </div>
          </div>
        </InfoSection>
      </Section>
    </>
  );
};

export default SetupPage;

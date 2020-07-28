import React, { FunctionComponent } from "react";
import Head from "next/head";
import styled from "styled-components";
import Section, { SectionIntro, InfoSection } from "../components/Section";
import { Heading, Paragraph } from "../components/Text";
import Footnotes from "../components/Footnotes";

const StyledList = styled.ul`
  color: #878d96;
  font-weight: bold;
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 8px;
  }
`;

const StyledCase = styled.span`
  display: flex;
  padding-bottom: 80px;

  > div {
    position: relative;

    > span {
      color: #697077;
      font-size: 9px;
      position: absolute;
    }
  }

  > div:nth-child(2) {
    margin-left: 82px;
  }

  /* Depth. */
  > div:nth-child(1) {
    > span:nth-child(2) {
      bottom: -44px;
      display: inline-block;
      left: 0;
      text-align: center;
      width: 100%;

      &:before {
        content: "";
        bottom: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #a2a9b0;
        border-left: 1px solid #a2a9b0;
        border-right: 1px solid #a2a9b0;
        height: 6px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    }
  }

  /* Height. */
  > div:nth-child(1) {
    > span:nth-child(3) {
      align-items: center;
      display: inline-flex;
      height: 100%;
      text-align: center;
      right: -52px;

      &:before {
        content: "";
        box-sizing: border-box;
        border-top: 1px solid #a2a9b0;
        border-right: 1px solid #a2a9b0;
        border-bottom: 1px solid #a2a9b0;
        height: 100%;
        left: -18px;
        position: absolute;
        width: 6px;
      }

      &:after {
        content: "";
        box-sizing: border-box;
        border-top: 1px solid #a2a9b0;
        border-left: 1px solid #a2a9b0;
        border-bottom: 1px solid #a2a9b0;
        height: 100%;
        position: absolute;
        right: -18px;
        width: 6px;
      }
    }
  }

  /* Width. */
  > div:nth-child(2) {
    > span:nth-child(2) {
      bottom: -44px;
      display: inline-block;
      left: 0;
      text-align: center;
      width: 100%;

      &:before {
        content: "";
        bottom: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #a2a9b0;
        border-left: 1px solid #a2a9b0;
        border-right: 1px solid #a2a9b0;
        height: 6px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    }
  }

  @media (max-width: 474px) {
    img {
      height: 150px;
    }
  }

  @media (min-width: 475px) and (max-width: 799px) {
    img {
      height: 200px;
    }
  }

  @media (min-width: 800px) and (max-width: 1023px) {
    img {
      height: 275px;
    }
  }

  @media (min-width: 1023px) {
    img {
      height: 350px;
    }
  }
`;

const TechSpecsPage: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>RecordRig gameplay streaming PC technical specifications.</title>
        <meta
          name="description"
          content="Record 4K HDR 60FPS gameplay with a custom, pre-built streaming PC."
        />
      </Head>
      <Section>
        <SectionIntro>
          <Heading>RecordRig dedicated streaming PC tech&nbsp;specs.</Heading>
          <Paragraph>
            Each RecordRig dedicated streaming PC is assembled and tested
            individually, just for you, to make sure that each single unit that
            we ship can do exactly what it should do, without hiccups. Say
            goodbye to the many days or weeks of PC parts selection +
            assemblage, random driver problems and the various compatibility
            issues involved in building your own PC. A RecordRig is guaranteed
            to always be delivered with the ready-to-go capability of recording
            4K 60FPS + HDR, and to interface well with the PS4 Pro, Xbox One X
            or your Windows gaming PC.
          </Paragraph>
        </SectionIntro>
        <InfoSection>
          <div>
            <h2>Case</h2>
          </div>
          <div>
            <StyledCase>
              <div>
                <img alt="" src="/case-side.png" />
                <span>
                  depth
                  <br />
                  42,8cm
                </span>
                <span>
                  height
                  <br />
                  46cm
                </span>
              </div>
              <div>
                <img alt="" src="/case-front.png" />
                <span>
                  width
                  <br />
                  46cm
                </span>
              </div>
            </StyledCase>
            <Paragraph>
              All-steel body, equipped with configurable RGB LED lighting, with
              tempered glass removable side panel for easy-access to all core
              components.
            </Paragraph>
            <div>
              <span
                style={{
                  color: "#a2a9b0",
                  backgroundColor: "#ffffff",
                  border: "1px solid #a2a9b0",
                  borderRadius: "3px",
                  display: "inline-block",
                  fontSize: "13px",
                  fontWeight: "bold",
                  padding: "4px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  width: "120px",
                }}
              >
                Pristine White
              </span>
              <span
                style={{
                  color: "#a2a9b0",
                  backgroundColor: "#121619",
                  border: "1px solid #a2a9b0",
                  borderRadius: "3px",
                  display: "inline-block",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginLeft: "8px",
                  padding: "4px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  width: "120px",
                }}
              >
                Stealth Black
              </span>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Gameplay record max resolutions</h2>
          </div>
          <div>
            <div>
              <h3>Max record resolutions</h3>
              <StyledList>
                <li>2160p (= 4K) 60FPS + HDR colours</li>
                <li>1440p 60FPS + HDR colours</li>
                <li>1080p 60FPS + HDR colours</li>
                <li>1440p 144FPS (HDR off)</li>
                <li>1080p 240FPS (HDR off)</li>
              </StyledList>
            </div>
            <div>
              <h3>Max pass-through resolutions</h3>
              <StyledList>
                <li>2160p (= 4K) 60FPS + HDR colours</li>
                <li>1440p 60FPS + HDR colours</li>
                <li>1080p 60FPS + HDR colours</li>
                <li>1440p 144FPS (HDR off)</li>
                <li>1080p 240FPS (HDR off)</li>
              </StyledList>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Streaming platforms</h2>
          </div>
          <div>
            <img
              alt=""
              src="/multi-stream.png?v=2"
              style={{ marginBottom: "64px", maxWidth: "600px", width: "100%" }}
            />
            <Paragraph>
              Support for popular platforms such as YouTube, Twitch, Facebook,
              Mixer and Smashcast is built into the RECentral gameplay streaming
              software.
            </Paragraph>
            <Paragraph>
              Optionally stream to a different, custom platform through an{" "}
              <strong>RTMP token</strong>.
            </Paragraph>
            <Paragraph>
              <strong>Multi-streaming</strong> is supported. Stream to multiple
              platforms simultanuously.
            </Paragraph>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Compatible devices</h2>
          </div>
          <div>
            <StyledList>
              <li>Microsoft Windows gaming PC</li>
              <li>PlayStation 4 Pro, Playstation 4</li>
              <li>Xbox One X, Xbox One</li>
            </StyledList>
          </div>
        </InfoSection>
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
            <h2>Storage</h2>
          </div>
          <div>
            <div>
              <Paragraph>
                2TB type M.2 SSD mounted directly onto the motherboard for
                superiour read and write speeds.
              </Paragraph>
            </div>
            <div>
              <Paragraph>
                8TB &apos;BigStorage&apos; 7200 RPM HDD, suitable for storing
                hundres of hours of recorded 4K video.
              </Paragraph>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Graphics</h2>
          </div>
          <div>
            <div>
              <h3>Video card</h3>
              <Paragraph>
                Nvidia GeForce GTX 1050 Ti X with 4GB of GDDR5 memory or
                equivalent<sup>1</sup>.
              </Paragraph>
            </div>
            <div>
              <h3>Capture card</h3>
              <Paragraph>
                AVerMedia Live Gamer 4K GC573 internal game capture card with
                support up to 4kp60 HDR, 1440p60 HDR, 1080p60 HDR, 1440p144,
                1080p240 recording and pass-through (always play on the same or
                even a higher resolution than you capture).
              </Paragraph>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Wireless</h2>
          </div>
          <div>
            <div>
              <h3>Wi-Fi</h3>
              <Paragraph>
                Intel® 802.11ac WiFi Module, supports IEEE 802.11a/b/g/n/ac,
                Dual-Band (2.4/5 GHz), high speed wireless connections up to
                433Mbps.
              </Paragraph>
            </div>
            <div>
              <h3>Bluetooth</h3>
              <Paragraph>
                Integrated Bluetooth 4.2 and/or 3.0 without need for an external
                adapter.
              </Paragraph>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Ports</h2>
          </div>
          <div>
            <div>
              <h3>Front Top I/O</h3>
              <StyledList>
                <li>2 USB Type-A Ports</li>
                <li>1 Microphone Jack</li>
                <li>1 Headphone Jack</li>
              </StyledList>
              <br />
              <h3>Back Bottom I/O</h3>
              <StyledList>
                <li>1 HDMI 2.1 PC Out Port</li>
                <li>1 HDMI 2.1 Game Out Port</li>
                <li>1 HDMI 2.1 Game In Port</li>
              </StyledList>
            </div>
            <div>
              <h3>Back Top I/O</h3>
              <StyledList>
                <li>1 Ethernet 10Gbps port</li>
                <li>1 Ethernet 1Gbps port</li>
                <li>6 USB 3.1 Gen1 Type-A Ports </li>
                <li>1 USB 3.1 Gen2 Type-A Ports</li>
                <li>1 USB 3.1 Gen2 Type-C Port</li>
                <li>1 PS/2 Mouse/Keyboard Port</li>
                <li>1 Optical SPDIF Out Port</li>
                <li>5 Analogue Gold Audio Jacks</li>
              </StyledList>
            </div>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>Software</h2>
          </div>
          <div>
            <StyledList>
              <li>Microsoft Windows 10 (English)</li>
              <li>RECentral 4</li>
              <li>NZXT CAM 4</li>
            </StyledList>
          </div>
        </InfoSection>
        <InfoSection>
          <div>
            <h2>In the box</h2>
          </div>
          <div>
            <img
              alt=""
              src="/in-the-box.svg?v=2"
              style={{ marginBottom: "64px", maxWidth: "600px", width: "100%" }}
            />
            <StyledList>
              <li>
                RecordRig dedicated streaming PC in Stealth Black or Pristine
                White
              </li>
              <li>Power cord for Type F plugs (European)</li>
              <li>3 HDMI 2.1 (high-bandwidth) cables in black or white</li>
            </StyledList>
          </div>
        </InfoSection>
      </Section>
      <Footnotes>
        <div style={{ margin: "0 8px" }}>
          <p>
            1. Slotted graphics cards might vary. Graphics cards are selected
            based on performance and independent benchmark testing. Some traits
            are prioritised over others, e.g. Nvidia is our brand of choice due
            to RECentral&apos;s (gameplay recording software) capability of
            using these graphics card for better performance when recording.
            RecordRig always makes sure to slot a graphics card that performs
            well for RecordRig dedicated streaming PC&apos;s core use cases:
            recording and streaming in 4K 60FPS + HDR.
          </p>
        </div>
      </Footnotes>
    </>
  );
};

export function getStaticProps() {
  return {
    props: {
      layout: "Site",
    },
  };
}

export default TechSpecsPage;

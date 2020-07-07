import React, { FunctionComponent } from "react";
import Head from "next/head";
import Section, { SectionIntro, InfoSection } from "../components/Section";
import { Heading, Paragraph } from "../components/Text";

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
    </>
  );
};

export default TechSpecsPage;

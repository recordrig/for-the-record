import React, { FunctionComponent } from "react";
import Head from "next/head";
import styled from "styled-components";
import ReactCompareImage from "react-compare-image";
import OptimizedMedia, { Image } from "../components/OptimizedMedia";
import Video from "../components/Video";
import { CapsHeading, Heading, Paragraph } from "../components/Text";
import Section, {
  SectionIntro,
  SectionRow,
  SubSection
} from "../components/Section";
import Tile, { TileContainer } from "../components/Tile";
import Features from "../components/Features";

const StyledSubHeading = styled.h3`
  color: #b9bfc7;
  font-weight: bold;
  margin: 0;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const StyledProductImage = styled.div`
  @keyframes rotateHue {
    0% {
      filter: hue-rotate(0deg);
    }

    50% {
      filter: hue-rotate(360deg);
    }

    100% {
      filter: hue-rotate(0deg);
    }
  }

  animation: rotateHue 12s infinite;
  animation-delay: 4s;

  > img {
    max-width: 100%;
  }
`;

const FadeInSubHeading = styled.div`
  /* Due to bad results with animation-delay, we'll implement delays using keyframes instead. */
  @keyframes revealSubHeading {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    35% {
      opacity: 0;
      transform: translateY(25px);
    }

    55% {
      opacity: 1;
      transform: translateY(0px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealSubHeading 4s;
  will-change: transform, opacity;
`;

const FadeInHeading = styled.div`
  @keyframes revealHeading {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    40% {
      opacity: 0;
      transform: translateY(25px);
    }

    60% {
      opacity: 1;
      transform: translateY(0px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealHeading 4s;
  will-change: transform, opacity;
`;

const FadeInProductImage = styled.div`
  @keyframes revealProduct {
    0% {
      opacity: 0;
    }

    60% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  animation: revealProduct 4s;
  will-change: opacity;
`;

const FadeInFeatures = styled.div`
  @keyframes revealFeatures {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    65% {
      opacity: 0;
      transform: translateY(25px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealFeatures 4s;
  will-change: transform, opacity;
`;

const StyledSideBySideProducts = styled.div`
  position: relative;

  img {
    position: absolute;
    left: 50%;
  }

  @media (max-width: 767px) {
    height: 350px;

    img:nth-child(1) {
      margin-left: -144px;
      width: 200px;
      top: 32px;
      z-index: 1;
    }

    img:nth-child(2) {
      margin-left: -20px;
      top: 54px;
      width: 161px;
    }
  }

  @media (min-width: 768px) {
    height: 700px;

    img:nth-child(1) {
      margin-left: -300px;
      width: 400px;
      top: 64px;
      z-index: 1;
    }

    img:nth-child(2) {
      margin-left: -23px;
      top: 110px;
      width: 320px;
    }
  }
`;

const StyledIndexPage = styled.div``;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <Head>
      <title>
        Record 4K HDR gameplay on PS4, Xbox and PC with RecordRig, your
        dedicated gameplay streaming PC.
      </title>
      <meta
        name="description"
        content="Recording and streaming 4K HDR on PS4 Pro and Xbox One is finally here - buy RecordRig to share gameplay in UHD."
      />
      <script
        data-dojo-config="usePlainJson: true, isDebug: false"
        src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"8f581f23cd5c1496c751b2f82","lid":"e87990c606","uniqueMethods":true}) })
          `
        }}
      />
    </Head>
    <Section dark>
      <FadeInSubHeading>
        <StyledSubHeading>RecordRig.</StyledSubHeading>
      </FadeInSubHeading>
      <FadeInHeading>
        <Heading center color="#ffffff" h={1}>
          Share your gameplay in the highest quality.
        </Heading>
      </FadeInHeading>
      <FadeInProductImage>
        <StyledProductImage>
          <img
            alt="Gameplay can be recorded in 4K HDR with this streaming PC."
            src="/recordrig.png"
            style={{ display: "block", margin: "64px auto" }}
          />
        </StyledProductImage>
      </FadeInProductImage>
      <FadeInFeatures>
        <Features
          texts={[
            "RecordRig is your dedicated gameplay recording PC.",
            "Hook it up to your Xbox, PS4 or even your gaming PC.",
            "Capture your gameplay videos in immersive 4K HDR quality.",
            "Stream directly to YouTube and Twitch, or save for later."
          ]}
        />
      </FadeInFeatures>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#da1e28">4K HDR videos are the future.</Heading>
        <Paragraph color="#d5d9e0">
          Demand for high-quality gameplay videos is booming. Now, with
          RecordRig, recording games in the same high quality you play them is
          easier than ever. Capture your gameplay in its full glory and give
          your audience the complete, immersive experience that they crave.
        </Paragraph>
      </SectionIntro>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <Image src="/4k_hd_resolution_compared.png?v=1" />
            <TileContainer>
              <CapsHeading color="#da1e28">Capture 4K gameplay.</CapsHeading>
              <Paragraph color="#ffffff">
                4K resolution means four times as many pixels as ordinary HD
                resolution - a massive difference. No detail will be missed when
                recording with RecordRig.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <OptimizedMedia
              hires={
                <Video
                  source="/witcher_60fps.mp4?v=1"
                  thumbnail="/witcher_60fps_thumb.jpg?v=1"
                />
              }
              lowres={<Image src="/witcher_60fps_thumb.jpg?v=1" />}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">
                60 frames per second? Naturally.
              </CapsHeading>
              <Paragraph color="#ffffff">
                Your gameplay will look buttery smooth as it&apos;s captured at
                60 frames per second.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <OptimizedMedia
            hires={
              <ReactCompareImage
                handleSize={64}
                leftImage="/god_of_war_compare_hdr_on.jpg?v=1"
                rightImage="/god_of_war_compare_hdr_off.jpg?v=1"
                sliderLineColor="#f2f4f8"
              />
            }
            lowres={<Image src="/god_of_war_compare_hdr_on_lowres.jpg" />}
          />
          <TileContainer>
            <CapsHeading color="#da1e28">
              HDR colors make all the difference.
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
        <SubSection>
          <Tile backgroundColor="#13171A">
            <OptimizedMedia
              hires={<Image src="/god_of_war_hdr_black.jpg?v=1" />}
              lowres={<Image src="/god_of_war_hdr_black_lowres.jpg?v=1" />}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">The darkest blacks.</CapsHeading>
              <Paragraph color="#ffffff">
                Capture the full atmosphere of the darkest scenes without
                sacrificing visibility.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#f2f4f8">
            <OptimizedMedia
              hires={<Image src="/god_of_war_hdr_white.jpg?v=1" />}
              lowres={<Image src="/god_of_war_hdr_white_lowres.jpg?v=1" />}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">
                And the brightest whites.
              </CapsHeading>
              <Paragraph>
                Vibrant, immersive scenes are a given when capturing in HDR.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#24a148">Record 4K HDR on console - or PC.</Heading>
        <Paragraph color="#d5d9e0">
          It doesn&apos;t matter whether you&apos;re on Xbox One X, PS4 Pro or
          even on a gaming PC, so long as your device outputs a 4K HDR video
          signal, you can record its output using RecordRig.
        </Paragraph>
      </SectionIntro>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <TileContainer>
              <CapsHeading color="#24a148">
                Record 4K HDR on Xbox One X.
              </CapsHeading>
              <Paragraph color="#ffffff">
                With RecordRig, you are no longer limited to your Xbox One
                X&apos;s max streaming resolution of ordinary HD. Hook it up,
                and finally share your gameplay in 4K HDR, the same quality you
                play in.
              </Paragraph>
            </TileContainer>
            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                margin: "0 auto",
                maxWidth: "506px",
                padding: "0 16px",
                width: "100%"
              }}
            >
              <OptimizedMedia
                hires={<Image src="/controller-xbox.png?v=1" />}
                lowres={<Image src="/controller-xbox_lowres.png?v=1" />}
              />
            </div>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <TileContainer>
              <CapsHeading color="#24a148">
                Record 4K HDR on PS4 Pro.
              </CapsHeading>
              <Paragraph color="#ffffff">
                Finally share gameplay of amazing games such as God of War or
                Horizon: Zero Dawn the way they deserve to be shared -- in full,
                vibrant 4K HDR.
              </Paragraph>
            </TileContainer>
            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                margin: "0 auto",
                maxWidth: "506px",
                padding: "0 16px",
                width: "100%"
              }}
            >
              <OptimizedMedia
                hires={<Image src="/controller-ps4.png?v=1" />}
                lowres={<Image src="/controller-ps4_lowres.png?v=1" />}
              />
            </div>
          </Tile>
        </SubSection>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <TileContainer>
            <CapsHeading color="#24a148">Record 4K HDR on PC.</CapsHeading>
            <Paragraph color="#ffffff">
              No longer suffer framedrops and performance issues while recording
              on your gaming PC. Get yourself a dedicated streaming PC which is
              specialised in recording 4K HDR + 60FPS gameplay -- a RecordRig.
              Hook up RecordRig to your gaming PC, and share your gameplay in
              the very highest possible quality. Zero compromises.
            </Paragraph>
          </TileContainer>
          <OptimizedMedia
            hires={<Image src="/windows-keyboard.jpg?v=1" />}
            lowres={<Image src="/windows-keyboard_lowres.jpg?v=1" />}
          />
        </Tile>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#408bfc">
          Recording 4K HDR is easy on RecordRig.
        </Heading>
        <Paragraph color="#d5d9e0">
          Your RecordRig will arrive ready-to-go, running Microsoft Windows and
          exactly the software and drivers you need to record and share your
          gameplay, at no extra costs to you.
        </Paragraph>
      </SectionIntro>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <TileContainer>
            <CapsHeading color="#408bfc">
              Comes with RECentral capturing software.
            </CapsHeading>
            <Paragraph color="#ffffff">
              Stream, record and share with complete control over those
              configurations that matter to you the most. RECentral is a
              powerful yet user-friendly live streaming and recording tool here
              to help you produce your greatest video creations in the simplest
              way.
            </Paragraph>
            <div style={{ margin: "64px auto", maxWidth: "640px" }}>
              <OptimizedMedia
                hires={
                  <Image src="/4k_hdr_streaming_capturing_software.png?v=1" />
                }
                lowres={
                  <Image src="/4k_hdr_streaming_capturing_software_lowres.png?v=1" />
                }
              />
            </div>
          </TileContainer>
        </Tile>
      </SectionRow>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171a">
            <TileContainer>
              <img
                alt=""
                src="/icon-large-blue-record.png"
                style={{ height: "58px", marginBottom: "20px" }}
              />
              <CapsHeading color="#408bfc">
                Record with the click of a button.
              </CapsHeading>
              <Paragraph color="#ffffff">
                RECentral comes pre-installed and pre-configured, ready to start
                recording. Spend less time configuring and getting to know your
                tool, and more time doing what you do best: gaming.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171a">
            <TileContainer>
              <img
                alt=""
                src="/icon-large-blue-storage.png"
                style={{
                  height: "52px",
                  marginBottom: "23px",
                  marginTop: "3px"
                }}
              />
              <CapsHeading color="#408bfc">
                Store hundreds of hours of video.
              </CapsHeading>
              <Paragraph color="#ffffff">
                With storage space of a whopping 10TB, you&apos;ll be able to
                leave nothing to chance and save all of your gaming adventures
                right here on your RecordRig.
              </Paragraph>
            </TileContainer>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#ee538b">Customise the look.</Heading>
        <Paragraph color="#d5d9e0">
          Always equipped with a premium steel case and tempered glass, you can
          select the case&apos;s your colour of choice and we&apos;ll assemble
          your personal RecordRig to order. And that&apos;s not all; you can
          customise the LED colours completely through a user-friendly user
          interface once you&apos;ve received your RecordRig.
        </Paragraph>
      </SectionIntro>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <TileContainer>
              <CapsHeading color="#ee538b">Stealth Black</CapsHeading>
              <Paragraph color="#ffffff">
                It doesn&apos;t matter whether you think dark-embodied tech just
                looks the most intimidating or there&apos;s some other reason
                that pulls you towards the charming look of the eternal void.
                You can&apos;t ever really go wrong with the timeless attraction
                of a color bearing the name Stealth Black.
              </Paragraph>
            </TileContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                margin: "0 auto 64px",
                maxWidth: "320px"
              }}
            >
              <StyledProductImage>
                <img
                  alt=""
                  src="/recordrig-black.png"
                  style={{ width: "100%" }}
                />
              </StyledProductImage>
            </div>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#f2f4f8">
            <TileContainer>
              <CapsHeading color="#ee538b">Pristine White</CapsHeading>
              <Paragraph>
                Perhaps you own a special edition white version of your gaming
                console and would like to pair it side-by-side with your
                RecordRig. Or maybe you are one of those fancy minimalists with
                a bright, Scandinavian home interior. In that case (pun
                intended), the Pristine White case edition of RecordRig is for
                you.
              </Paragraph>
            </TileContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                margin: "0 auto 64px",
                maxWidth: "320px"
              }}
            >
              <StyledProductImage>
                <img alt="" src="/recordrig.png" style={{ width: "100%" }} />
              </StyledProductImage>
            </div>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#ffffff">Cinematic 4K HDR video example.</Heading>
        <Paragraph color="#d5d9e0">
          Recorded with RecordRig on PS4 Pro, this 10-minute intro clip from God
          of War shows exactly why only 4K HDR video quality really does
          today&apos;s games the justice they are due. Grab a cup of tea, get
          comfortable and turn your volume and bass up high. Best viewed
          fullscreen on a TV or monitor that supports 4K resolution and HDR
          colors.
        </Paragraph>
      </SectionIntro>
      <OptimizedMedia
        hires={
          <div style={{ paddingBottom: "56.25%", position: "relative" }}>
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              src="https://www.youtube.com/embed/9NIdIh3f69Q?rel=0"
              style={{ height: "100%", position: "absolute", width: "100%" }}
              title="God of War intro in 4K HDR, recorded with RecordRig on PS4 Pro"
            />
          </div>
        }
        lowres={<Image src="/god_of_war_4k_hdr_thumb_lowres.jpg?v=1" />}
      />
    </Section>
    <Section>
      <Tile accentColor="#0062ff" backgroundColor="#ffffff">
        <TileContainer>
          <div style={{ marginBottom: "32px", marginTop: "64px" }}>
            <Heading center>RecordRig.</Heading>
            <div style={{ paddingTop: "12px", textAlign: "center" }}>
              <span
                style={{
                  border: "1px solid #FF5500",
                  borderRadius: "2px",
                  color: "#FF5500",
                  display: "inline-block",
                  fontSize: "14px",
                  fontWeight: "normal",
                  margin: "0 auto",
                  padding: "4px 8px",
                  textAlign: "center",
                  textTransform: "uppercase"
                }}
              >
                Coming This Fall
              </span>
            </div>
          </div>
          <StyledSideBySideProducts>
            <img alt="" src="/recordrig.png" />
            <img alt="" src="/recordrig-black.png" />
          </StyledSideBySideProducts>
        </TileContainer>
      </Tile>
    </Section>
  </StyledIndexPage>
);

export default IndexPage;

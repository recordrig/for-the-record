import React, { FunctionComponent } from "react";
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

    15% {
      opacity: 0;
      transform: translateY(25px);
    }

    35% {
      opacity: 1;
      transform: translateY(0px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealSubHeading 3s;
  will-change: transform, opacity;
`;

const FadeInHeading = styled.div`
  @keyframes revealHeading {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    20% {
      opacity: 0;
      transform: translateY(25px);
    }

    40% {
      opacity: 1;
      transform: translateY(0px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealHeading 3s;
  will-change: transform, opacity;
`;

const FadeInProductImage = styled.div`
  @keyframes revealProduct {
    0% {
      opacity: 0;
    }

    30% {
      opacity: 0;
    }

    80% {
      opacity: 1;
    }
  }

  animation: revealProduct 3s;
  will-change: opacity;
`;

const FadeInFeatures = styled.div`
  @keyframes revealFeatures {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    45% {
      opacity: 0;
      transform: translateY(25px);
    }

    80% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: revealFeatures 3s;
  will-change: transform, opacity;
`;

const StyledIndexPage = styled.div``;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <Section dark>
      <FadeInSubHeading>
        <StyledSubHeading>RecordRig.</StyledSubHeading>
      </FadeInSubHeading>
      <FadeInHeading>
        <Heading center color="#ffffff" h={1}>
          Record your gameplay in the highest quality.
        </Heading>
      </FadeInHeading>
      <FadeInProductImage>
        <StyledProductImage>
          <img
            alt="Gameplay can be recorded in 4K HDR with this streaming PC."
            src="/static/recordrig.png"
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
        <Heading color="#da1e28">
          4K 60FPS HDR
          <br />
          videos are the&nbsp;future.
        </Heading>
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
            <Image src="/static/4k_hd_resolution_compared.png?v=1" />
            <TileContainer>
              <CapsHeading color="#da1e28">Capture 4K UHD gameplay</CapsHeading>
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
                  source="/static/witcher_60fps.mp4?v=1"
                  thumbnail="/static/witcher_60fps_thumb.jpg?v=1"
                />
              }
              lowres={<Image src="/static/witcher_60fps_thumb.jpg?v=1" />}
            />
            <TileContainer>
              <CapsHeading color="#da1e28">60 frames per second</CapsHeading>
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
                leftImage="/static/god_of_war_compare_hdr_on.jpg?v=1"
                rightImage="/static/god_of_war_compare_hdr_off.jpg?v=1"
                sliderLineColor="#f2f4f8"
              />
            }
            lowres={
              <Image src="/static/god_of_war_compare_hdr_on_lowres.jpg" />
            }
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
        <SubSection>
          <Tile backgroundColor="#13171A">
            <OptimizedMedia
              hires={<Image src="/static/god_of_war_hdr_black.jpg?v=1" />}
              lowres={
                <Image src="/static/god_of_war_hdr_black_lowres.jpg?v=1" />
              }
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
            <OptimizedMedia
              hires={<Image src="/static/god_of_war_hdr_white.jpg?v=1" />}
              lowres={
                <Image src="/static/god_of_war_hdr_white_lowres.jpg?v=1" />
              }
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
    <Section dark>
      <SectionIntro>
        <Heading color="#24a148">Record 4K HDR on console - or PC.</Heading>
        <Paragraph color="#d5d9e0">
          It doesn&apos;t matter whether you&apos;re on Xbox One X, PS4 Pro or
          even on a gaming PC, so long as your device outputs a 4K HDR video
          signal, lorem ipsum dolor sit amet, you can record its output using
          RecordRig.
        </Paragraph>
      </SectionIntro>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <TileContainer>
              <CapsHeading color="#24a148">
                Record 4K HDR on Xbox One X
              </CapsHeading>
              <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
            </TileContainer>
            <OptimizedMedia
              hires={<Image src="/static/controller-xbox.png?v=1" />}
              lowres={<Image src="/static/controller-xbox_lowres.png?v=1" />}
            />
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <TileContainer>
              <CapsHeading color="#24a148">
                Record 4K HDR on PS4 Pro
              </CapsHeading>
              <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
            </TileContainer>
            <OptimizedMedia
              hires={<Image src="/static/controller-ps4.png?v=1" />}
              lowres={<Image src="/static/controller-ps4_lowres.png?v=1" />}
            />
          </Tile>
        </SubSection>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <TileContainer>
            <CapsHeading color="#24a148">Record 4K HDR on PC</CapsHeading>
            <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
          </TileContainer>
          <OptimizedMedia
            hires={<Image src="/static/windows-keyboard.jpg?v=1" />}
            lowres={<Image src="/static/windows-keyboard_lowres.jpg?v=1" />}
          />
        </Tile>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#408bfc">
          Recording 4K HDR is easy on RecordRig.
        </Heading>
        <Paragraph color="#d5d9e0">Lorem ipsum.</Paragraph>
      </SectionIntro>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <TileContainer>
            <CapsHeading color="#408bfc">
              Record with confidence using RECentral
            </CapsHeading>
            <Paragraph color="#ffffff">
              Maecenas nec neque facilisis, aliquet sem sed, placerat lorem.
              Donec quis mauris risus. Quisque sodales diam ut elementum
              ultricies. Pellentesque laoreet commodo mauris, ut condimentum
              nisi cursus eget. In scelerisque at elit vitae dictum.
            </Paragraph>
            <div style={{ margin: "64px auto", maxWidth: "640px" }}>
              <OptimizedMedia
                hires={
                  <Image src="/static/4k_hdr_streaming_capturing_software.png?v=1" />
                }
                lowres={
                  <Image src="/static/4k_hdr_streaming_capturing_software_lowres.png?v=1" />
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
                src="/static/icon-large-blue-record.png"
                style={{ height: "58px", marginBottom: "20px" }}
              />
              <CapsHeading color="#408bfc">
                Record with the click of a button
              </CapsHeading>
              <Paragraph color="#ffffff">
                RECentral comes pre-installed and pre-configured, ready to start
                recording.Spend less time configuring and getting to know your
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
                src="/static/icon-large-blue-storage.png"
                style={{
                  height: "52px",
                  marginBottom: "23px",
                  marginTop: "3px"
                }}
              />
              <CapsHeading color="#408bfc">
                Store hundreds of hours of video
              </CapsHeading>
              <Paragraph color="#ffffff">
                With configurable hard drive space of up to a whopping 10TB, you
                can save all your favourite videos.
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
            <div style={{ margin: "0 auto 64px", maxWidth: "320px" }}>
              <StyledProductImage>
                <img
                  alt=""
                  src="/static/recordrig-black.png"
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
            <div style={{ margin: "0 auto 64px", maxWidth: "320px" }}>
              <StyledProductImage>
                <img
                  alt=""
                  src="/static/recordrig.png"
                  style={{ width: "100%" }}
                />
              </StyledProductImage>
            </div>
          </Tile>
        </SubSection>
      </SectionRow>
    </Section>
    <Section dark>
      <SectionIntro>
        <Heading color="#ffffff">Cinematic 4K HDR video&nbsp;example.</Heading>
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
        lowres={<Image src="/static/god_of_war_4k_hdr_thumb_lowres.jpg?v=1" />}
      />
    </Section>
  </StyledIndexPage>
);

export default IndexPage;

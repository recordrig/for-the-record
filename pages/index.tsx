import React, { FunctionComponent } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { Player, BigPlayButton, ControlBar } from "video-react";
import ReactCompareImage from "react-compare-image";
import { CapsHeading, Heading, Paragraph } from "../components/Text";
import Section, {
  SectionIntro,
  SectionRow,
  SubSection
} from "../components/Section";
import Tile, { Container } from "../components/Tile";

const StyledFeatureNumber = styled.span`
  border: 1px solid #ffffff;
  border-radius: 100%;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  text-align: center;
  width: 32px;
`;

const StyledFeature = styled.div`
  background-color: #000000;
  color: #ffffff;

  > p {
    border-top: 2px solid #868d95;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 16px;
    padding-top: 16px;
  }
`;

type FeatureProps = {
  description: string;
  number: number;
};

const Feature: FunctionComponent<FeatureProps> = ({
  description,
  number
}: FeatureProps) => (
  <StyledFeature>
    <StyledFeatureNumber>{number}</StyledFeatureNumber>
    <p>{description}</p>
  </StyledFeature>
);

const StyledSubHeading = styled.h3`
  color: #b9bfc7;
  font-weight: bold;
  margin: 0;
  text-align: center;

  @media (max-width: 767.9999px) {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const PositionedImage = styled.div`
  margin: 64px 0;
  text-align: center;

  > img {
    max-width: 96%;
  }
`;

const PositionedFeatures = styled.div`
  margin: 0 auto;
  overflow: auto;

  > div {
    margin-bottom: 64px;
  }

  @media (max-width: 575.9999px) {
    > div {
      margin-left: auto;
      margin-right: auto;
      width: 296px;
    }

    > div p {
      font-size: 18px;
      line-height: 24px;
    }
  }

  @media (min-width: 576px) and (max-width: 767.9999px) {
    max-width: 560px;

    > div {
      float: left;
      width: 264px;
    }

    > div:nth-child(odd) {
      margin-right: 32px;
    }

    > div p {
      font-size: 18px;
      line-height: 24px;
    }
  }

  @media (min-width: 768px) {
    max-width: 656px;

    > div {
      float: left;
      width: 296px;
    }

    > div:nth-child(odd) {
      margin-right: 64px;
    }

    > div p {
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

const StyledPlayer = styled.div`
  cursor: pointer;

  .video-react .video-react-big-play-button.video-react-big-play-button-center {
    border-radius: 50%;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 32px;
    height: 64px;
    line-height: 60px;
    margin-left: -32px;
    margin-top: -32px;
    width: 64px;
  }

  .video-react.video-react-has-started.video-react-paused
    .video-react-big-play-button.big-play-button-hide {
    display: block;
  }

  video {
    outline: none;
  }
`;

const StyledIndexPage = styled.div`
  background-color: #000000;
`;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <Section>
      <StyledSubHeading>RecordRig.</StyledSubHeading>
      <Heading center color="#ffffff" h={1}>
        Record your gameplay in the highest quality.
      </Heading>
      <PositionedImage>
        <img
          alt="RecordRig - a dedicated streaming PC."
          src="/static/recordrig.png"
        />
      </PositionedImage>
      <PositionedFeatures>
        <Feature
          description="RecordRig is your dedicated gameplay recording PC."
          number={1}
        />
        <Feature
          description="Hook it up to your Xbox, PS4 or even your gaming PC."
          number={2}
        />
        <Feature
          description="Capture your gameplay videos in immersive 4K HDR quality."
          number={3}
        />
        <Feature
          description="Stream directly to YouTube and Twitch, or save for later."
          number={4}
        />
      </PositionedFeatures>
    </Section>
    <Section>
      <SectionIntro>
        <Heading color="#da1e28">
          4K 60FPS + HDR
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
            <LazyLoad offset={200}>
              <img
                alt=""
                src="/static/4k_hd_resolution_compared.png?v=1"
                style={{ width: "100%", verticalAlign: "bottom" }}
              />
            </LazyLoad>
            <Container>
              <CapsHeading color="#da1e28">Capture 4K UHD gameplay</CapsHeading>
              <Paragraph color="#ffffff">
                4K resolution means four times as many pixels as ordinary HD
                resolution - a massive difference. No detail will be missed when
                recording with RecordRig.
              </Paragraph>
            </Container>
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <StyledPlayer>
              <Player
                playsInline
                poster="/static/witcher_60fps_thumb.jpg"
                preload="metadata"
              >
                <source src="/static/witcher_60fps.mp4?v=1" />
                <BigPlayButton position="center" />
                <ControlBar disableCompletely />
              </Player>
            </StyledPlayer>
            <Container>
              <CapsHeading color="#da1e28">60 frames per second</CapsHeading>
              <Paragraph color="#ffffff">
                Your gameplay will look buttery smooth as it&apos;s captured at
                60 frames per second.
              </Paragraph>
            </Container>
          </Tile>
        </SubSection>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <LazyLoad offset={400}>
            <ReactCompareImage
              handleSize={64}
              leftImage="/static/god_of_war_compare_hdr_on.jpg?v=1"
              rightImage="/static/god_of_war_compare_hdr_off.jpg?v=1"
              sliderLineColor="#f2f4f8"
            />
          </LazyLoad>
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
        <SubSection>
          <Tile backgroundColor="#13171A">
            <LazyLoad offset={200}>
              <img
                alt=""
                src="/static/god_of_war_hdr_black.jpg?v=1"
                style={{ width: "100%", verticalAlign: "bottom" }}
              />
            </LazyLoad>
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
            <LazyLoad offset={200}>
              <img
                alt=""
                src="/static/god_of_war_hdr_white.jpg?v=1"
                style={{ width: "100%", verticalAlign: "bottom" }}
              />
            </LazyLoad>
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
    <link rel="stylesheet" href="/static/video-react.css" />
  </StyledIndexPage>
);

export default IndexPage;

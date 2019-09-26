import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ReactCompareImage from "react-compare-image";
import OptimizedImage, { Image } from "../components/OptimizedImage";
import OptimizedVideo from "../components/OptimizedVideo";
import { CapsHeading, Heading, Paragraph } from "../components/Text";
import Section, {
  SectionIntro,
  SectionRow,
  SubSection
} from "../components/Section";
import Tile, { Container } from "../components/Tile";
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

const PositionedImage = styled.div`
  margin: 64px 0;
  text-align: center;

  > img {
    max-width: 96%;
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
      <Features
        texts={[
          "RecordRig is your dedicated gameplay recording PC.",
          "Hook it up to your Xbox, PS4 or even your gaming PC.",
          "Capture your gameplay videos in immersive 4K HDR quality.",
          "Stream directly to YouTube and Twitch, or save for later."
        ]}
      />
    </Section>
    <Section>
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
            <OptimizedVideo
              source="/static/witcher_60fps.mp4?v=1"
              thumbnail="/static/witcher_60fps_thumb.jpg?v=1"
            />
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
          <OptimizedImage
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
            <OptimizedImage
              hires={<Image src="/static/god_of_war_hdr_black.jpg?v=1" />}
              lowres={
                <Image src="/static/god_of_war_hdr_black_lowres.jpg?v=1" />
              }
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
            <OptimizedImage
              hires={<Image src="/static/god_of_war_hdr_white.jpg?v=1" />}
              lowres={
                <Image src="/static/god_of_war_hdr_white_lowres.jpg?v=1" />
              }
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
    <Section>
      <SectionRow>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <Container>
              <CapsHeading color="#24a148">
                Record 4K HDR on Xbox One X
              </CapsHeading>
              <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
            </Container>
            <OptimizedImage
              hires={<Image src="/static/controller-xbox.png?v=1" />}
              lowres={<Image src="/static/controller-xbox_lowres.png?v=1" />}
            />
          </Tile>
        </SubSection>
        <SubSection>
          <Tile backgroundColor="#13171A">
            <Container>
              <CapsHeading color="#24a148">
                Record 4K HDR on PS4 Pro
              </CapsHeading>
              <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
            </Container>
            <OptimizedImage
              hires={<Image src="/static/controller-ps4.png?v=1" />}
              lowres={<Image src="/static/controller-ps4_lowres.png?v=1" />}
            />
          </Tile>
        </SubSection>
      </SectionRow>
      <SectionRow>
        <Tile backgroundColor="#13171A">
          <OptimizedImage
            hires={<Image src="/static/windows-keyboard.jpg?v=1" />}
            lowres={<Image src="/static/windows-keyboard_lowres.jpg?v=1" />}
          />
          <Container>
            <CapsHeading color="#24a148">Record 4K HDR on PC</CapsHeading>
            <Paragraph color="#ffffff">Lorem ipsum.</Paragraph>
          </Container>
        </Tile>
      </SectionRow>
    </Section>
  </StyledIndexPage>
);

export default IndexPage;

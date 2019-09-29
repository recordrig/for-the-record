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
            <OptimizedVideo
              source="/static/witcher_60fps.mp4?v=1"
              thumbnail="/static/witcher_60fps_thumb.jpg?v=1"
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
            <OptimizedImage
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
            <OptimizedImage
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
    <Section>
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
            <OptimizedImage
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
            <OptimizedImage
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
          <OptimizedImage
            hires={<Image src="/static/windows-keyboard.jpg?v=1" />}
            lowres={<Image src="/static/windows-keyboard_lowres.jpg?v=1" />}
          />
        </Tile>
      </SectionRow>
    </Section>
    <Section>
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
              <OptimizedImage
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
  </StyledIndexPage>
);

export default IndexPage;

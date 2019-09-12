import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Heading from "../components/Heading";

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

const StyledSection = styled.div`
  padding-bottom: 160px;
  padding-top: 160px;
`;

const StyledIndexPage = styled.div`
  background-color: #000000;
`;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <StyledSection>
      <StyledSubHeading>RecordRig.</StyledSubHeading>
      <Heading
        center
        fontColor="#ffffff"
        selector={1}
        text="Record your gameplay in the highest quality."
      />
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
    </StyledSection>
  </StyledIndexPage>
);

export default IndexPage;

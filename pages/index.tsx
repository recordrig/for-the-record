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
  max-width: 296px;

  > p {
    border-top: 2px solid #868d95;
    font-size: 18px;
    line-height: 24px;
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

const StyledSubHeading = styled.div`
  color: #d5d9e0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const StyledIndexPage = styled.div`
  background-color: #000000;
`;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <StyledSubHeading>RecordRig.</StyledSubHeading>
    <Heading
      center
      fontColor="#ffffff"
      selector={1}
      text="Record your gameplay in the highest quality."
    />
    <img
      alt="RecordRig - a dedicated streaming PC."
      src="/static/recordrig.png"
    />
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
  </StyledIndexPage>
);

export default IndexPage;

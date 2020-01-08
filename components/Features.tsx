import React, { FunctionComponent } from "react";
import styled from "styled-components";

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
  color: #ffffff;

  > p {
    border-top: 2px solid #868d95;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 16px;
    padding-top: 16px;
  }
`;

interface FeatureProps {
  description: string;
  number: number;
}

const Feature: FunctionComponent<FeatureProps> = ({
  description,
  number
}: FeatureProps) => (
  <StyledFeature>
    <StyledFeatureNumber>{number}</StyledFeatureNumber>
    <p>{description}</p>
  </StyledFeature>
);

const StyledFeatures = styled.div`
  margin: 0 auto;
  overflow: auto;

  /* Render features below each other and centered on the screen. */
  @media (max-width: 575px) {
    > div {
      margin-left: auto;
      margin-right: auto;
      width: 296px;
    }

    /* Create some space in between features. Do not target the last feature
    as that would cause a larger visual spacing between Sections. */
    > div:nth-last-child(n + 2) {
      margin-bottom: 64px;
    }
  }

  @media (min-width: 576px) {
    /* Render features side by side. */
    > div {
      float: left;
    }

    /* Create some space in between features. Do not target the last TWO features
    as that would cause a larger visual spacing between Sections. */
    > div:nth-last-child(n + 3) {
      margin-bottom: 64px;
    }
  }

  @media (max-width: 767px) {
    > div p {
      font-size: 18px;
      line-height: 24px;
    }
  }

  /* Create medium spacing between features, as they are rendered side by side. */
  @media (min-width: 576px) and (max-width: 767px) {
    max-width: 560px;

    > div {
      width: 264px;
    }

    > div:nth-child(odd) {
      margin-right: 32px;
    }
  }

  /* Use larger spacings and feature contents. */
  @media (min-width: 768px) {
    max-width: 656px;

    > div {
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

interface FeaturesProps {
  texts: [string, string, string, string];
}

/**
 * Exactly four features that will render along with a number as a group. Side-by-side on large
 * screens; beneath each other on small ones.
 */
const Features: FunctionComponent<FeaturesProps> = ({
  texts
}: FeaturesProps) => (
  <StyledFeatures>
    {texts.map((text, i) => (
      <Feature description={text} number={i + 1} key={text.substring(0, 20)} />
    ))}
  </StyledFeatures>
);

export default Features;

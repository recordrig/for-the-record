import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import withRedux from "../../store/_withRedux";
import Section from "../../components/Section";
import Tile, { TileContainer } from "../../components/Tile";
import { Heading } from "../../components/Text";

const StyledRecordRigOptions = styled.div`
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    font-weight: bold;
  }

  button {
    background-color: #0062ff;
    border-radius: 2px;
    border: 0;
    color: #ffffff;
    cursor: pointer;
    display: block;
    font-size: 18px;
    height: 48px;
    margin-top: 12px;
    outline: none;
    text-decoration: none;
    width: 100%;
  }

  @media (max-width: 399px) {
    p {
      font-size: 18px;
    }
  }

  @media (min-width: 399px) and (max-width: 655px) {
    p {
      font-size: 24px;
    }
  }

  @media (max-width: 655px) {
    margin-top: 64px;

    > div {
      margin-bottom: 12px;
    }

    img {
      max-width: 60%;
    }

    p {
      font-weight: bold;
      margin-bottom: 24px;
    }

    span {
      margin-top: 24px;
    }
  }

  @media (min-width: 656px) {
    display: flex;
    margin-top: 128px;
    margin-left: -8px;
    margin-right: -8px;

    > div {
      margin-left: 8px;
      margin-right: 8px;
    }

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    p {
      font-weight: bold;
      margin-bottom: 24px;
    }

    span {
      margin-top: 24px;
    }
  }

  @media (min-width: 656px) and (max-width: 1023px) {
    img {
      height: 240px;
    }

    p {
      font-size: 24px;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    margin-top: 128px;
    margin-left: -8px;
    margin-right: -8px;

    > div {
      margin-left: 8px;
      margin-right: 8px;
    }

    img {
      display: block;
      height: 350px;
      margin-left: auto;
      margin-right: auto;
    }

    p {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 24px;
    }

    span {
      margin-top: 24px;
    }
  }
`;

const StyledBuyRecordRigPage = styled.div``;

const BuyRecordRigPage: NextPage = () => (
  <StyledBuyRecordRigPage>
    <Section>
      <Heading center>Choose your RecordRig.</Heading>
      <StyledRecordRigOptions>
        <Tile>
          <TileContainer>
            <img alt="" src="/recordrig-black.png" />
            <p>
              RecordRig -&nbsp;
              <br />
              <i>Stealth Black</i>
            </p>
            <span>From € 2299</span>
            <button type="button">Select</button>
          </TileContainer>
        </Tile>
        <Tile>
          <TileContainer>
            <img alt="" src="/recordrig.png" />
            <p>
              RecordRig -&nbsp;
              <br />
              <i>Pristine White</i>
            </p>
            <span>From € 2299</span>
            <button type="button">Select</button>
          </TileContainer>
        </Tile>
      </StyledRecordRigOptions>
    </Section>
  </StyledBuyRecordRigPage>
);

export default withRedux(BuyRecordRigPage);

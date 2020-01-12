import React, { MouseEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
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

  a {
    background-color: #0062ff;
    border-radius: 2px;
    border: 0;
    color: #ffffff;
    cursor: pointer;
    display: block;
    font-size: 18px;
    height: 48px;
    line-height: 48px;
    margin-top: 12px;
    outline: none;
    text-align: center;
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

const StyledColorSelector = styled.div`
  a {
    border: 1px solid #121619;
    border-radius: 2px;
    outline: none;

    > span {
      position: relative;
      top: 30px;
    }
  }

  a:first-child {
    background-color: #121619;
  }

  a:last-child {
    background-color: #ffffff;
  }
`;

const StyledBuyRecordRigPage = styled.div``;

interface BuyRecordRigPageProps {
  description: string;
  heading: string;
  selectedColor: string | null;
  title: string;
}

/**
 * On client-side we link programmatically. Using this instead of Next's `Link` will also
 * prevent thepage from auto-scrolling to the top.
 */
const handleColorChangeClick = (href: string) => (e: MouseEvent) => {
  e.preventDefault();
  Router.push(href);
};

const BuyRecordRigPage: NextPage<BuyRecordRigPageProps> = ({
  description,
  heading,
  selectedColor,
  title
}) => {
  const stealthBlackHref = "/shop/buy-recordrig?color=stealth-black";
  const pristineWhiteHref = "/shop/buy-recordrig?color=pristine-white";

  return (
    <StyledBuyRecordRigPage>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Section>
        <Heading h={1} center={selectedColor === null}>
          {heading}
        </Heading>
        {selectedColor === null ? (
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
                <Link href={stealthBlackHref}>
                  <a>Select</a>
                </Link>
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
                <Link href={pristineWhiteHref}>
                  <a>Select</a>
                </Link>
              </TileContainer>
            </Tile>
          </StyledRecordRigOptions>
        ) : (
          <div style={{ marginTop: "64px", maxWidth: "calc(50% - 12px)" }}>
            <Tile>
              <TileContainer>
                <img
                  alt=""
                  style={{
                    display: "block",
                    margin: "0 auto",
                    maxWidth: "70%"
                  }}
                  src={
                    selectedColor === "stealth-black"
                      ? "/recordrig-black.png"
                      : "/recordrig.png"
                  }
                />
              </TileContainer>
            </Tile>
            <StyledColorSelector>
              <a
                href={stealthBlackHref}
                onClick={handleColorChangeClick(stealthBlackHref)}
                style={
                  selectedColor === "pristine-white"
                    ? { cursor: "pointer" }
                    : { cursor: "default" }
                }
              >
                <span>Stealth Black</span>
              </a>
              <a
                href={pristineWhiteHref}
                onClick={handleColorChangeClick(pristineWhiteHref)}
                style={
                  selectedColor === "stealth-black"
                    ? { cursor: "pointer" }
                    : { cursor: "default" }
                }
              >
                <span>Pristine White</span>
              </a>
            </StyledColorSelector>
          </div>
        )}
      </Section>
    </StyledBuyRecordRigPage>
  );
};

BuyRecordRigPage.getInitialProps = async ({ query }) => {
  const blackSelected = query.color === "stealth-black";
  const whiteSelected = query.color === "pristine-white";

  const getTitle = () => {
    if (blackSelected) return "Buy RecordRig in Stealth Black.";
    if (whiteSelected) return "Buy RecordRig in Pristine White.";
    return "Buy RecordRig - dedicated gameplay streaming PC.";
  };

  const getDescription = () => {
    if (blackSelected || whiteSelected)
      return "Fully customisable LEDs. Always equipped with a premium steel case and tempered glass.";
    return "Recording and streaming your gameplay in 4K 60FPS + HDR colours is possible with RecordRig high-end dedicated streaming PC. Buy now with free shipping.";
  };

  const getHeading = () => {
    if (blackSelected)
      return "Your new RecordRig - Stealth Black specs and options.";
    if (whiteSelected)
      return "Your new RecordRig - Pristine White specs and options.";
    return "Choose your RecordRig.";
  };

  const getColor = () => {
    if (blackSelected) return "stealth-black";
    if (whiteSelected) return "pristine-white";
    return null;
  };

  // Page contents that we want to be able to render server-side are listed here.
  // Aids SEO and non-JS browsers.
  const title = getTitle();
  const description = getDescription();
  const heading = getHeading();
  const selectedColor = getColor();

  return {
    description,
    heading,
    selectedColor,
    title
  };
};

export default withRedux(BuyRecordRigPage);

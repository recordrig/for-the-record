import React, { MouseEvent, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import withRedux from "../../store/_withRedux";
import { addProductAction } from "../../store/shoppingBag";
import Section, { SectionIntro } from "../../components/Section";
import Tile, { TileContainer } from "../../components/Tile";
import { Heading, SubHeading } from "../../components/Text";
import Footnotes from "../../components/Footnotes";

const StyledRecordRigOverview = styled.div`
  margin-top: 64px;

  ul {
    list-style-type: none;
    padding-left: 0;
    padding-top: 12px;

    li {
      padding-bottom: 16px;
    }
  }

  @media (max-width: 735px) {
    > div:last-child {
      margin-top: 192px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  @media (min-width: 736px) and (max-width: 1023px) {
    > div:last-child {
      box-sizing: border-box;
      display: flex;
      margin-top: 256px;
      max-width: 1216px;
      padding-left: 32px;
      padding-right: 32px;
      width: 100%;

      ul {
        margin-top: 0;
        padding-top: 0;
      }

      > div:first-child {
        flex-basis: 288px;
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    margin-left: -8px;
    margin-right: -8px;

    > div {
      margin-left: 8px;
      margin-right: 8px;
      width: 50%;
    }

    > div:last-child {
      box-sizing: border-box;
      padding-left: 42px;
    }
  }
`;

const StyledInTheBox = styled.div`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  img {
    max-width: 100%;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    padding-top: 32px;

    li {
      padding-bottom: 16px;
    }
  }

  @media (max-width: 735px) {
    margin-top: 128px;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;

    img {
      margin-top: 32px;
      width: 100%;
    }
  }

  @media (min-width: 736px) {
    display: flex;
    margin-top: 256px;
    max-width: 1216px;
    padding-left: 32px;
    padding-right: 32px;
    width: 100%;

    > div:first-child {
      flex-basis: 288px;
      flex-grow: 0;
      flex-shrink: 0;
    }

    > div:last-child {
      flex-grow: 1;
    }

    img {
      max-width: 700px;
      width: 100%;
    }

    ul {
      margin-top: 32px;
    }

    li {
      font-size: 18px;
    }
  }
`;

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
    margin-top: 64px;
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

interface StyledColorSelectorProps {
  selectedColor: string;
}

const StyledColorSelector = styled.a<StyledColorSelectorProps>`
  ${({ selectedColor }) => css`
    display: flex;
    justify-content: center;
    margin-top: 32px;

    a {
      border: 2px solid #697077;
      border-radius: 4px;
      color: #121619;
      display: inline-block;
      height: 42px;
      margin-right: 12px;
      outline: none;
      position: relative;
      text-decoration: none;
      width: 42px;

      &:after {
        border-style: solid;
        border-radius: 6px;
        border-width: 1px;
        content: "";
        display: block;
        height: 54px;
        left: -7px;
        position: absolute;
        top: -7px;
        width: 54px;
      }

      > span {
        display: block;
        left: -54px;
        position: relative;
        text-align: center;
        top: 60px;
        width: 150px;
      }
    }

    a:first-child {
      background-color: #121619;
      cursor: ${selectedColor === "pristine-white" ? "pointer" : "default"};

      &:after {
        border: 1px solid
          ${selectedColor === "pristine-white" ? "transparent" : "#4589ff"};
      }

      > span {
        opacity: ${selectedColor === "pristine-white" ? 0 : 1};
      }
    }

    a:last-child {
      background-color: #ffffff;
      cursor: ${selectedColor === "stealth-black" ? "pointer" : "default"};

      &:after {
        border: 1px solid
          ${selectedColor === "stealth-black" ? "transparent" : "#4589ff"};
      }

      > span {
        opacity: ${selectedColor === "stealth-black" ? 0 : 1};
      }
    }
  `}
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
 * prevent the page from auto-scrolling to the top.
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
  const dispatch = useDispatch();
  const addProduct = () => dispatch(addProductAction(`RR20-${selectedColor}`));

  const [addToBagColor, setAddToBagColor] = useState("#0062ff");

  const handleAddToBagClick = () => {
    setAddToBagColor("#a6c8ff");
    addProduct();
    setTimeout(() => {
      Router.push("/shop/checkout/information");
    }, 500);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const stealthBlackHref = "/shop/buy-recordrig?color=stealth-black";
  const pristineWhiteHref = "/shop/buy-recordrig?color=pristine-white";

  return (
    <StyledBuyRecordRigPage>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Section>
        <SectionIntro>
          <Heading h={1} center={selectedColor === null}>
            {heading}
          </Heading>
        </SectionIntro>
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
                <span>From € 2399</span>
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
                <span>From € 2399</span>
                <Link href={pristineWhiteHref}>
                  <a>Select</a>
                </Link>
              </TileContainer>
            </Tile>
          </StyledRecordRigOptions>
        ) : (
          <>
            <StyledRecordRigOverview>
              <div>
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
                <StyledColorSelector selectedColor={selectedColor}>
                  <a
                    href={stealthBlackHref}
                    onClick={handleColorChangeClick(stealthBlackHref)}
                  >
                    <span>Stealth Black</span>
                  </a>
                  <a
                    href={pristineWhiteHref}
                    onClick={handleColorChangeClick(pristineWhiteHref)}
                  >
                    <span>Pristine White</span>
                  </a>
                </StyledColorSelector>
              </div>
              <div>
                <div>
                  <SubHeading>Technical specifications</SubHeading>
                </div>
                <div>
                  <ul>
                    <li>
                      3.7GHz 8‑core AMD Ryzen 2700X CPU, Max Boost up to 4.3GHz,
                      with 4MB L2 cache and 16MB L3 cache, support for 16
                      threads (multithreading).
                    </li>
                    <li>
                      2TB high-speed SSD with 530MB/s sequential read speeds and
                      500MB/s sequential write speeds.<sup>1</sup>
                    </li>
                    <li>
                      8TB &quot;BigStorage&quot; 7200 RPM HDD, suitable for
                      storing hundreds of hours of recorded 4K video.
                    </li>
                    <li>
                      Nvidia GeForce® GTX 1650 SUPER™ WINDFORCE 4G Graphics,
                      Factory Overclocked (&quot;OC&quot;) or equivalent.
                      <sup>2</sup>
                    </li>
                    <li>
                      AVerMedia Live Gamer 4K GC573 internal game capture card
                      with support up to 4kp60 HDR, 1440p60 HDR, 1080p60 HDR,
                      1440p144, 1080p240 recording <em>and</em> pass-through.
                    </li>
                    <li>
                      Intel® 802.11ac WiFi Module, supports IEEE
                      802.11a/b/g/n/ac, Dual-Band (2.4/5 GHz), high speed
                      wireless connections up to 433Mbps.
                    </li>
                    <li>
                      Integrated Bluetooth 4.2 and/or 3.0 without need for an
                      external adapter.
                    </li>
                    <li>
                      Pre-installed and configured Microsoft Windows 10
                      (English).
                    </li>
                    <li>
                      Pre-installed and configured RECentral 4K 60FPS + HDR
                      gameplay recording and streaming software.
                    </li>
                    <li>
                      All-steel case body with tempered glass removable side
                      panel for easy-access to all core components.<sup>3</sup>
                    </li>
                    <li>Customisable RGB LEDs.</li>
                  </ul>
                </div>
              </div>
            </StyledRecordRigOverview>
            <div
              style={{
                marginTop: "128px"
              }}
            >
              <Tile>
                <TileContainer>
                  <div
                    style={{
                      backgroundImage: "url(/eu.png)",
                      backgroundPosition: "center 10px",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "236px",
                      textAlign: "center"
                    }}
                  >
                    <p
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        paddingBottom: "92px",
                        paddingTop: "92px"
                      }}
                    >
                      FREE DELIVERY
                      <br />
                      <span style={{ color: "#4d5358", fontSize: "24px" }}>
                        in the EU
                      </span>
                    </p>
                    <p
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        marginBottom: "12px"
                      }}
                    >
                      € 2.399,00
                    </p>
                    <button
                      onClick={handleAddToBagClick}
                      style={{
                        backgroundColor: addToBagColor,
                        borderRadius: "4px",
                        border: 0,
                        color: "#ffffff",
                        cursor: "pointer",
                        fontSize: "24px",
                        lineHeight: "64px",
                        maxWidth: "536px",
                        outline: "none",
                        textAlign: "center",
                        transition: "background-color 0.2s ease",
                        width: "100%"
                      }}
                      type="button"
                    >
                      Add to Bag
                    </button>
                  </div>
                </TileContainer>
              </Tile>
            </div>
            <StyledInTheBox>
              <div>
                <SubHeading>In the box</SubHeading>
              </div>
              <div>
                <img alt="" src="/in-the-box.svg" />
                <ul>
                  <li>
                    RecordRig dedicated streaming PC in{" "}
                    {selectedColor === "stealth-black"
                      ? "Stealth Black"
                      : "Pristine White"}
                  </li>
                  <li>Power cord for Type F plugs (European)</li>
                  <li>3 HDMI 2.1 (high-bandwith) cables</li>
                </ul>
              </div>
            </StyledInTheBox>
          </>
        )}
      </Section>
      {selectedColor !== null && (
        <Footnotes>
          <p>
            1. Rounded results of independent benchmark testing. Unrounded
            results are 527.29 MB/s read and 498.90 MB/s write. Supplier
            reported speeds are 550MB/s read and 520MB/s write. Performance may
            vary based on system hardware and configuration.
          </p>
          <p>
            2. Slotted graphics cards might vary. Graphics cards are selected
            based on performance and independent benchmark testing. Some traits
            are prioritised over others, e.g. Nvidia is our brand of choice due
            to RECentral&apos;s (gameplay recording software) capability of
            using these graphics card for better performance when recording.
            RecordRig always makes sure to slot a graphics card that performs
            well for RecordRig dedicated streaming PC&apos;s core use cases:
            recording and streaming in 4K 60FPS + HDR.
          </p>
          <p>
            3. Opening the case within the first year of buying will void your
            warranty. Upgradeability is mainly intended to be used after the
            1-year mark, to lessen the need to buy an entirely new system when
            some components start getting noticeably older in terms of
            performance compared to newer components.
          </p>
        </Footnotes>
      )}
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

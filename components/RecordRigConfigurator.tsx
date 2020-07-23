import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import products from "../data/products";
import { ShipmentTerms, WarrantyTerms, WithdrawalTerms } from "../data/terms";
import { formatCurrency } from "../utils/prices";
import Button from "./Button";
import { CheckIcon } from "./Icon";
import Footnotes from "./Footnotes";
import Section, { InfoSection } from "./Section";
import Tile, { TileContainer } from "./Tile";

// When on small screens, we must reserve bottom space for the overlaying "Add to Bag" section.
const GlobalStyle = createGlobalStyle`
  @media (max-width: 449px) {
    body {
      padding-bottom: 129px;
    }
  }

  @media (min-width: 450px) and (max-width: 549px) {
    body {
      padding-bottom: 138px;
    }
  }

  @media (min-width: 550px) and (max-width: 699px) {
    body {
      padding-bottom: 154px;
    }
  }

  @media (min-width: 700px) and (max-width: 1023px) {
    body {
      padding-bottom: 127px;
    }
  }
`;

const StyledList = styled.ul`
  color: #697077;
  font-weight: bold;
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 8px;
  }

  @media (max-width: 374px) {
    font-size: 10.5px;
  }

  @media (min-width: 375px) and (max-width: 449px) {
    font-size: 12px;
  }

  @media (min-width: 449px) and (max-width: 767px) {
    font-size: 13px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const StyledContent = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 128px;
  }
`;

interface StyledHeadingProps {
  readonly step2: boolean;
  readonly visible: boolean;
}

const StyledHeading = styled.div<StyledHeadingProps>`
  ${({ visible }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    h1,
    h2 {
      opacity: ${visible ? 1 : 0};
      text-align: center;
      transition: opacity 0.2s ease-in-out;
    }

    > div {
      position: relative;
      width: 100%;

      h2 {
        color: #a2a9b0;
        position: absolute;
        padding-bottom: 0;
        width: 100%;
      }
    }

    @media (max-width: 350px) {
      height: 64px;

      h1 {
        font-size: 16px;
      }

      h2 {
        bottom: -4px;
        font-size: 10px !important;
      }
    }

    @media (min-width: 350px) and (max-width: 767px) {
      height: 96px;

      h1 {
        font-size: 18px;
      }

      h2 {
        bottom: -7px;
        font-size: 11px !important;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      height: 128px;

      h1 {
        font-size: 24px;
      }

      h2 {
        bottom: -7px;
        font-size: 15px !important;
      }
    }

    @media (min-width: 1024px) and (max-width: 1279px) {
      height: 192px;

      h1 {
        font-size: 32px;
      }

      h2 {
        bottom: -7px;
        font-size: 18px !important;
      }
    }

    @media (min-width: 1280px) {
      height: 128px;
      max-width: 1216px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 32px;
      padding-right: 32px;
      padding-top: 96px;
      padding-bottom: 64px;

      h1 {
        font-size: 42px;
      }

      h2 {
        bottom: -3px;
        font-size: 18px !important;
      }
    }
  `}
`;

interface StyledOptionsProps {
  readonly step2: boolean;
}

const StyledOptions = styled.div<StyledOptionsProps>`
  /* Matches Tile's background color to make the transition between colours smooth. */
  ${({ step2 }) => css`
    background-color: ${step2 ? "#ffffff" : "transparent"};
    display: flex;
    position: relative; /* Necessary for children. Sticky in step2 on desktops. */
    transition-delay: 0.3s, 0.4s;
    transition-duration: 0.3s, 1s;
    transition-property: background-color, width;

    @media (max-device-width: 767px) and (orientation: portrait) {
      /* Total screen height minus two browser bars and two custom app bars/additional content. */
      height: calc(100vh - 256px);
      max-height: 300px;
      width: 100%;
    }

    /* For people with small devices who insist on using landscape orientation,
    we insist that they scroll if available height is not sufficient. */
    @media (max-device-width: 767px) and (orientation: landscape) {
      height: 300px;
      width: 100%;
    }

    @media (min-device-width: 768px) {
      height: calc(100vh - 320px);
      max-height: 512px;
      width: 100%;
    }

    @media (min-device-width: 768px) and (orientation: landscape) {
      min-height: 400px;
      width: 100%;
    }

    @media (min-width: 1024px) {
      position: ${step2 ? "sticky" : "relative"};
      top: ${step2 ? "64px" : 0};
      width: ${step2 ? "50% !important" : "100%"};
    }
  `}
`;

interface StyledOptionProps {
  readonly alignRight: boolean;
  readonly step2: boolean;
}

const StyledOption = styled.div<StyledOptionProps>`
  ${({ alignRight, step2 }) => css`
    height: 100%;
    margin-left: ${alignRight && "auto"};
    transition: width 0.4s ease-in-out;
    transition-delay: 0.4s;

    > div {
      height: 100%; /* Targets the Tile. */
    }

    @media (max-width: 350px) {
      width: ${step2 ? "100%" : "calc(50% - 4px)"};
    }

    @media (min-width: 351px) and (max-width: 767px) {
      width: ${step2 ? "100%" : "calc(50% - 8px)"};
    }

    @media (min-width: 768px) {
      width: ${step2 ? "100%" : "calc(50% - 16px)"};
    }
  `}
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: inherit;
  width: 100%;

  @media (max-width: 350px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (min-width: 350px) and (max-width: 767px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

interface StyledImageContainerProps {
  readonly largeImage: boolean;
  readonly visible: boolean;
}

const StyledImageContainer = styled.div<StyledImageContainerProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  transition: height 0.4s ease-in-out, opacity 0.2s ease-in-out;
  transition-delay: 0.4s, 0s;

  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
  `}

  img {
    display: block;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  ${({ largeImage }) => css`
    @media (max-width: 350px) {
      /* Total available card height minus other content heights. */
      height: calc(100% - ${largeImage ? "84px" : "114px"});

      img {
        max-width: calc(100% - 8px);
      }
    }

    @media (min-width: 350px) and (max-width: 767px) {
      height: calc(100% - ${largeImage ? "116px" : "148px"});

      img {
        max-width: calc(100% - 32px);
      }
    }

    @media (min-width: 768px) {
      height: calc(100% - ${largeImage ? "130px" : "194px"});

      img {
        max-width: calc(100% - 64px);
      }
    }
  `}
`;

interface StyledColorSelectorProps {
  readonly selectedColor: "black" | "white";
  readonly visible: boolean;
}

const StyledColorSelector = styled.div<StyledColorSelectorProps>`
  ${({ selectedColor, visible }) => css`
    display: flex;
    justify-content: center;
    margin-top: 32px;
    opacity: ${visible ? 1 : 0};
    position: absolute;
    top: 100%;
    transition: opacity 0.4s ease-in-out;
    transition-delay: 0.8s;
    width: 100%;

    button {
      background: none;
      border: 1px solid #a2a9b0;
      border-radius: 8px;
      color: #121619;
      display: inline-block;
      height: 46px;
      margin-right: 12px;
      outline: none;
      position: relative;
      text-decoration: none;
      width: 46px;

      &:after {
        border-style: solid;
        border-radius: 12px;
        border-width: 1px;
        content: "";
        display: block;
        height: 54px;
        left: -6px;
        position: absolute;
        top: -6px;
        transition: border-color 0.2s ease-in-out;
        width: 54px;
      }

      > span {
        display: block;
        font-size: 15px;
        left: -62px;
        position: relative;
        text-align: center;
        top: 60px;
        transition: opacity 0.2s ease-in-out;
        width: 150px;
      }
    }

    button:first-child {
      background-color: #121619;
      cursor: ${selectedColor === "white" ? "pointer" : "default"};

      &:after {
        border: 1px solid
          ${selectedColor === "white" ? "transparent" : "#0062ff"};
      }

      > span {
        opacity: ${selectedColor === "white" ? 0 : 1};
      }
    }

    button:last-child {
      background-color: #ffffff;
      cursor: ${selectedColor === "black" ? "pointer" : "default"};

      &:after {
        border: 1px solid
          ${selectedColor === "black" ? "transparent" : "#0062ff"};
      }

      > span {
        opacity: ${selectedColor === "black" ? 0 : 1};
      }
    }
  `}
`;

const StyledSelectButton = styled.button`
  background-color: #0062ff;
  border-radius: 16px;
  border-width: 0;
  color: #ffffff;
  cursor: pointer;
  float: right;
  font-weight: bold;
  outline: 0;
  text-transform: uppercase;

  @media (max-width: 350px) {
    font-size: 11px;
    height: 24px;
    margin-top: 16px;
    padding-left: 8px;
    padding-right: 8px;
  }

  @media (min-width: 350px) and (max-width: 767px) {
    font-size: 11px;
    height: 24px;
    margin-top: 28px;
    padding-left: 8px;
    padding-right: 8px;
  }

  @media (min-width: 768px) {
    font-size: 13px;
    height: 32px;
    margin-top: 28px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const StyledPrice = styled.span`
  display: inline-block;

  @media (max-width: 350px) {
    font-size: 11px;
    margin-top: 26px;
  }

  @media (min-width: 350px) and (max-width: 767px) {
    font-size: 13px;
    margin-top: 38px;
  }

  @media (min-width: 768px) {
    font-size: 15px;
    margin-top: 44px;
  }
`;

interface StyledDeviceContentProps {
  readonly visible: boolean;
}

const StyledDeviceContent = styled.div<StyledDeviceContentProps>`
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
    transition-delay: 1.2s, 0.8s;
    transition-duration: 0.5s, 0.5s;
    transition-property: opacity, width;

    h3 {
      margin-top: 32px;
    }

    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        color: #697077;
        font-size: 14px;
        margin-bottom: 12px;
      }
    }

    @media (max-width: 450px) {
      h3 {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }
    }

    @media (max-width: 699px) {
      padding-top: 192px;
      width: ${visible ? "100%" : "0%"};
    }

    @media (min-width: 700px) and (max-width: 1023px) {
      padding-left: 16px;
      padding-top: 192px;
      width: ${visible ? "calc(100% - 300px)" : "0%"};

      p,
      ul {
        left: 270px;
        position: relative;
        top: -42px;
      }
    }

    @media (min-width: 1024px) {
      width: ${visible ? "calc(50% - 48px)" : "0%"};
    }
  `}
`;

const StyledButtonWrapper = styled.div`
  @media (max-width: 1023px) {
    margin: 0 auto;
    width: calc(100vw - 16px);
  }

  @media (min-width: 700px) and (max-width: 1023px) {
    margin-left: auto;
    position: absolute;
    top: 40px;
    right: 16px;
    width: calc(100vw - 302px);
  }
`;

const StyledAddToBag = styled.div`
  h3 {
    margin-bottom: 6px;
  }

  p:first-of-type {
    color: #000000;
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 6px;
  }

  p {
    color: #697077;
    font-size: 14px;
    margin-bottom: 8px;

    span {
      color: #24a148;
      font-weight: bold;
    }
  }

  @media (max-width: 1023px) {
    background-color: #ffffff;
    border-top: 1px solid #dde1e6;
    bottom: 0;
    box-sizing: border-box;
    left: 0;
    padding: 4px 8px;
    position: fixed;
    width: 100vw;
    z-index: 1;

    h3 {
      margin-top: 12px;
      margin-bottom: 2px;
    }

    p {
      margin-top: 0;
      margin-bottom: 12px;
    }
  }

  @media (max-width: 699px) {
    p:first-of-type {
      position: absolute;
      right: 8px;
      top: 12px;
    }
  }

  @media (max-width: 449px) {
    h3 {
      font-size: 14px;
    }

    p:first-of-type {
      font-size: 24px;
    }

    p {
      font-size: 11px;
    }
  }

  @media (min-width: 450px) and (max-width: 1023px) {
    h3 {
      font-size: 18px;
    }

    p:first-of-type {
      font-size: 28px;
    }

    p {
      font-size: 14px;
    }
  }

  @media (min-width: 700px) and (max-width: 1023px) {
    height: 116px;
    padding-left: 16px;
    padding-right: 16px;

    p:first-of-type {
      left: 16px;
      position: absolute;
      top: 42px;
    }

    p {
      top: -26px;
    }
  }

  @media (min-width: 1024px) {
    background-color: #f2f4f8;
    border-bottom: 1px solid #c1c7cd;
    padding-top: 24px;
    padding-bottom: 24px;
    position: sticky;
    top: 64px;

    h3 {
      margin-top: 0;
    }

    &:after {
      background: linear-gradient(to bottom, #f2f4f8 0%, transparent 100%);
      bottom: -49px;
      content: "";
      display: block;
      height: 48px;
      position: absolute;
      width: 100%;
    }
  }
`;

interface StyledRecordRigConfiguratorProps {
  readonly step2: boolean;
}

const StyledRecordRigConfigurator = styled.div<
  StyledRecordRigConfiguratorProps
>`
  ${({ step2 }) => css`
    margin-top: 64px;

    h2 {
      display: ${step2 ? "none" : "block"};
      box-sizing: border-box;
      margin: 0;
    }

    /* Pretty much just legacy iPhone SE/5/very old Androids. */
    @media (max-width: 350px) {
      margin-left: 4px;
      margin-right: 4px;

      h2 {
        font-size: 13px;
        line-height: 16px;
        padding-top: 0px;
        padding-bottom: 8px;
      }
    }

    @media (min-width: 350px) and (max-width: 767px) {
      margin-left: 8px;
      margin-right: 8px;

      h2 {
        font-size: 14px;
        line-height: 18px;
        padding-top: 0px;
        padding-bottom: 17px;
      }
    }

    @media (min-width: 768px) {
      margin-left: auto;
      margin-right: auto;
      transition: width 0.3s;
      transition-delay: 0.7s;
      width: ${step2 ? "100%" : "700px"};

      h2 {
        font-size: 18px;
        line-height: 24px;
        padding-top: 7px;
        padding-bottom: 9px;
      }
    }

    @media (min-width: 1024px) {
      width: ${step2 ? "100%" : "700px"};
    }

    @media (min-width: 1248px) {
      width: ${step2 ? "1216px" : "700px"};
    }

    /* For people with small devices who insist on using landscape orientation,
    we'll just give the whole thing a fixed, smaller width to prevent ugly distortions. */
    @media (min-device-width: 351px) and (max-device-width: 767px) and (orientation: landscape) {
      margin-left: auto;
      margin-right: auto;
      width: 350px;
    }
  `}
`;

interface RecordRigConfiguratorProps {
  readonly addToBag: Function;
  /** Optional configuration starting point. */
  readonly configuration?: "black" | "white";
  /** After pressing once, the Add To Bag button shows as though it's disabled. Optionally add a handler incase the user clicks anyway. */
  readonly onAddToBagButtonDisabledClick?: Function;
  /** Optional callback function to be called when the colour changes. */
  readonly onSelectColor?: Function;
}

/**
 * RecordRig configurator displays RecordRig user options and device info. Lets the user
 * configure their device as they see fit.
 */
const RecordRigConfigurator: FunctionComponent<RecordRigConfiguratorProps> = ({
  addToBag,
  configuration = undefined,
  onSelectColor = undefined,
  onAddToBagButtonDisabledClick = undefined,
}) => {
  const [selectedColor, setSelectedColor] = useState(configuration);
  const blackChosen = selectedColor === "black";
  const whiteChosen = selectedColor === "white";
  const step2 = blackChosen || whiteChosen;
  const priceBlack = products["RR20-black"].price;
  const priceWhite = products["RR20-white"].price;

  const getHeading = (_configuration: "black" | "white" | null) => {
    if (_configuration === "black")
      return (
        <h1>
          Your&nbsp;RecordRig&nbsp;- <i>Stealth&nbsp;Black</i>
          <br />
          &nbsp;specs&nbsp;and&nbsp;options.
        </h1>
      );
    if (_configuration === "white")
      return (
        <h1>
          Your&nbsp;RecordRig&nbsp;- <i>Pristine&nbsp;White</i>
          <br />
          &nbsp;specs&nbsp;and&nbsp;options.
        </h1>
      );
    return (
      <div>
        <h1>Choose your RecordRig</h1>
        <h2>Dedicated gameplay streaming PC.</h2>
      </div>
    );
  };

  // Visually update the button to indicate to the user that it has indeed been pressed.
  const [addToBagButtonDisabled, setAddToBagButtonDisabled] = useState(false);

  const handleAddToBagClick = () => {
    // So long as the button isn't disabled (due to having been clicked previously), perform Add To Bag.
    if (!addToBagButtonDisabled) {
      setAddToBagButtonDisabled(true);
      addToBag(selectedColor);
    }

    // If the button has already been clicked, and we have a handler defined for this scenario, execute this handler.
    if (addToBagButtonDisabled && onAddToBagButtonDisabledClick) {
      onAddToBagButtonDisabledClick(selectedColor);
    }
  };

  const [heading, setHeading] = useState(getHeading(configuration || null));
  const [headingVisible, setHeadingVisible] = useState(true);
  const [renderBlack, setRenderBlack] = useState(!step2 || blackChosen);
  const [renderWhite, setRenderWhite] = useState(!step2 || whiteChosen);
  const [blackVisible, setBlackVisible] = useState(!step2 || blackChosen);
  const [whiteVisible, setWhiteVisible] = useState(!step2 || whiteChosen);
  const [deviceContentVisible, setDeviceContentVisible] = useState(step2);

  const handleColorChangeClick = (color: "black" | "white") => {
    setAddToBagButtonDisabled(false); // Back to default visual state.
    setSelectedColor(color);
    setHeadingVisible(false);
    setTimeout(() => setDeviceContentVisible(true), 300);
    setTimeout(() => setHeading(getHeading(color)), 300);
    setTimeout(() => setHeadingVisible(true), 500);
    setTimeout(() => setDeviceContentVisible(true), 500);

    if (color === "black") {
      setWhiteVisible(false);
      setTimeout(() => setRenderWhite(false), 400);
      setTimeout(() => setRenderBlack(true), 500);
      setTimeout(() => setBlackVisible(true), 550);
    } else {
      setBlackVisible(false);
      setTimeout(() => setRenderBlack(false), 400);
      setTimeout(() => setRenderWhite(true), 500);
      setTimeout(() => setWhiteVisible(true), 550);
    }

    if (onSelectColor) onSelectColor(color);
  };

  // Color selector initial rendering and visibility depends on initial config state.
  const [renderSelector, setRenderSelector] = useState(step2);
  const [selectorVisible, setSelectorVisible] = useState(step2);

  // Detect changes in state (after initial rendering) to determine transitions from step 1 to 2.
  useEffect(() => {
    if (step2 === true) {
      setRenderSelector(true);
      setTimeout(() => setSelectorVisible(true), 50);
    }
  }, [step2]);

  return (
    <StyledRecordRigConfigurator step2={step2}>
      <StyledHeading step2={step2} visible={headingVisible}>
        {heading}
      </StyledHeading>
      <StyledContent>
        <StyledOptions step2={step2}>
          {renderBlack && (
            <StyledOption
              alignRight={false}
              data-cy="option-black"
              step2={step2}
            >
              <Tile
                floating={!step2 && !blackChosen}
                clickHandler={
                  !step2 ? () => handleColorChangeClick("black") : undefined
                }
                rounded={!step2 && !blackChosen}
              >
                <StyledContentContainer>
                  <h2>
                    RecordRig -&nbsp;
                    <br />
                    <i>Stealth Black</i>
                  </h2>
                  <StyledImageContainer
                    largeImage={step2}
                    visible={blackVisible}
                  >
                    <img alt="" src="/recordrig-black.png" />
                  </StyledImageContainer>
                  {!step2 && (
                    <div>
                      <StyledPrice>
                        {formatCurrency(priceBlack, true)}
                      </StyledPrice>
                      <StyledSelectButton type="button">
                        Select
                      </StyledSelectButton>
                    </div>
                  )}
                </StyledContentContainer>
              </Tile>
            </StyledOption>
          )}
          {renderWhite && (
            <StyledOption alignRight data-cy="option-white" step2={step2}>
              <Tile
                floating={!step2 && !whiteChosen}
                clickHandler={
                  !step2 ? () => handleColorChangeClick("white") : undefined
                }
                rounded={!step2 && !whiteChosen}
              >
                <StyledContentContainer>
                  <h2>
                    RecordRig -&nbsp;
                    <br />
                    <i>Pristine White</i>
                  </h2>
                  <StyledImageContainer
                    largeImage={step2}
                    visible={whiteVisible}
                  >
                    <img alt="" src="/recordrig.png" />
                  </StyledImageContainer>
                  {!step2 && (
                    <div>
                      <StyledPrice>
                        {formatCurrency(priceWhite, true)}
                      </StyledPrice>
                      <StyledSelectButton type="button">
                        Select
                      </StyledSelectButton>
                    </div>
                  )}
                </StyledContentContainer>
              </Tile>
            </StyledOption>
          )}
          {renderSelector && (
            <StyledColorSelector
              selectedColor={selectedColor || "black"}
              visible={selectorVisible}
            >
              <button
                data-cy="switch-to-black"
                disabled={blackChosen}
                onClick={() => handleColorChangeClick("black")}
                type="button"
              >
                <span>Stealth Black</span>
              </button>
              <button
                data-cy="switch-to-white"
                disabled={whiteChosen}
                onClick={() => handleColorChangeClick("white")}
                type="button"
              >
                <span>Pristine White</span>
              </button>
            </StyledColorSelector>
          )}
        </StyledOptions>
        {step2 && (
          <StyledDeviceContent
            data-cy={`${selectedColor}-device-content`}
            visible={deviceContentVisible}
          >
            <h3>Product description</h3>
            <p>
              With RecordRig as your dedicated gameplay streaming and recording
              PC, you&apos;ll share your gameplay in 4K 60FPS and HDR colours
              with ease. Hook it up to your Xbox, PS4 or even your gaming PC and
              stream directly to YouTube and Twitch, or save up to hundreds of
              hours of UHD video for local use.
            </p>
            <StyledAddToBag data-cy={`${selectedColor}-add-to-bag`}>
              <h3>
                RecordRig in{" "}
                {selectedColor === "black" ? "Stealth Black" : "Pristine White"}
              </h3>
              <p>
                {selectedColor === "black"
                  ? formatCurrency(priceBlack)
                  : formatCurrency(priceWhite)}
              </p>
              <p>
                Expected delivery: within <span>14 days</span>
              </p>
              <StyledButtonWrapper>
                <Button
                  clicked={addToBagButtonDisabled}
                  cypressId="add-to-bag-button"
                  onClick={() => handleAddToBagClick()}
                >
                  {addToBagButtonDisabled ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          height: "32px",
                          marginRight: "4px",
                          position: "relative",
                          top: "8px",
                          width: "32px",
                        }}
                      >
                        <CheckIcon color="#24a148" />
                      </span>
                      Added To Bag
                    </>
                  ) : (
                    "Add to Bag"
                  )}
                </Button>
              </StyledButtonWrapper>
            </StyledAddToBag>
            <h3>Technical specifications</h3>
            <ul>
              <li>
                3.7GHz 8‑core AMD Ryzen 2700X Processor, Max Boost up to 4.3GHz
              </li>
              <li>2TB high-speed SSD storage</li>
              <li>8TB &quot;BigStorage&quot; 7200 RPM HDD</li>
              <li>16GB (2x8) DDR4 DRAM memory</li>
              <li>
                NVIDIA GeForce® graphics card<sup>1</sup>
              </li>
              <li>AVerMedia Live Gamer 4K GC573 internal game capture card</li>
              <li>
                Pre-installed and configured Microsoft Windows 10 (English)
              </li>
              <li>
                Pre-installed and configured RECentral 4K 60FPS + HDR gameplay
                recording and streaming software
              </li>
              <li>
                All-steel case body with tempered glass removable side panel for
                easy-access to all core components<sup>2</sup>
              </li>
              <li>Customisable RGB LEDs</li>
            </ul>
            <ShipmentTerms />
            <WarrantyTerms />
            <WithdrawalTerms />
          </StyledDeviceContent>
        )}
      </StyledContent>
      {step2 && (
        <>
          <Section>
            <Tile backgroundColor="#dde1e6">
              <TileContainer>
                <InfoSection>
                  <div>
                    <h3>In the box</h3>
                  </div>
                  <div>
                    <img
                      alt=""
                      src={`/in-the-box-${blackChosen ? "black" : "white"}.svg`}
                      style={{
                        marginBottom: "64px",
                        maxWidth: "600px",
                        width: "100%",
                      }}
                    />
                    <StyledList>
                      <li>
                        RecordRig dedicated streaming PC in{" "}
                        {blackChosen ? "Stealth Black" : "Pristine White"}
                      </li>
                      <li>Power cord for Type F plugs (European)</li>
                      <li>3 HDMI 2.1 (high-bandwith) cables</li>
                    </StyledList>
                  </div>
                </InfoSection>
              </TileContainer>
            </Tile>
          </Section>
          <Footnotes>
            <div style={{ margin: "0 8px" }}>
              <p>
                1. Slotted graphics cards might vary. Graphics cards are
                selected based on performance and independent benchmark testing.
                Some traits are prioritised over others, e.g. Nvidia is our
                brand of choice due to RECentral&apos;s (gameplay recording
                software) capability of using these graphics card for better
                performance when recording. RecordRig always makes sure to slot
                a graphics card that performs well for RecordRig dedicated
                streaming PC&apos;s core use cases: recording and streaming in
                4K 60FPS + HDR.
              </p>
              <p>
                2. Opening the case will void your warranty. Upgradeability is
                mainly intended to be used when your warranty has expired, to
                lessen the need to buy an entirely new system when some
                components start getting noticeably older in terms of
                performance compared to newer components.
              </p>
            </div>
          </Footnotes>
        </>
      )}
      <GlobalStyle />
    </StyledRecordRigConfigurator>
  );
};

export default RecordRigConfigurator;

import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Tile from "./Tile";

const StyledContent = styled.div``;

interface StyledHeadingProps {
  readonly visible: boolean;
}

const StyledHeading = styled.div<StyledHeadingProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: normal;
    text-align: center;
    transition: opacity 0.2s ease-in-out;
  }

  ${({ visible }) => css`
    h1 {
      opacity: ${visible ? 1 : 0};
    }
  `}

  @media (max-width: 350px) {
    height: 64px;

    h1 {
      font-size: 16px;
    }
  }

  @media (min-width: 350px) and (max-width: 767px) {
    height: 64px;

    h1 {
      font-size: 16px;
    }
  }

  @media (min-width: 768px) {
    height: 128px;

    h1 {
      font-size: 24px;
    }
  }
`;

interface StyledOptionsProps {
  readonly step2: boolean;
}

const StyledOptions = styled.div<StyledOptionsProps>`
  /* Matches Tile's background color to make the transition between colours smooth. */
  ${({ step2 }) => css`
    background-color: ${step2 ? "#ffffff" : "transparent"};
    transition: background-color 0.2s;
    transition-delay: 0.3s;
  `}

  display: flex;
  position: relative; /* Necessary for children. */

  @media (max-device-width: 767px) and (orientation: portrait) {
    /* Total screen height minus two browser bars and two custom app bars/additional content. */
    height: calc(100vh - 256px);
    max-height: 300px;
  }

  /* For people with small devices who insist on using landscape orientation,
  we insist that they scroll if available height is not sufficient. */
  @media (max-device-width: 767px) and (orientation: landscape) {
    height: 300px;
  }

  @media (min-device-width: 768px) {
    height: calc(100vh - 320px);
    max-height: 512px;
  }

  @media (min-device-width: 768px) and (orientation: landscape) {
    min-height: 400px;
  }
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
      border: 2px solid #697077;
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
        left: -8px;
        position: absolute;
        top: -8px;
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
        border: 2px solid
          ${selectedColor === "white" ? "transparent" : "#4589ff"};
      }

      > span {
        opacity: ${selectedColor === "white" ? 0 : 1};
      }
    }

    button:last-child {
      background-color: #ffffff;
      cursor: ${selectedColor === "black" ? "pointer" : "default"};

      &:after {
        border: 2px solid
          ${selectedColor === "black" ? "transparent" : "#4589ff"};
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

interface StyledRecordRigConfiguratorProps {
  readonly step2: boolean;
}

const StyledRecordRigConfigurator = styled.div<
  StyledRecordRigConfiguratorProps
>`
  ${({ step2 }) => css`
    padding-bottom: 128px; /* Reserves space for color selection buttons. */
    max-width: 902px;

    h2 {
      display: ${step2 ? "none" : "block"};
      box-sizing: border-box;
      margin: 0;
    }

    /* Pretty much just legacy iPhone SE/5/very old Androids. */
    @media (max-width: 350px) {
      margin: 0 4px;

      h2 {
        font-size: 14px;
        line-height: 18px;
        padding-top: 8px;
        padding-bottom: 12px;
      }
    }

    @media (min-width: 350px) and (max-width: 767px) {
      margin: 0 8px;

      h2 {
        font-size: 14px;
        line-height: 18px;
        padding-top: 8px;
        padding-bottom: 22px;
      }
    }

    @media (min-width: 768px) {
      margin: 0 auto;
      width: 700px;

      h2 {
        font-size: 18px;
        line-height: 24px;
        padding-top: 12px;
        padding-bottom: 16px;
      }
    }

    /* For people with small devices who insist on using landscape orientation,
    we'll just give the whole thing a fixed, smaller width to prevent ugly distortions. */
    @media (min-device-width: 351px) and (max-device-width: 767px) and (orientation: landscape) {
      margin: 0 auto;
      width: 350px;
    }
  `}
`;

interface RecordRigConfiguratorProps {
  /** Optional configuration starting point. */
  readonly configuration?: "black" | "white";
}

/**
 * RecordRig configurator displays RecordRig user options and device info. Lets the user
 * configure their device as they see fit.
 */
const RecordRigConfigurator: FunctionComponent<RecordRigConfiguratorProps> = ({
  configuration = undefined
}) => {
  const [selectedColor, setSelectedColor] = useState(configuration);
  const blackChosen = selectedColor === "black";
  const whiteChosen = selectedColor === "white";
  const step2 = blackChosen || whiteChosen;

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
    return <h1>Choose your RecordRig.</h1>;
  };

  const [heading, setHeading] = useState(getHeading(configuration || null));
  const [headingVisible, setHeadingVisible] = useState(true);
  const [renderBlack, setRenderBlack] = useState(!step2 || blackChosen);
  const [renderWhite, setRenderWhite] = useState(!step2 || whiteChosen);
  const [blackVisible, setBlackVisible] = useState(!step2 || blackChosen);
  const [whiteVisible, setWhiteVisible] = useState(!step2 || whiteChosen);

  const handleColorChangeClick = (color: "black" | "white") => {
    setSelectedColor(color);
    setHeadingVisible(false);
    setTimeout(() => setHeading(getHeading(color)), 300);
    setTimeout(() => setHeadingVisible(true), 500);

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
      <StyledHeading visible={headingVisible}>{heading}</StyledHeading>
      <StyledContent>
        <StyledOptions step2={step2}>
          {renderBlack && (
            <StyledOption alignRight={false} step2={step2}>
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
                      <StyledPrice>€ 2399</StyledPrice>
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
            <StyledOption alignRight step2={step2}>
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
                      <StyledPrice>€ 2399</StyledPrice>
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
                onClick={() => handleColorChangeClick("black")}
                type="button"
              >
                <span>Stealth Black</span>
              </button>
              <button
                onClick={() => handleColorChangeClick("white")}
                type="button"
              >
                <span>Pristine White</span>
              </button>
            </StyledColorSelector>
          )}
        </StyledOptions>
      </StyledContent>
    </StyledRecordRigConfigurator>
  );
};

export default RecordRigConfigurator;

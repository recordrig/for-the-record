import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Tile from "./Tile";

interface StyledContentProps {
  readonly step2: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
  display: flex;
  min-height: 240px;

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
  readonly chosen: boolean;
  readonly step2: boolean;
}

const StyledOption = styled.div<StyledOptionProps>`
  ${({ chosen, step2 }) => css`
    display: ${chosen || !step2 ? "block" : "none"};
    height: 100%;

    > div {
      height: 100%; /* Targets the Tile. */
    }

    @media (max-width: 350px) {
      width: ${chosen && step2 ? "100%" : "calc(50% - 4px)"};

      &:last-child {
        margin-left: ${chosen && step2 ? "0px" : "8px"};
      }
    }

    @media (min-width: 351px) and (max-width: 767px) {
      width: ${chosen && step2 ? "100%" : "calc(50% - 8px)"};

      &:last-child {
        margin-left: ${chosen && step2 ? "0px" : "16px"};
      }
    }

    @media (min-width: 768px) {
      width: ${chosen && step2 ? "100%" : "calc(50% - 16px)"};

      &:last-child {
        margin-left: ${chosen && step2 ? "0px" : "32px"};
      }
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

const StyledImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    display: block;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 350px) {
    /* Total available card height minus other content heights. */
    height: calc(100% - 114px);

    img {
      max-width: calc(100% - 8px);
    }
  }

  @media (min-width: 350px) and (max-width: 767px) {
    height: calc(100% - 148px);

    img {
      max-width: calc(100% - 32px);
    }
  }

  @media (min-width: 768px) {
    height: calc(100% - 194px);

    img {
      max-width: calc(100% - 64px);
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
    max-width: 902px;

    h1 {
      font-weight: normal;
      text-align: center;
    }

    h2 {
      display: ${step2 ? "none" : "block"};
      box-sizing: border-box;
      margin: 0;
    }

    span {
      display: ${step2 ? "none" : "inline-block"};
    }

    button {
      background-color: #0062ff;
      border-radius: 16px;
      border-width: 0;
      color: #ffffff;
      display: ${step2 ? "none" : "inline-block"};
      float: right;
      font-weight: bold;
      outline: 0;
      text-transform: uppercase;
    }

    /* Pretty much just legacy iPhone SE/5/very old Androids. */
    @media (max-width: 350px) {
      margin: 0 4px;

      h1 {
        font-size: 16px;
        height: 56px;
        line-height: 56px;
      }

      h2 {
        font-size: 14px;
        line-height: 18px;
        padding-top: 8px;
        padding-bottom: 12px;
      }

      span {
        font-size: 11px;
        margin-top: 26px;
      }

      button {
        font-size: 11px;
        height: 24px;
        margin-top: 16px;
        padding-left: 8px;
        padding-right: 8px;
      }
    }

    @media (min-width: 350px) and (max-width: 767px) {
      margin: 0 8px;

      h1 {
        font-size: 16px;
        height: 56px;
        line-height: 56px;
      }

      h2 {
        font-size: 14px;
        line-height: 18px;
        padding-top: 8px;
        padding-bottom: 22px;
      }

      span {
        font-size: 13px;
        margin-top: 38px;
      }

      button {
        font-size: 11px;
        height: 24px;
        margin-top: 28px;
        padding-left: 8px;
        padding-right: 8px;
      }
    }

    @media (min-width: 768px) {
      margin: 0 auto;
      width: 700px;

      h1 {
        font-size: 24px;
        height: 92px;
        line-height: 92px;
      }

      h2 {
        font-size: 18px;
        line-height: 24px;
        padding-top: 12px;
        padding-bottom: 16px;
      }

      span {
        font-size: 15px;
        margin-top: 44px;
      }

      button {
        font-size: 13px;
        height: 32px;
        margin-top: 28px;
        padding-left: 12px;
        padding-right: 12px;
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
  const step2 = configuration !== undefined;
  const blackChosen = configuration === "black";
  const whiteChosen = configuration === "white";
  return (
    <StyledRecordRigConfigurator step2={step2}>
      <h1>Choose your RecordRig.</h1>
      <StyledContent step2={step2}>
        <StyledOption chosen={blackChosen} step2={step2}>
          <Tile floating={!blackChosen} rounded={!blackChosen}>
            <StyledContentContainer>
              <h2>
                RecordRig -&nbsp;
                <br />
                <i>Stealth Black</i>
              </h2>
              <StyledImageContainer>
                <img alt="" src="/recordrig-black.png" />
              </StyledImageContainer>
              <div>
                <span>€ 2399</span>
                <button type="button">Select</button>
              </div>
            </StyledContentContainer>
          </Tile>
        </StyledOption>
        <StyledOption chosen={whiteChosen} step2={step2}>
          <Tile floating={!whiteChosen} rounded={!whiteChosen}>
            <StyledContentContainer>
              <h2>
                RecordRig -&nbsp;
                <br />
                <i>Pristine White</i>
              </h2>
              <StyledImageContainer>
                <img alt="" src="/recordrig.png" />
              </StyledImageContainer>
              <div>
                <span>€ 2399</span>
                <button type="button">Select</button>
              </div>
            </StyledContentContainer>
          </Tile>
        </StyledOption>
      </StyledContent>
    </StyledRecordRigConfigurator>
  );
};

export default RecordRigConfigurator;

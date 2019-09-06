import React, { FunctionComponent } from "react";
import styled from "styled-components";
import MainMenu from "./MainMenu";

const StyledAddress = styled.p`
  @media (max-width: 767.9999px) {
    margin-left: 40px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
    margin-left: 82px;
  }
`;

const StyledLogo = styled.div`
  @media (max-width: 767.9999px) {
    > img {
      height: 32px;
      width: 123px;
    }
  }

  @media (min-width: 768px) {
    > img {
      height: 64px;
      width: 246px;
    }
  }
`;

const PositionedMainMenu = styled.div`
  @media (max-width: 767.9999px) {
    margin-left: 40px;
  }

  @media (min-width: 768px) {
    float: right;
    margin-left: 8px;
    width: 50%;
  }
`;

const StyledInfo = styled.div`
  @media (max-width: 767.9999px) {
    margin-top: 64px;
  }

  @media (min-width: 768px) {
    float: left;
    margin-top: 16px;
  }
`;

const StyledFooter = styled.div`
  margin-bottom: 64px;
`;

const Footer: FunctionComponent = () => (
  <StyledFooter>
    <PositionedMainMenu>
      <MainMenu />
    </PositionedMainMenu>
    <StyledInfo>
      <StyledLogo>
        <img alt="" src="/static/recordrig-logo.png" />
      </StyledLogo>
      <StyledAddress>
        Industrieweg 46
        <br />
        6541 TW Nijmegen
        <br />
        The Netherlands
      </StyledAddress>
    </StyledInfo>
  </StyledFooter>
);

export default Footer;

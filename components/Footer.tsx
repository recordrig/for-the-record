import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Link from "next/link";
import MainMenu from "./MainMenu";

const StyledAddress = styled.p`
  @media (max-width: 767px) {
    margin-left: 40px;
    padding-bottom: 64px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
    padding-bottom: 128px;
    margin-left: 82px;
  }
`;

const StyledLogo = styled.div`
  @media (max-width: 767px) {
    > img {
      height: 32px;
    }
  }

  @media (min-width: 768px) {
    > img {
      height: 64px;
    }
  }
`;

const PositionedMainMenu = styled.div`
  @media (max-width: 767px) {
    margin-left: 40px;
  }

  @media (min-width: 768px) {
    margin-left: 8px;
    width: 50%;
  }
`;

const StyledInfo = styled.div`
  @media (max-width: 767px) {
    margin-top: 64px;
  }

  @media (min-width: 768px) {
    margin-top: 16px;
    width: 50%;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  margin: 64px auto 0;
  max-width: 1216px;
  padding-left: 16px;
  padding-right: 16px;

  a,
  a:visited {
    color: #000000;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    padding-bottom: 32px;
  }
`;

const Footer: FunctionComponent = () => (
  <StyledFooter>
    <PositionedMainMenu>
      <MainMenu />
    </PositionedMainMenu>
    <StyledInfo>
      <StyledLogo>
        <img alt="" src="/recordrig-logo.png" />
      </StyledLogo>
      <StyledAddress>
        Industrieweg 46
        <br />
        6541TW Nijmegen
        <br />
        The Netherlands
      </StyledAddress>
      <span
        style={{
          color: "#4d5358",
          fontSize: "12px",
          paddingBottom: "32px"
        }}
      >
        <Link href="/terms" passHref>
          <a>Terms and Conditions</a>
        </Link>{" "}
        &nbsp;•&nbsp;
        <Link href="/privacy" passHref>
          <a>Privacy</a>
        </Link>{" "}
        &nbsp;•&nbsp;
        <Link href="/cookies" passHref>
          <a>Cookies</a>
        </Link>
      </span>
      <br />
      <span
        style={{
          color: "#4d5358",
          fontSize: "12px",
          paddingBottom: "32px"
        }}
      >
        RecordRig is a trade name by DC Development, registered with the
        Netherlands Chamber of Commerce - KvK&nbsp;ID&nbsp;67196802 -
        Tax&nbsp;ID&nbsp;NL002217700B75.
      </span>
    </StyledInfo>
  </StyledFooter>
);

export default Footer;

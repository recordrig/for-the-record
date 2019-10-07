import Link from "next/link";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledLogo = styled.a`
  display: block;
  height: 32px;
  margin-bottom: 12px;
  margin-top: 12px;
  padding-bottom: 4px;
  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;

  > img {
    height: 32px;
    width: 123px;
  }

  @media (max-width: 767px) {
    overflow: hidden;
    margin-left: 4px;
    width: 32px;
  }

  @media (min-width: 768px) {
    margin-left: 8px;
  }
`;

const StyledTopMenu = styled.nav`
  background-color: #fff;
  height: 64px;
  width: 100%;

  > ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  > ul > li :first-child {
    margin-right: auto;
  }
`;

const MenuBar: FunctionComponent = () => (
  <StyledTopMenu>
    <ul>
      <li>
        <Link href="/" passHref>
          <StyledLogo>
            <img alt="" src="/recordrig-logo.png" />
          </StyledLogo>
        </Link>
      </li>
    </ul>
  </StyledTopMenu>
);

export default MenuBar;

import Link from "next/link";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  color: #000;
  font-size: 24px;
  height: 64px;
  line-height: 64px;
  text-decoration: none;

  > img {
    height: 16px;
    margin-left: 8px;
    width: 19px;
  }

  > span {
    vertical-align: top;
  }
`;

const StyledExternalLink = styled.a`
  color: #000;
  font-size: 24px;
  height: 64px;
  line-height: 64px;
  text-decoration: none;

  > img {
    height: 16px;
    margin-left: 8px;
    width: 16px;
  }

  > span {
    vertical-align: top;
  }
`;

const StyledMainMenu = styled.nav`
  height: 100%;
  width: 100%;

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

const MainMenu: FunctionComponent = () => (
  <StyledMainMenu>
    <ul>
      <li>
        <Link href="/" passHref>
          <StyledLink>
            <span>Home</span>
            <img alt="" src="/icon-arrow-right.png" />
          </StyledLink>
        </Link>
      </li>
      <li>
        <Link href="/shop" passHref>
          <StyledExternalLink>
            <span>Shop</span>
            <img alt="" src="/icon-arrow-up-right.png" />
          </StyledExternalLink>
        </Link>
      </li>
      <li>
        <Link href="/contact" passHref>
          <StyledLink>
            <span>Contact</span>
            <img alt="" src="/icon-arrow-right.png" />
          </StyledLink>
        </Link>
      </li>
    </ul>
  </StyledMainMenu>
);

export default MainMenu;

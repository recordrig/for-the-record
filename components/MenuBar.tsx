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

  @media (max-width: 767.9999px) {
    overflow: hidden;
    margin-left: 4px;
    width: 32px;
  }

  @media (min-width: 768px) {
    margin-left: 8px;
  }
`;

const StyledShopButton = styled.a`
  border: 1px solid #0062ff;
  color: #0062ff;
  display: block;
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  padding-left: 19px;
  padding-right: 19px;
  padding-bottom: 13px;
  padding-top: 11px;
  margin-bottom: 11px;
  margin-top: 11px;
  margin-right: 16px;
  text-decoration: none;
`;

const StyledBagIndicator = styled.span`
  background-color: #ff4e28;
  border-radius: 100%;
  color: #fff;
  height: 16px;
  font-size: 12px;
  font-weight: bold;
  left: 22px;
  line-height: 16px;
  position: absolute;
  top: 20px;
  width: 16px;
`;

const StyledShoppingBagButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 40px;
  line-height: 22px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 9px;
  padding-top: 7px;
  position: relative; /* For the number indicator. */
  margin-bottom: 12px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 12px;
  outline: 0;

  > img {
    height: 22px;
    margin-right: 8px;
    width: 26px;
  }

  @media (max-width: 767.9999px) {
    overflow: hidden;
    width: 42px;
  }
`;

const StyledMenuButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 40px;
  line-height: 20px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 9px;
  padding-top: 7px;
  margin-bottom: 12px;
  margin-left: 8px;
  margin-top: 12px;
  outline: 0;

  > img {
    height: 20px;
    margin-right: 8px;
    width: 24px;
  }

  @media (max-width: 767.9999px) {
    overflow: hidden;
    margin-right: 4px;
    width: 40px;
  }

  @media (min-width: 768px) {
    margin-right: 8px;
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

type MenuBarProps = {
  itemsInBag?: number;
};

const MenuBar: FunctionComponent<MenuBarProps> = ({
  itemsInBag
}: MenuBarProps) => (
  <StyledTopMenu>
    <ul>
      <li>
        <Link href="/" passHref>
          <StyledLogo>
            <img alt="" src="/static/recordrig-logo.png" />
          </StyledLogo>
        </Link>
      </li>
      <li>
        <Link href="/shop" passHref>
          <StyledShopButton>Shop</StyledShopButton>
        </Link>
      </li>
      <li>
        <StyledShoppingBagButton>
          <img alt="" src="/static/icon-shopping-bag.png" />
          <span>Shopping Bag</span>
          {itemsInBag && itemsInBag > 0 && (
            <StyledBagIndicator>{itemsInBag}</StyledBagIndicator>
          )}
        </StyledShoppingBagButton>
      </li>
      <li>
        <StyledMenuButton>
          <img alt="" src="/static/icon-menu.png" />
          <span>Menu</span>
        </StyledMenuButton>
      </li>
    </ul>
  </StyledTopMenu>
);

export default MenuBar;

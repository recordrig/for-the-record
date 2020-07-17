import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { ArrowRightIcon, MenuIcon, ShoppingBagIcon } from "./Icon";
import Button from "./Button";
import Drawer from "./Drawer";
import MainMenu from "./MainMenu";
import ProductList from "./ProductList";

const StyledLogo = styled.a`
  display: block;
  height: 32px;
  margin-bottom: 12px;
  margin-top: 12px;
  margin-right: 8px;
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

const StyledTextLink = styled.a`
  color: #000000;
  display: inline-block;
  height: 48px;
  line-height: 48px;
  margin: 8px 0px;
  text-align: center;
  text-decoration: none;

  @media (max-width: 599px) {
    padding: 0 8px;
  }

  @media (min-width: 600px) {
    padding: 0 16px;
  }
`;

const StyledShopLink = styled.a`
  border: 1px solid #0062ff;
  border-radius: 4px;
  box-sizing: border-box;
  color: #0062ff;
  display: inline-block;
  height: 48px;
  line-height: 48px;
  margin: 8px 16px;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;

  @media (max-width: 575px) {
    margin-right: 8px;
  }
`;

const StyledButtonWrapper = styled.div`
  margin: 0 16px;
  width: calc(100% - 32px);
`;

const StyledReviewBagLink = styled.a`
  color: #000000;
  font-size: 15px;
  text-align: center;
`;

const ShoppingBagMenuItem = styled.li`
  line-height: 64px;

  > button {
    background: none;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    font-size: 16px;
    line-height: 64px;
    outline: none;
    margin: 0;
    padding: 0 16px 0 43px;
    text-align: left;
  }

  > button > span {
    display: inline-block;
    margin-right: 6px;
    position: relative;
    right: 32px;
    top: 10px;
    z-index: -1; /* Fixes issue with icon part of button not being clickable. */
  }

  @media (max-width: 575px) {
    button {
      font-size: 0;
      padding: 0 4px 0 42px;
    }
  }
`;

const StyledMenuButton = styled.li`
  line-height: 64px;

  > button {
    background: none;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    font-size: 16px;
    line-height: 64px;
    outline: none;
    margin: 0;
    padding: 0 16px 0 10px;
    text-align: left;
  }

  > button > span {
    height: 32px;
    margin-right: 8px;
    padding-top: 16px;
    position: relative;
    top: 10px;
  }

  @media (max-width: 575px) {
    button {
      font-size: 0;
      padding: 0 0 0 6px;
    }
  }
`;

const StyledMenuBar = styled.nav`
  background-color: #fff;
  height: 64px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1; /* Keep in mind Drawer uses 10, while AttentionSeeker (dark overlay for Drawer) uses 9. */

  a {
    text-decoration: none;
  }

  > ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 16px;
    }

    /* Shop button */
    li:nth-last-child(4) {
      margin-right: auto;
    }

    /* Hide some menu text links on small screens. */
    /* Tech Specs */
    @media (max-width: 360px) {
      li:nth-child(2) {
        visibility: hidden;
        width: 0;

        a {
          margin: 0;
          padding: 0;
        }
      }
    }

    /* Setup */
    @media (max-width: 480px) {
      li:nth-child(3) {
        visibility: hidden;
        width: 0;

        a {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
`;

interface MenuBarProps {
  readonly products: readonly {
    readonly id: string;
    readonly quantity: number;
  }[];
}

/**
 * Full width menu bar.
 */
const MenuBar: FunctionComponent<MenuBarProps> = ({ products }) => {
  const [openShoppingBag, setOpenShoppingBag] = useState(false);
  const toggleBagDrawer = () => setOpenShoppingBag(!openShoppingBag);

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenuDrawer = () => setOpenMenu(!openMenu);

  const amount = products
    .map(product => product.quantity)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  return (
    <>
      <StyledMenuBar>
        <ul>
          <li>
            <Link href="/" passHref>
              <StyledLogo>
                <img alt="" src="/recordrig-logo.png" />
              </StyledLogo>
            </Link>
          </li>
          <li>
            <Link href="/tech-specs" passHref>
              <StyledTextLink>Tech Specs</StyledTextLink>
            </Link>
          </li>
          <li>
            <Link href="/setup" passHref>
              <StyledTextLink>Setup Guide</StyledTextLink>
            </Link>
          </li>
          <li>
            <Link href="/shop/buy-recordrig" passHref>
              <StyledShopLink data-cy="menubar-shop-button">
                Shop
              </StyledShopLink>
            </Link>
          </li>
          <ShoppingBagMenuItem>
            <button onClick={toggleBagDrawer} type="button">
              <span>
                <ShoppingBagIcon amount={amount} />
              </span>
              Bag
            </button>
          </ShoppingBagMenuItem>
          <StyledMenuButton>
            <button onClick={toggleMenuDrawer} type="button">
              <span>
                <MenuIcon />
              </span>
              Menu
            </button>
          </StyledMenuButton>
        </ul>
      </StyledMenuBar>
      <Drawer closeDrawer={toggleBagDrawer} open={openShoppingBag}>
        {products.length > 0 ? (
          <span>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                lineHeight: "32px",
                paddingLeft: "16px",
                position: "relative",
                marginBottom: "0",
                marginRight: "64px",
                marginTop: "0",
                textTransform: "uppercase",
                top: "10px"
              }}
            >
              Your Shopping Bag
            </p>
            <ProductList products={products} />
            <StyledButtonWrapper>
              <Button
                data-cy="menubar-shop-button"
                href="/shop/shopping-bag"
                onClick={() => toggleBagDrawer()}
              >
                Check Out
                <span
                  style={{
                    display: "inline-block",
                    height: "24px",
                    marginLeft: "8px",
                    position: "relative",
                    top: "6px",
                    width: "24px"
                  }}
                >
                  <ArrowRightIcon color="#ffffff" />
                </span>
              </Button>
            </StyledButtonWrapper>
            <p style={{ textAlign: "center" }}>
              <Link href="/shop/shopping-bag" passHref>
                <StyledReviewBagLink onClick={() => toggleBagDrawer()}>
                  Review Bag
                </StyledReviewBagLink>
              </Link>
            </p>
          </span>
        ) : (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ padding: "64px 0 16px", textAlign: "center" }}>
              Your Shopping Bag is empty.
            </p>
            <StyledButtonWrapper>
              <Button
                href="/shop/buy-recordrig"
                onClick={() => toggleBagDrawer()}
              >
                Shop RecordRig
                <span
                  style={{
                    display: "inline-block",
                    height: "24px",
                    marginLeft: "8px",
                    position: "relative",
                    top: "6px",
                    width: "24px"
                  }}
                >
                  <ArrowRightIcon color="#ffffff" />
                </span>
              </Button>
            </StyledButtonWrapper>
          </div>
        )}
      </Drawer>
      <Drawer closeDrawer={toggleMenuDrawer} open={openMenu}>
        <div style={{ padding: "16px 32px" }}>
          <MainMenu />
        </div>
      </Drawer>
    </>
  );
};

export default MenuBar;

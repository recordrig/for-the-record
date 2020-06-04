import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import ArrowRightIcon from "./ArrowRightIcon";
import Drawer from "./Drawer";
import ProductList from "./ProductList";
import ShoppingBagIcon from "./ShoppingBagIcon";

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
`;

const StyledButtonLink = styled.a`
  background-color: #0062ff;
  border-radius: 4px;
  border-bottom: 2px solid #0043ce;
  box-sizing: border-box;
  color: #ffffff;
  display: block;
  height: 64px;
  font-size: 19px;
  line-height: 64px;
  margin: 0 16px;
  text-align: center;
  text-decoration: none;
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
    padding: 0 16px 0 40px;
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
      padding: 0 16px 0 32px;
    }
  }
`;

const StyledMenuBar = styled.nav`
  background-color: #fff;
  height: 64px;
  position: fixed;
  top: 0;
  width: 100%;

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

    li:first-child {
      margin-right: auto;
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

  const toggleDrawer = () => setOpenShoppingBag(!openShoppingBag);

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
            <Link href="/shop/buy-recordrig" passHref>
              <StyledShopLink>Shop</StyledShopLink>
            </Link>
          </li>
          <ShoppingBagMenuItem>
            <button onClick={toggleDrawer} type="button">
              <span>
                <ShoppingBagIcon amount={amount} />
              </span>
              Shopping Bag
            </button>
          </ShoppingBagMenuItem>
        </ul>
      </StyledMenuBar>
      <Drawer onClose={toggleDrawer} open={openShoppingBag}>
        {products.length > 0 ? (
          <>
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
            <Link href="/shop/checkout" passHref>
              <StyledButtonLink onClick={() => toggleDrawer()}>
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
              </StyledButtonLink>
            </Link>
            <p style={{ textAlign: "center" }}>
              <Link href="/shop/shopping-bag" passHref>
                <StyledReviewBagLink onClick={() => toggleDrawer()}>
                  Review Bag
                </StyledReviewBagLink>
              </Link>
            </p>
          </>
        ) : (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ padding: "64px 0 16px", textAlign: "center" }}>
              Your Shopping Bag is empty.
            </p>
            <Link href="/shop/buy-recordrig" passHref>
              <StyledButtonLink onClick={() => toggleDrawer()}>
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
              </StyledButtonLink>
            </Link>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default MenuBar;

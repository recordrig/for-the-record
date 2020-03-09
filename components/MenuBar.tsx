import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
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

const StyledCheckoutLink = styled.a`
  background-color: #0062ff;
  border-radius: 10px;
  box-sizing: border-box;
  color: #ffffff;
  display: block;
  height: 64px;
  font-size: 19px;
  line-height: 64px;
  margin: 0 8px;
  text-align: center;
  text-decoration: none;
  width: calc(100% - 16px);
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
    border-radius: 0;
    cursor: pointer;
    font-size: 16px;
    line-height: 64px;
    outline: none;
    padding: 0;
    text-align: left;
  }

  > button > span {
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 10px;
  }
`;

const StyledMenuBar = styled.nav`
  background-color: #fff;
  height: 64px;
  width: 100%;

  a {
    color: #000000;
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
 *
 * NB positioning within a page should be taken care of by the component that includes it.
 */
const MenuBar: FunctionComponent<MenuBarProps> = ({ products }) => {
  const [openShoppingBag, setOpenShoppingBag] = useState(false);

  const toggleDrawer = () => setOpenShoppingBag(!openShoppingBag);

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
          <ShoppingBagMenuItem>
            <button onClick={toggleDrawer} type="button">
              <span>
                <ShoppingBagIcon amount={0} />
              </span>
              Shopping Bag
            </button>
          </ShoppingBagMenuItem>
        </ul>
      </StyledMenuBar>
      <Drawer onClose={toggleDrawer} open={openShoppingBag}>
        {products.length > 0 ? (
          <>
            <ProductList products={products} />
            <Link href="/shop/checkout" passHref>
              <StyledCheckoutLink>
                Check Out <span style={{ fontSize: "20px" }}>&nbsp;&rarr;</span>
              </StyledCheckoutLink>
            </Link>
            <p style={{ textAlign: "center" }}>
              <Link href="/shop/shopping-bag" passHref>
                <StyledReviewBagLink>Review Bag</StyledReviewBagLink>
              </Link>
            </p>
          </>
        ) : (
          <p style={{ padding: "120px 0", textAlign: "center" }}>
            Your Shopping Bag is empty.
          </p>
        )}
      </Drawer>
    </>
  );
};

export default MenuBar;

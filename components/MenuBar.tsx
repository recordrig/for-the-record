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

const ShoppingBagMenuItem = styled.li`
  line-height: 64px;

  > a {
    display: inline-block;
  }

  > a > div {
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
  }

  > ul > li :first-child {
    margin-right: auto;
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
const MenuBar: FunctionComponent<MenuBarProps> = () => {
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
            <Link href="/shop/shopping-bag">
              <a>
                <div>
                  <ShoppingBagIcon amount={0} />
                </div>
                Shopping Bag
              </a>
            </Link>
          </ShoppingBagMenuItem>
        </ul>
      </StyledMenuBar>
      <Drawer onClose={toggleDrawer} open={openShoppingBag}>
        <ProductList products={[]} />
        <Link href="/shop/checkout">Check Out</Link>
        <Link href="/shop/shopping-bag">Review Bag</Link>
      </Drawer>
    </>
  );
};

export default MenuBar;

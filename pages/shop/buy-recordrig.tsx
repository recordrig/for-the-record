import React, { Component } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { connect } from "react-redux";
import { ShoppingBagProduct, addProductAction } from "../../store/shoppingBag";
import Drawer from "../../components/Drawer";
import ProductList from "../../components/ProductList";
import RecordRigConfigurator from "../../components/RecordRigConfigurator";

const StyledReviewBagLink = styled.a`
  background-color: #0062ff;
  border-radius: 10px;
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

const StyledContinueShoppingButton = styled.button`
  color: #000000;
  background: none;
  border: none;
  font-size: 15px;
  outline: none;
  text-align: center;
  text-decoration: underline;
`;

const StyledBuyRecordRigPage = styled.div`
  min-height: 100vh;
`;

interface BuyRecordRigPageProps {
  /** The addProduct function should update the Shopping Bag in global app state. */
  readonly addProduct: Function;
  /** The initially selected color, inferred from URL parameters. */
  readonly initialSelectedColor: string | null;
  /** Initial state of the Shopping Bag. */
  readonly shoppingBag: readonly ShoppingBagProduct[];
}

interface BuyRecordRigPageState {
  /** A Drawer which contains the Shopping Bag state, with links to the checkout and Bag overview. */
  readonly openDrawer: boolean;
}

/**
 * Gives the user various configuration options for RecordRigs, and lets users add their RecordRig
 * of choice to the Shopping Bag.
 *
 * This page supports the use of URL parameters to load the appropriate content.
 * This is to aid SEO and users favoriting pages. URL's start with `/shop/buy-recordrig`.
 * Without additional parameters, choices for both black and white are presented.
 * Additionally, this page might be loaded with either black or white preselected,
 * through `/shop/buy-recordrig?color=stealth-black` and `/shop/buy-recordrig?color=pristine-white`.
 */
class BuyRecordRigPage extends Component<
  BuyRecordRigPageProps,
  BuyRecordRigPageState
> {
  static async getInitialProps({ query }: NextPageContext) {
    const getInitialColor = () => {
      if (query.color === "stealth-black") return "black";
      if (query.color === "pristine-white") return "white";
      return null;
    };

    const initialSelectedColor = getInitialColor();

    return {
      initialSelectedColor
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    };
  }

  render() {
    const { addProduct, initialSelectedColor, shoppingBag } = this.props;

    const { openDrawer } = this.state;

    const toggleDrawer = () => this.setState({ openDrawer: !openDrawer });

    const blackSelected = initialSelectedColor === "black";
    const whiteSelected = initialSelectedColor === "white";

    const initialConfiguration = (() => {
      if (blackSelected) return "black";
      if (whiteSelected) return "white";
      return undefined;
    })();

    const title = (() => {
      if (blackSelected) return "Buy RecordRig in Stealth Black.";
      if (whiteSelected) return "Buy RecordRig in Pristine White.";
      return "Buy RecordRig - dedicated gameplay streaming PC.";
    })();

    // Force re-render when the browser's back or forward buttons are used to keep state in sync with URL.
    if (typeof window !== "undefined") {
      Router.beforePopState(({ as }) => {
        // eslint-disable-next-line no-restricted-globals
        location.href = as;
        return true;
      });
    }

    const stealthBlackHref = "/shop/buy-recordrig?color=stealth-black";
    const pristineWhiteHref = "/shop/buy-recordrig?color=pristine-white";

    // Update the visible URL whenever the colour changes to that users can favorite/share the page to their
    // configuration of choice.
    const onSelectColor = color => {
      if (color === "black")
        Router.push(stealthBlackHref, undefined, { shallow: true });
      if (color === "white")
        Router.push(pristineWhiteHref, undefined, { shallow: true });
    };

    const handleAddToBag = color => {
      const productId = `RR20-${color}`;
      // Update global state.
      addProduct(productId);
      // Open the drawer with links to the Checkout and Shopping Bag overview.
      toggleDrawer();
    };

    return (
      <StyledBuyRecordRigPage>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content="With RecordRig as your dedicated gameplay streaming and recording
              PC, you'll share your gameplay in 4K 60FPS and HDR colours
              with ease. Hook it up to your Xbox, PS4 or even your gaming PC and
              stream directly to YouTube and Twitch, or save up to hundreds of
              hours of UHD video for local use."
          />
        </Head>
        <RecordRigConfigurator
          addToBag={handleAddToBag}
          configuration={initialConfiguration}
          onSelectColor={onSelectColor}
        />
        <Drawer onClose={toggleDrawer} open={openDrawer}>
          <ProductList indicateAddition products={shoppingBag} />
          <Link href="/shop/shopping-bag" passHref>
            <StyledReviewBagLink onClick={() => toggleDrawer()}>
              I&apos;m ready to order
            </StyledReviewBagLink>
          </Link>
          <p style={{ textAlign: "center" }}>
            <StyledContinueShoppingButton onClick={() => toggleDrawer()}>
              Continue shopping
            </StyledContinueShoppingButton>
          </p>
        </Drawer>
      </StyledBuyRecordRigPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingBag: state.shoppingBag
  };
};

const mapDispatchToProps = {
  addProduct: addProductAction
};

const ConnectedBuyRecordRigPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyRecordRigPage);

export default ConnectedBuyRecordRigPage;

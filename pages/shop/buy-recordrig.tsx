import React, { Component } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { connect } from "react-redux";
import { ShoppingBagProduct, addProductAction } from "../../store/shoppingBag";
import ArrowRightIcon from "../../components/ArrowRightIcon";
import CheckmarkIcon from "../../components/CheckmarkIcon";
import Drawer from "../../components/Drawer";
import ProductList from "../../components/ProductList";
import RecordRigConfigurator from "../../components/RecordRigConfigurator";

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

const StyledContinueShoppingButton = styled.button`
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
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
  /** The page meta description. Depends on the selected color. */
  readonly description: string;
  /** A Drawer which contains the Shopping Bag state, with links to the checkout and Bag overview. */
  readonly openAddToBagDrawer: boolean;
  /** If the disabled Add To Bag button is pressed, we can help the user showing some info and outline potential actions. */
  readonly openAlreadyAddedDrawer: boolean;
  /** The page title. Depends on the selected color. */
  readonly title: string;
}

const getDescription = (color: "black" | "white" | null) => {
  if (color === "black" || color === "white")
    return `With RecordRig as your dedicated gameplay streaming and recording
  PC, you'll share your gameplay in 4K 60FPS and HDR colours
  with ease. Hook it up to your Xbox, PS4 or even your gaming PC and
  stream directly to YouTube and Twitch, or save up to hundreds of
  hours of UHD video for local use.`;
  return `Record in 4K HDR 60FPS with ease using RecordRig as your dedicated
  gameplay streaming and recordring PC.`;
};

const getTitle = (color: "black" | "white" | null) => {
  if (color === "black") return "Buy RecordRig in Stealth Black.";
  if (color === "white") return "Buy RecordRig in Pristine White.";
  return "Buy RecordRig - dedicated gameplay streaming PC.";
};

const handleRouteChange = url => {
  if (url === "/shop/buy-recordrig") {
    // eslint-disable-next-line no-restricted-globals
    location.href = url;
  }
};

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
      description: getDescription(props.initialSelectedColor),
      openAddToBagDrawer: false,
      openAlreadyAddedDrawer: false,
      title: getTitle(props.initialSelectedColor)
    };
  }

  componentDidMount() {
    // Force re-render when navigating to the Shop from one of the colours to keep state in sync with URL.
    Router.events.on("routeChangeStart", handleRouteChange);

    // Force re-render when the browser's back or forward buttons are used to keep state in sync with URL.
    Router.beforePopState(({ as }) => {
      // eslint-disable-next-line no-restricted-globals
      location.href = as;
      return true;
    });
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", handleRouteChange);
  }

  render() {
    const { addProduct, initialSelectedColor, shoppingBag } = this.props;
    const {
      description,
      openAddToBagDrawer,
      openAlreadyAddedDrawer,
      title
    } = this.state;

    const initialConfiguration = (() => {
      if (initialSelectedColor === "black") return "black";
      if (initialSelectedColor === "white") return "white";
      return undefined;
    })();

    // Update the visible URL whenever the colour changes to that users can favorite/share the page to their
    // configuration of choice.
    const onSelectColor = (color: "black" | "white") => {
      if (color === "black")
        Router.push("/shop/buy-recordrig?color=stealth-black", undefined, {
          shallow: true
        });
      if (color === "white")
        Router.push("/shop/buy-recordrig?color=pristine-white", undefined, {
          shallow: true
        });
      this.setState({ title: getTitle(color) });
      this.setState({ description: getDescription(color) });
    };

    const toggleAddToBagDrawer = () =>
      this.setState({ openAddToBagDrawer: !openAddToBagDrawer });

    const handleAddToBag = (color: "black" | "white") => {
      const productId = `RR20-${color}`;
      // Update global state.
      addProduct(productId);
      // Open the drawer with links to the Checkout and Shopping Bag overview.
      toggleAddToBagDrawer();
    };

    const toggleAlreadyAddedDrawer = () =>
      this.setState({ openAlreadyAddedDrawer: !openAlreadyAddedDrawer });

    return (
      <StyledBuyRecordRigPage>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <RecordRigConfigurator
          addToBag={handleAddToBag}
          configuration={initialConfiguration}
          onSelectColor={onSelectColor}
          onAddToBagButtonDisabledClick={toggleAlreadyAddedDrawer}
        />
        <Drawer onClose={toggleAddToBagDrawer} open={openAddToBagDrawer}>
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
            <span
              style={{
                bottom: "2px",
                display: "inline-block",
                height: "24px",
                marginRight: "8px",
                position: "relative",
                verticalAlign: "middle",
                width: "24px"
              }}
            >
              <CheckmarkIcon color="#24a148" type="filled" />
            </span>
            Almost yours
          </p>
          <ProductList indicateAddition products={shoppingBag} />
          <Link href="/shop/shopping-bag" passHref>
            <StyledButtonLink onClick={() => toggleAddToBagDrawer()}>
              I&apos;m ready to order
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
            <StyledContinueShoppingButton
              onClick={() => toggleAddToBagDrawer()}
            >
              Continue shopping
            </StyledContinueShoppingButton>
          </p>
        </Drawer>
        <Drawer
          onClose={toggleAlreadyAddedDrawer}
          open={openAlreadyAddedDrawer}
        >
          <p
            style={{ backgroundColor: "f1c21b", margin: "20px 48px 20px 20px" }}
          >
            <strong>
              &#9432;&nbsp; This item is already in your Shopping Bag.
            </strong>{" "}
            If you&apos;d like to order multiple, you can do so by
            reviewing/modifying your Shopping Bag contents.
          </p>
          <Link href="/shop/shopping-bag" passHref>
            <StyledButtonLink onClick={() => toggleAlreadyAddedDrawer()}>
              Review Shopping Bag
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
            <StyledContinueShoppingButton
              onClick={() => toggleAlreadyAddedDrawer()}
            >
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

import React, { Component } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { connect } from "react-redux";
import productsData from "../../data/products";
import { ShoppingBagProduct, addProductAction } from "../../store/shoppingBag";
import { ArrowRightIcon, CheckIcon, InfoIcon } from "../../components/Icon";
import Button from "../../components/Button";
import Drawer from "../../components/Drawer";
import ProductList from "../../components/ProductList";
import RecordRigConfigurator from "../../components/RecordRigConfigurator";

const StyledButtonWrapper = styled.div`
  padding-left: 16px;
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
  /** Informative Drawer opens when "Added to Bag" button is clicked again, showing this Product. */
  readonly alreadyAddedProductId: string;
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
      alreadyAddedProductId: "",
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
      alreadyAddedProductId,
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

    // All available product ID's as defined in our catalogue.
    const availableProductIds = Object.keys(productsData);

    const handleAddToBag = (color: "black" | "white") => {
      // Find the appropriate product ID in our catalogue based on passed properties we have
      // (currently, that's just a color: black or white). Should exist, or we don't add it.
      const productId = availableProductIds.find(id => id.endsWith(color));

      if (productId !== undefined) {
        // Update global state.
        addProduct(productId);

        // Open the drawer with links to the Checkout and Shopping Bag overview.
        toggleAddToBagDrawer();
      }
    };

    const toggleAlreadyAddedDrawer = () =>
      this.setState({ openAlreadyAddedDrawer: !openAlreadyAddedDrawer });

    const handleAlreadyAddedClick = (color: "black" | "white") => {
      const productId = availableProductIds.find(id => id.endsWith(color));

      if (productId !== undefined) {
        this.setState({ alreadyAddedProductId: productId });
        toggleAlreadyAddedDrawer();
      }
    };

    // Determine vertical space for Product List.
    const isLargeScreen =
      typeof window !== "undefined"
        ? window.matchMedia("(min-height: 800px)").matches
        : false;

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
          onAddToBagButtonDisabledClick={handleAlreadyAddedClick}
        />
        <Drawer closeDrawer={toggleAddToBagDrawer} open={openAddToBagDrawer}>
          <p
            data-cy="almost-yours"
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
              <CheckIcon color="#24a148" type="filled" />
            </span>
            Almost yours
          </p>
          <ProductList
            indicateAddition
            products={shoppingBag}
            showAmount={isLargeScreen ? 3 : 2}
          />
          <StyledButtonWrapper>
            <Button
              cypressId="ready-to-order"
              href="/shop/shopping-bag"
              onClick={() => toggleAddToBagDrawer()}
            >
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
            </Button>
          </StyledButtonWrapper>
          <p style={{ textAlign: "center" }}>
            <StyledContinueShoppingButton
              data-cy="continue-shopping"
              onClick={() => toggleAddToBagDrawer()}
            >
              Continue shopping
            </StyledContinueShoppingButton>
          </p>
        </Drawer>
        <Drawer
          closeDrawer={toggleAlreadyAddedDrawer}
          open={openAlreadyAddedDrawer}
        >
          <p
            style={{
              display: "flex",
              fontSize: "15px",
              margin: "16px 48px 16px 16px"
            }}
          >
            <span
              style={{
                height: "24px",
                marginBottom: "8px",
                width: "24px"
              }}
            >
              <InfoIcon color="#78a9ff" type="filled" />
            </span>
            <span style={{ marginLeft: "8px" }}>
              This item is already in your Shopping Bag. If you&apos;d like to
              order more, you can{" "}
              <Link href="/shop/shopping-bag">
                <a
                  onClick={() => toggleAlreadyAddedDrawer()}
                  style={{ color: "#0f62fe" }}
                >
                  review/modify your Shopping Bag.
                </a>
              </Link>
            </span>
          </p>
          <ProductList
            products={shoppingBag}
            showAmount={1}
            showFirstProductId={alreadyAddedProductId}
          />
          <StyledButtonWrapper>
            <Button
              cypressId="review-shopping-bag"
              href="/shop/shopping-bag"
              onClick={() => toggleAlreadyAddedDrawer()}
            >
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
            </Button>
          </StyledButtonWrapper>
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

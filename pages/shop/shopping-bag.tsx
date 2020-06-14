import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { connect } from "react-redux";
import productsData from "../../_data/products";
import {
  ShoppingBagProduct,
  removeProductAction,
  updateProductQuantityAction
} from "../../store/shoppingBag";
import ShoppingBag from "../../components/ShoppingBag";
import { extractPrices, formatCurrency, sumTotal } from "../../utils/prices";
import ArrowRightIcon from "../../components/ArrowRightIcon";
import Button from "../../components/Button";
import { CapsHeading } from "../../components/Text";
import Tile, { TileContainer } from "../../components/Tile";

const StyledShoppingBagPage = styled.div`
  > div {
    min-height: 70vh;
    padding-top: 128px;
    padding-bottom: 256px;
  }

  @media (max-width: 767px) {
    > div {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  @media (min-width: 768px) {
    > div > div {
      margin: 0 auto;
      max-width: 960px;
    }
  }
`;

interface ShoppingBagPageProps {
  readonly removeProduct: Function;
  readonly updateProductQuantity: typeof updateProductQuantityAction;
  readonly shoppingBag: readonly ShoppingBagProduct[];
}

const ShoppingBagPage: NextPage<ShoppingBagPageProps> = ({
  removeProduct,
  updateProductQuantity,
  shoppingBag
}) => {
  // The shoppingBag as received from global state stores ID's and quantity.
  // The ShoppingBag component additionally needs price information.
  const products = shoppingBag.map(product => ({
    ...product,
    price: productsData[product.id].price
  }));
  const prices = extractPrices(products);
  const total = products.length > 0 ? sumTotal(prices) : 0;

  return (
    <StyledShoppingBagPage>
      <Head>
        <title>Shopping Bag</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div>
        {shoppingBag.length > 0 ? (
          <div>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Your bag total is {formatCurrency(total)}.
            </p>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              Get free shipping on all EU orders.
            </p>
            <div style={{ margin: "0 auto", maxWidth: "450px" }}>
              <Button href="/shop/checkout">
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
            </div>
            <div style={{ marginTop: "128px" }}>
              <Tile>
                <TileContainer>
                  <div style={{ marginBottom: "24px" }}>
                    <CapsHeading>Your Shopping Bag.</CapsHeading>
                  </div>
                  <ShoppingBag
                    products={products}
                    updateProductQuantity={updateProductQuantity}
                    removeProduct={removeProduct}
                  />
                </TileContainer>
              </Tile>
            </div>
          </div>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>Your Shopping Bag is empty.</p>
          </>
        )}
      </div>
    </StyledShoppingBagPage>
  );
};

const mapStateToProps = ({ shoppingBag }) => ({
  shoppingBag
});

const mapDispatchToProps = {
  removeProduct: removeProductAction,
  updateProductQuantity: updateProductQuantityAction
};

const ConnectedShoppingBagPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingBagPage);

export default ConnectedShoppingBagPage;

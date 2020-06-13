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

const StyledShoppingBagPage = styled.div``;

interface ShoppingBagPageProps {
  readonly removeProduct: Function;
  readonly updateProductQuantity: Function;
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
      {shoppingBag.length > 0 ? (
        <div style={{ marginTop: "64px", marginBottom: "256px" }}>
          <div style={{ paddingTop: "64px", paddingBottom: "64px" }}>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Your bag total is {formatCurrency(total)}.
            </p>
            <p style={{ textAlign: "center" }}>
              Get free shipping on all EU orders.
            </p>
          </div>
          <ShoppingBag
            products={products}
            updateProductQuantity={updateProductQuantity}
            removeProduct={removeProduct}
          />
        </div>
      ) : (
        <div style={{ marginTop: "64px", marginBottom: "256px" }}>
          <div style={{ paddingTop: "64px", paddingBottom: "64px" }}>
            <p style={{ textAlign: "center" }}>Your bag is empty.</p>
          </div>
        </div>
      )}
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

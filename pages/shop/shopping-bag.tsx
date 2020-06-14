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

const StyledShoppingBagPage = styled.div`
  > div {
    background-color: #ffffff;
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
      max-width: 750px;
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
            <p style={{ paddingBottom: "64px", textAlign: "center" }}>
              Get free shipping on all EU orders.
            </p>
            <ShoppingBag
              products={products}
              updateProductQuantity={updateProductQuantity}
              removeProduct={removeProduct}
            />
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

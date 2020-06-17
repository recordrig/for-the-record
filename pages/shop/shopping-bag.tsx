import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { connect } from "react-redux";
import productsData from "../../data/products";
import {
  ShoppingBagProduct,
  removeProductAction,
  updateProductQuantityAction
} from "../../store/shoppingBag";
import ShoppingBag from "../../components/ShoppingBag";

const StyledShoppingBagPage = styled.div``;

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
  // The ShoppingBag component additionally needs price & name information.
  const products = shoppingBag.map(product => ({
    ...product,
    name: productsData[product.id].name,
    price: productsData[product.id].price
  }));

  return (
    <StyledShoppingBagPage>
      <Head>
        <title>Shopping Bag</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ShoppingBag
        products={products}
        updateProductQuantity={updateProductQuantity}
        removeProduct={removeProduct}
      />
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

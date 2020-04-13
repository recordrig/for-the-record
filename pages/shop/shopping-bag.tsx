import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  ShoppingBagProduct,
  removeProductAction,
  updateProductQuantityAction
} from "../../store/shoppingBag";
import Section, { SectionIntro } from "../../components/Section";
import ShoppingBag from "../../components/ShoppingBag";
import { Heading } from "../../components/Text";

const ShoppingBagContainer = ({
  removeProduct,
  updateProductQuantity,
  shoppingBag
}) => {
  // The shoppingBag as received from global state stores ID's and quantity.
  // The ShoppingBag component additionally needs price information.
  const products = shoppingBag.map(product => {
    return {
      ...product,
      price: 239900
    };
  });

  const prices = products.map(product => product.price * product.quantity);
  const total = prices.reduce((a, b) => a + b);

  return (
    <Section>
      <SectionIntro>
        <Heading center h={1}>
          Your bag total is {total}.
        </Heading>
        <p>Get free shipping on all EU orders.</p>
      </SectionIntro>
      <ShoppingBag
        products={products}
        updateProductQuantity={updateProductQuantity}
        removeProduct={removeProduct}
      />
    </Section>
  );
};

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
  return (
    <StyledShoppingBagPage>
      <Head>
        <title>Shopping Bag</title>
        <meta name="robots" content="noindex" />
      </Head>
      {shoppingBag.length > 0 ? (
        <ShoppingBagContainer
          removeProduct={removeProduct}
          updateProductQuantity={updateProductQuantity}
          shoppingBag={shoppingBag}
        />
      ) : (
        <Section>
          <p>Your bag is empty.</p>
        </Section>
      )}
    </StyledShoppingBagPage>
  );
};

const mapStateToProps = state => {
  return {
    shoppingBag: state.shoppingBag
  };
};

const mapDispatchToProps = {
  removeProduct: removeProductAction,
  updateProductQuantity: updateProductQuantityAction
};

const ConnectedShoppingBagPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingBagPage);

export default ConnectedShoppingBagPage;

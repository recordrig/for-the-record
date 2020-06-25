import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { connect } from "react-redux";
import { getStripe } from "../../utils/checkout";
import productsData from "../../data/products";
import {
  ShoppingBagProduct,
  removeProductAction,
  updateProductQuantityAction
} from "../../store/shoppingBag";
import ShoppingBag from "../../components/ShoppingBag";

async function fetchPostJSON(url: string, data?: {}) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
}

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

  const handleCheckout = async () => {
    const strippedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity
    }));

    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      products: strippedProducts
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!stripePublishableKey) {
      console.error(
        "Stripe publishable key was not found. Is NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY set in the env vars?"
      );
    }

    // Redirect to Checkout.
    const stripe = stripePublishableKey
      ? await getStripe(stripePublishableKey)
      : null;

    if (stripe === null) {
      console.error(
        "Stripe was not instantiated - cannot redirect to checkout."
      );
    } else {
      const { error } = await stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
    }
  };

  return (
    <StyledShoppingBagPage>
      <Head>
        <title>Shopping Bag</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ShoppingBag
        handleCheckout={handleCheckout}
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

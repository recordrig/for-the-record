// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import StripeTypes from "stripe";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  addNameToProducts,
  addPriceToProducts,
  validateProductIds
} from "./products";

// To make sure that we don't reinstate Stripe on every render, we use the singleton
// pattern to create/retrieve the Stripe instance.
//
// TODO: Figure out if this actually makes sense (example taken from integration guide,
// buuuut isn't it the case that as long as we do not explicitely import this `let`,
// the client will never use it, always executing `getStripe` as though `stripePromise`
// indeed does not exist?)
//
// eslint-disable-next-line functional/no-let
let stripePromise: Promise<Stripe | null>;

export const getStripe = (
  stripePublishableKey: string
): typeof stripePromise => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }

  return stripePromise;
};

// TODO: validateProductsForCheckout
// 1. Validate product quantities
// 2. Validate total price

/**
 * Fills and morphs the products array so that it is validated and its structure is
 * compatible with Stripe's checkout.
 */
export const prepareProductsForCheckout = (
  products: {
    id: string;
    quantity: number;
  }[],
  productsData: Record<
    string,
    {
      name: string;
      price: number;
    }
  >
): StripeTypes.Checkout.SessionCreateParams.LineItem[] => {
  validateProductIds(products, productsData);

  const productsWithNames = addNameToProducts(products, productsData);
  const productsWithPrices = addPriceToProducts(products, productsData);

  const completeProducts = products.map((_product, index) => ({
    ...productsWithNames[index],
    ...productsWithPrices[index],
    ...products[index]
  }));

  return completeProducts.map(product => ({
    price_data: {
      currency: "EUR",
      product_data: {
        name: product.name,
        metadata: {
          id: product.id
        },
        unit_amount: product.price
      }
    },
    quantity: product.quantity
  }));
};

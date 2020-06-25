// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import StripeTypes from "stripe";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { extractPrices, sumTotal } from "./prices";
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

/**
 * Fills the products array with name and price data based on ID's.
 */
export const completeProductsData = (
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
): {
  id: string;
  name: string;
  price: number;
  quantity: number;
}[] => {
  validateProductIds(products, productsData);

  const productsWithNames = addNameToProducts(products, productsData);
  const productsWithPrices = addPriceToProducts(products, productsData);

  return products.map((_product, index) => ({
    ...productsWithNames[index],
    ...productsWithPrices[index],
    ...products[index]
  }));
};

/**
 * Validates that:
 * 1. Products exist (ID match)
 * 2. Product quantities are within config limits
 * 3. Total price is within config limits
 */
export const validateProductsForCheckout = (
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[],
  productsData: Record<
    string,
    {
      name: string;
      price: number;
      quantityLimit: number;
    }
  >,
  totalPriceLimit: number
): void => {
  validateProductIds(products, productsData);

  const quantityValidationResults = products.map(product => ({
    product: product.id,
    quantity: product.quantity,
    quantityLimit: productsData[product.id].quantityLimit,
    quantityIsOk: !(product.quantity > productsData[product.id].quantityLimit)
  }));

  const prices = extractPrices(products);
  const totalPrice = sumTotal(prices);
  const totalPriceIsOk = !(totalPrice > totalPriceLimit);

  const productsWithQuantityErrors = quantityValidationResults.filter(
    product => !product.quantityIsOk
  );

  if (!totalPriceIsOk || productsWithQuantityErrors.length > 0) {
    throw new Error(
      "Product validation failed. Either the total price is too high, or product quantity limits are exceeded."
    );
  }
};

/**
 * Morphs the products array so that its structure is compatible with Stripe's checkout.
 * **Any data passed in is assumed to be valid and will not be checked.**
 */
export const structureProductsForCheckout = (
  validProducts: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[]
): StripeTypes.Checkout.SessionCreateParams.LineItem[] => {
  return validProducts.map(product => ({
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

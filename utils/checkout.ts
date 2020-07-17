// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import StripeTypes from "stripe";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { extractPrices, sumTotal, formatCurrency } from "./prices";
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
 * 2. Products do not have additional fields
 * 3. Total price is within limits
 * 4. Product quantities are within limits
 *
 * Throws an error if any of the above is inavlid. Does nothing otherwise.
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

  // We might not control where data is ultimately coming from - the whole reason we
  // are checking product validity is that we do not trust its source. Product could have
  // been passed from the frontend. As such, not even their fields are guaranteed to be
  // correct, therefore we must accept `any` input here and validate manually instead of
  // relying on type-checking alone.
  const validFields = ["id", "name", "price", "quantity"];

  products.forEach(product =>
    Object.keys(product).forEach(field => {
      if (!validFields.includes(field))
        throw new Error("Product fields are invalid.");
    })
  );

  const quantityValidationResults = products.map(product => ({
    product: product.id,
    quantity: product.quantity,
    quantityLimit: productsData[product.id].quantityLimit,
    quantityIsOk: !(product.quantity > productsData[product.id].quantityLimit)
  }));

  const prices = extractPrices(products);
  const totalPrice = sumTotal(prices);
  const totalPriceIsOk = !(totalPrice > totalPriceLimit);

  if (!totalPriceIsOk) throw new Error("Total price is invalid.");

  const productsWithQuantityErrors = quantityValidationResults.filter(
    product => !product.quantityIsOk
  );

  if (productsWithQuantityErrors.length > 0) {
    throw new Error("Product quantities are invalid.");
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
  // Since we don't store any product and therefore pricing data inside Stripe, we must create
  // new Stripe price and product objects inline.
  return validProducts.map(product => ({
    price_data: {
      currency: "eur",
      unit_amount: product.price,
      product_data: {
        name: product.name
      }
    },
    quantity: product.quantity
  }));
};

/**
 * Takes raw Stripe data and converts it to the data structure needed to send our confirmation
 * email. Should match the mock data as defined in SendGrid for the dynamic email template
 * called "Order confirmation".
 */
export const createOrderConfirmationEmailTemplate = (
  products: StripeTypes.ApiList<StripeTypes.LineItem>["data"],
  total: StripeTypes.PaymentIntent["amount"],
  customerEmail: StripeTypes.Charge.BillingDetails["email"],
  shippingInfo: {
    name: string;
    line1: string;
    line2?: string;
    postalCode: string;
    city: string;
    country: string;
  },
  billingInfo: {
    name: string;
    line1: string;
    line2?: string;
    postalCode: string;
    city: string;
    country: string;
  }
): {
  products: {
    name: string;
    amount: string | number;
    price: string;
    img: string;
  }[];
  total: string;
  customerEmail: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    postalCode: string;
    city: string;
    country: string;
  };
  billingAddress: {
    name: string;
    line1: string;
    line2?: string;
    postalCode: string;
    city: string;
    country: string;
  };
} => {
  const convertedProducts = products.map(product => ({
    name: product.description,
    amount: product.quantity || 1,
    price: formatCurrency(product.amount_total || 0),
    img: product.description.endsWith("lack")
      ? "https://recordrig.com/recordrig-black.png"
      : "https://recordrig.com/recordrig.png"
  }));

  return {
    products: convertedProducts,
    total: formatCurrency(total),
    customerEmail: customerEmail ?? "",
    shippingAddress: shippingInfo,
    billingAddress: billingInfo
  };
};

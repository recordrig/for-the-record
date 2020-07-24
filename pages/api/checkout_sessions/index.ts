import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Stripe from "stripe";
import countriesData from "../../../data/countries";
import productsData from "../../../data/products";
import { totalLimit } from "../../../data/checkout";
import {
  completeProductsData,
  validateProductsForCheckout,
  structureProductsForCheckout,
} from "../../../utils/checkout";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "Stripe secret key was not found. Is STRIPE_SECRET_KEY set in the env vars?"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const allowedCountries = Object.keys(
      countriesData
    ) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];

    try {
      // Counts on getting an array of ID's and quantity, nothing else.
      const passedProducts = req.body.products;

      // Uses the passed product ID's to collect the appropriate additional data like price, name.
      const completeProducts = completeProductsData(
        passedProducts,
        productsData
      );

      // Errors and prevents checkout if passed products do not match our records.
      validateProductsForCheckout(completeProducts, productsData, totalLimit);

      // Ready products collection for Stripe.
      const structuredProducts = structureProductsForCheckout(completeProducts);

      // Check order capacity. Throw error if 0 to reject order.
      const records = await base("order_capacity")
        .select({ maxRecords: 1, view: "Grid view" })
        .firstPage();

      const limit = records[0].get("limit");

      if (!(limit > 0))
        throw new Error("There is no capacity for taking on new orders.");

      // Ready all required parameters for Stripe.
      const params: Stripe.Checkout.SessionCreateParams = {
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: allowedCountries,
        },
        payment_method_types: [
          "giropay", // Germany
          "ideal", // Netherlands
          "p24", // Poland
          "eps", // Austria
          "bancontact", // Belgium
          "card", // Other
        ],
        line_items: structuredProducts,
        mode: "payment",
        success_url: `${req.headers.origin}/shop/purchase-result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shop/shopping-bag`,
      };

      // Create unique checkout session.
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      // Returns the session if it was successful. This session can then be used to redirect.
      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

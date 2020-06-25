import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import productsData from "../../../data/products";
import {
  completeProductsData,
  validateProductsForCheckout,
  structureProductsForCheckout
} from "../../../utils/checkout";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "Stripe secret key was not found. Is STRIPE_SECRET_KEY set in the env vars?"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const passedProducts = req.body.products;
      const completeProducts = completeProductsData(
        passedProducts,
        productsData
      );
      validateProductsForCheckout(completeProducts, productsData, 1000000);
      const structuredProducts = structureProductsForCheckout(completeProducts);

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card", "ideal", "bancontact", "giropay", "p24"],
        line_items: structuredProducts,
        mode: "payment",
        success_url: `${req.headers.origin}/shop/purchase-result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shop/purchase-result?session_id={CHECKOUT_SESSION_ID}`
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

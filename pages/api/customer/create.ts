import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a new customer and returns the complete customer object.
 */
export default async ({ body }, res): Promise<void> => {
  console.log("body:", body);
  // TODO: Validate input.

  const customer = await stripe.customers.create({
    email: "hardcoded@value.com"
  });
  console.log("customer:", customer);

  res.json(customer);
};

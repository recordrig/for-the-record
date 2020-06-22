import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

// To make sure that we don't reinstate Stripe on every render, we use the singleton
// pattern to create/retrieve the Stripe instance.
// eslint-disable-next-line functional/no-let
let stripePromise: Promise<Stripe | null>;
const getStripe = (stripePublishableKey: string): typeof stripePromise => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }

  return stripePromise;
};

export default getStripe;

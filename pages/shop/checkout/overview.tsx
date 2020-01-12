import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import absoluteUrl from "next-absolute-url";
import withRedux from "../../../store/_withRedux";
import Section from "../../../components/Section";

type CheckoutPageProps = {
  sessionId: string;
};

const CheckoutPage: NextPage<CheckoutPageProps> = ({
  sessionId
}: CheckoutPageProps) => {
  // TODO: Redirect to information page if customerId is not set.
  // useEffect(() => {
  //   if (!customerId) {
  //     Router.push("/shop/checkout/information");
  //   }
  // });

  /*
   * We assume that the Stripe client side script will be available in the
   * frontend so that we can set a state variable `stripe` that'll refer to
   * it. (If Stripe is not available, e.g. on the server side during SSR,
   * it'll be set to `null` instead.
   *
   * In this setup, `stripe` will refer to the current state value while
   * `setStripe` lets us update that value.
   */
  const [stripe, setStripe] = useState<Window["Stripe"] | null>(null);

  /*
   * Set our globally available Stripe object to our `stripe` state
   */
  useEffect(
    () => setStripe(window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)),
    []
  );

  const goToCheckout = (): void => {
    stripe
      .redirectToCheckout({
        sessionId
      })
      // Stripe uses `.then` for errors in this particular situation.
      .then(({ error }) => {
        console.error(`Stripe checkout redirect failed: "${error.message}"`);
      });
  };

  return (
    <Section>
      <button onClick={goToCheckout} type="button">
        Pay
      </button>
    </Section>
  );
};

CheckoutPage.getInitialProps = async ({ req }): Promise<CheckoutPageProps> => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/checkout/create`);
  const data = await res.json();

  return {
    sessionId: data.id
  };
};

export default withRedux(CheckoutPage);

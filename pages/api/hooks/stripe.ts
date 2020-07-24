import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import countriesData from "../../../data/countries";
import { createOrderConfirmationEmailTemplate } from "../../../utils/checkout";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || "";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] || "";

    // eslint-disable-next-line functional/no-let
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Return a response to acknowledge receipt of the event.
    // It is important to always send this response regardless of consequent handling
    // of the event. If an error happens at a later stage, Stripe will keep retrying
    // intermittently, possibly causing some things to execute multiple times.
    // For example, if Airtable order reduction succeeds but sending the confirmation
    // email does not, a failed confirmation email send will cause Stripe to interpret
    // this hook as having failed. When it then retries, the Airtable order reduction
    // would execute AGAIN, which isn't what we want.
    // In the future, we might opt to divide our hooks and post to other hooks to isolate
    // steps and features better, but for now, this is the most cost-efficient solution.
    // As an intermediate step we could integrate some advanced error logging mechanism...
    res.json({ received: true });

    if (event.type === "payment_intent.succeeded") {
      // Reduce order_capacity by 1.
      const records = await base("order_capacity")
        .select({ maxRecords: 1, view: "Grid view" })
        .firstPage();

      const { id } = records[0];
      const limit = records[0].get("limit");

      base("order_capacity").update(
        [
          {
            id,
            fields: {
              limit: limit - 1,
            },
          },
        ],
        function (err) {
          if (err) {
            console.error(err);
          }
        }
      );

      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const paymentIntentId = paymentIntent.id;

      // Find the relevant Checkout Session using the Payment Intent ID.
      // We'll use this to fetch the purchased products.
      const checkoutSessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const checkoutSessionId = checkoutSessions.data[0].id;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkoutSessionId
      );

      const total = paymentIntent.amount;

      const customerEmail = paymentIntent.charges.data[0].billing_details.email;

      const shippingName: Stripe.Checkout.Session.Shipping["name"] =
        paymentIntent.shipping?.name;

      const shippingAddress: Stripe.Address = paymentIntent.shipping
        ?.address as Stripe.Address;

      const shippingInfo = {
        name: shippingName ?? "",
        line1: shippingAddress.line1 ?? "",
        line2: shippingAddress.line2 ?? "",
        postalCode: shippingAddress.postal_code ?? "",
        city: shippingAddress.city ?? "",
        country:
          typeof shippingAddress.country === "string"
            ? countriesData[shippingAddress.country].name
            : "",
      };

      const billingName: Stripe.Charge.BillingDetails["name"] =
        paymentIntent.charges.data[0].billing_details.name;

      const billingAddress = paymentIntent.charges.data[0].billing_details
        .address as Stripe.Address;

      const billingInfo = {
        name: billingName ?? "",
        line1: billingAddress.line1 ?? "",
        line2: billingAddress.line2 ?? undefined,
        postalCode: billingAddress.postal_code ?? "",
        city: billingAddress.city ?? "",
        country:
          typeof billingAddress.country === "string"
            ? countriesData[billingAddress.country].name
            : "",
      };

      const products = lineItems.data;

      // Send order confirmation to customer.
      const orderConfirmationEmail = {
        from: {
          email: process.env.SENDGRID_FROM_ADDRESS || "", // Needs to be a verified email address or domain.
          name: "RecordRig",
        },
        replyTo: process.env.SENDGRID_FROM_ADDRESS || "",
        templateId: "d-a3990f818fbd431f8421eab7cb53764f", // Order confirmation template.
        personalizations: [
          {
            to: [
              {
                email: customerEmail ?? "",
                name: billingName ?? "",
              },
            ],
            dynamic_template_data: createOrderConfirmationEmailTemplate(
              products,
              total,
              customerEmail,
              shippingInfo,
              billingInfo
            ),
          },
        ],
      };

      // Send COPY of order confirmation to support.
      const orderConfirmationEmailCopy = {
        from: {
          email: process.env.SENDGRID_FROM_ADDRESS || "", // Needs to be a verified email address or domain.
          name: "RecordRig",
        },
        replyTo: process.env.SENDGRID_FROM_ADDRESS || "",
        templateId: "d-a3990f818fbd431f8421eab7cb53764f", // Order confirmation template.
        personalizations: [
          {
            to: [
              {
                email: process.env.SENDGRID_TO_ADDRESS ?? "",
                name: "RecordRig Support" ?? "",
              },
            ],
            dynamic_template_data: createOrderConfirmationEmailTemplate(
              products,
              total,
              customerEmail,
              shippingInfo,
              billingInfo
            ),
          },
        ],
      };

      await sgMail.send(orderConfirmationEmail);
      await sgMail.send(orderConfirmationEmailCopy);
    } else {
      // When testing locally and forwarding all events to this hander using the
      // Stripe CLI, this'll show up a lot in the logs. This is fine - we do not
      // intend to handle ALL events.
      // In our online running Test and Live applications, only SOME events are
      // actually sent to the application. These events are defined in the Stripe
      // dashboard, under "Webhooks".
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);

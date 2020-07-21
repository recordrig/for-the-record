# Advanced Setup

The application integrates with various other services. To use all functionalities including Check Out in your local environment, you should create personal test accounts for these services and put all required information in a file named `.env.local`. Keep reading for complete instructions per-service.

## Airtable

The application assumes certain table and field names to exist. So in Airtable, set up a table called `order_capacity` with a single column named `limit` holding a single record which is a `number` (`integer`). Prefill this field with a positive value if you want the application to process new orders via the Check Out.

Additionally, set the API keys and the Airtable Base you'd like to use on your `.env.local` file:

```
# Airtable
AIRTABLE_API_KEY=xyzxyzxyz
AIRTABLE_BASE_ID=kljkljklj
```

Now, the locally running version of the application will be able to check for available `order_capacity` inside Airtable anytime you place a mock order. Note that the application will also reduce this capacity anytime an order successfully completes - so if you do a lot of order placement testing, you might need to top up the value inside Airtable from time to time (if it's `0` the application will not Check Out).

## SendGrid

The application integrates with SendGrid to send emails at various stages in its logic (e.g. when someone uses the contact form). For local testing purposes, you'll need to set up __and verify__ a "from" address using SendGrid's [Single Sender Verification](https://sendgrid.com/docs/ui/sending-email/sender-verification) method and generate a SendGrid API key through the SendGrid dashboard. Additionally, decide on a custom "to" address so that you can receive all testing emails on an email address you can access. Then, set all of this information in `.env.local`:

```
# SendGrid
SENDGRID_API_KEY=abcabcabc
SENDGRID_FROM_ADDRESS=myemail@addressxyzxyzxyz.com
SENDGRID_TO_ADDRESS=myemail@addressxyzxyzxyz.com
```

Now, any testing emails sent out by the your local version of the application will use your SendGrid account and display your "from" address, while delivering to your "to" address. (Of course, for things such as order confirmations, this "to" address is not used but the address the "customer" has provided while ordering, instead.)

## Stripe

Though most of the Stripe integration will work simply by listing your API keys in the `.env.local` file, some additional setup needs to happen in order to be able to run webhooks locally. [Install the Stripe CLI](https://stripe.com/docs/stripe-cli) and login with your Stripe account. Next, start the webhook forwarding to send __all__ local Stripe events to this local handler:

```
stripe listen --forward-to localhost:3000/api/hooks/stripe
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file, along with the Stripe TEST keys which you can find in the Stripe dashboard:

```
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_12345
STRIPE_SECRET_KEY=sk_12345
STRIPE_WEBHOOK_SECRET=whsec_12345
```

Now, you will be able to complete the full checkout flow using the locally running version of the application, including creating mock payments and viewing order confirmation pages.

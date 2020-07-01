import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import StripeTypes from "stripe";
import { useDispatch, useSelector } from "react-redux";
import countriesData from "../../data/countries";
import productsData from "../../data/products";
import { checkoutAction } from "../../store/shoppingBag";
import { extractPrices, sumTotal } from "../../utils/prices";
import Notification from "../../components/Notification";
import PurchaseResult from "../../components/PurchaseResult";

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const StyledPurchaseResult = styled.div`
  > div {
    min-height: 70vh;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 80px;
    padding-bottom: 256px;
  }

  h2 {
    font-size: 28px;
    font-weight: normal;
    margin-top: 64px;
    margin-bottom: 0;
    padding-bottom: 8px;
    max-width: 576px;
  }

  @media (min-width: 576px) {
    > div {
      margin: 0 auto;
      max-width: 960px;
    }
  }
`;

/**
 * Adress content that we'll render for both shipping and billing information should always
 * contain all of these fields.
 */
interface AddressContent {
  name: string;
  line1: string;
  /** Optional field. If empty, it should still exist, just as an empty string (""). */
  line2: string;
  postalCode: string;
  city: string;
  country: string;
}

interface PurchaseResultPageProps {
  /** The addProduct function will empty the shopping bag. */
  readonly checkout: Function;
}

const PurchaseResultPage: NextPage<PurchaseResultPageProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialAddress: AddressContent = {
    name: "",
    line1: "",
    line2: "",
    postalCode: "",
    city: "",
    country: ""
  };

  const [shippingContent, setShippingContent] = useState(initialAddress);
  const [billingContent, setBillingContent] = useState(initialAddress);
  const [products, setProducts] = useState([]);
  const [mockTotal, setMockTotal] = useState(0);

  // Offline, the session ID should not be passed in the URL so that no fetch will be performed.
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  // In development or test environments we don't want to drag external API's into
  // the picture. So we'll set some mock data and get the product data from the Shopping Bag
  // state directly, before emptying it.
  if (process.env.NODE_ENV !== "production") {
    const mockAddress = {
      name: "Firstname Lastname",
      line1: "Somestreet 20",
      line2: "",
      postalCode: "ABAB 12",
      city: "Mycity",
      country: "Bestcountry"
    };

    // Offline, get data from the local Shopping Bag state directly instead of fetching it.
    const shoppingBagProducts = useSelector(state => state.shoppingBag);

    useEffect(() => {
      setBillingContent(mockAddress);
      setShippingContent(mockAddress);

      setProducts(
        shoppingBagProducts.map(product => ({
          name: productsData[product.id].name,
          quantity: product.quantity,
          price: productsData[product.id].price
        }))
      );
    }, []);

    useEffect(() => {
      if (products.length > 0) {
        setMockTotal(sumTotal(extractPrices(products)));
      } else {
        console.warn(
          "Looks like there are no products. If you'd like to view this page with some actual product data, first fill up the shopping bag, then check out."
        );
      }

      // Empty the shopping bag.
      dispatch(checkoutAction());
    }, [products]);
  } else {
    useEffect(() => {
      if (data?.checkout_session?.payment_intent?.status === "succeeded")
        dispatch(checkoutAction());
    }, [data]);

    useEffect(() => {
      if (data?.checkout_session?.payment_intent.shipping) {
        const shippingName: StripeTypes.Checkout.Session.Shipping["name"] =
          data.checkout_session.payment_intent.shipping.name;

        // The shipping address as fetched from Stripe. Through setting the type, we'll be warned
        // of any content compatibility issues when attempting to render the address. (We need all
        // fields to be defined, while Stripe does not guarantee that they are.)
        const shippingAddress: StripeTypes.Address =
          data.checkout_session.payment_intent.shipping.address;

        // Should take over data from Stripe IF SET. We'll put empty strings if the fields
        // weren't filled, so that we can still render all required information.
        setShippingContent({
          name: shippingName ?? "",
          line1: shippingAddress.line1 ?? "",
          line2: shippingAddress.line2 ?? "",
          postalCode: shippingAddress.postal_code ?? "",
          city: shippingAddress.city ?? "",
          country:
            typeof shippingAddress.country === "string"
              ? countriesData[shippingAddress.country].name
              : ""
        });
      }
    }, [data]);

    useEffect(() => {
      if (
        data?.checkout_session?.payment_intent.charges.data[0].billing_details
          .address
      ) {
        const billingName: StripeTypes.Charge.BillingDetails["name"] =
          data.checkout_session.payment_intent.charges.data[0].billing_details
            .name;

        const billingAddress: StripeTypes.Address =
          data?.checkout_session?.payment_intent.charges.data[0].billing_details
            .address;

        setBillingContent({
          name: billingName ?? "",
          line1: billingAddress.line1 ?? "",
          line2: billingAddress.line2 ?? "",
          postalCode: billingAddress.postal_code ?? "",
          city: billingAddress.city ?? "",
          country:
            typeof billingAddress.country === "string"
              ? countriesData[billingAddress.country].name
              : ""
        });
      }
    }, [data]);

    useEffect(() => {
      if (data?.line_items.data) {
        setProducts(
          data?.line_items.data.map(product => ({
            name: product.description,
            quantity: product.quantity,
            price: product.amount_total
          }))
        );
      }
    }, [data]);
  }

  return (
    <StyledPurchaseResult>
      {process.env.NODE_ENV !== "production" ? (
        <div>
          <PurchaseResult
            billingContent={billingContent}
            products={products}
            shippingContent={shippingContent}
            totalPrice={mockTotal}
          />
        </div>
      ) : (
        <div>
          {error && (
            <div style={{ marginBottom: "16px" }}>
              <Notification type="warning">
                <p style={{ fontSize: "14px" }}>
                  <strong>An error occurred.</strong> If you need help, please{" "}
                  <Link href="/contact">
                    <a style={{ color: "#0f62fe" }}>contact us</a>
                  </Link>
                  .
                </p>
              </Notification>
            </div>
          )}
          {data?.checkout_session?.payment_intent?.status === "succeeded" ? (
            <PurchaseResult
              billingContent={billingContent}
              products={products}
              shippingContent={shippingContent}
              totalPrice={data?.checkout_session?.payment_intent.amount}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>Loading...</p>
            </div>
          )}
        </div>
      )}
    </StyledPurchaseResult>
  );
};

export default PurchaseResultPage;

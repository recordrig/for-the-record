import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import StripeTypes from "stripe";
import { useDispatch } from "react-redux";
import countriesData from "../../data/countries";
import { formatCurrency } from "../../utils/prices";
import { checkoutAction } from "../../store/shoppingBag";
import Notification from "../../components/Notification";

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const StyledCustomerInfo = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;

  p {
    color: #697077;
  }

  > div {
    border: 1px solid #c1c7cd;
    box-sizing: border-box;
  }

  @media (max-width: 575px) {
    flex-direction: column;

    > div {
      padding: 32px 32px 32px 32px;
      width: 100%;

      &:nth-child(1) {
        border-bottom: 0;
      }
    }
  }

  @media (min-width: 576px) {
    flex-direction: row;

    > div {
      padding: 32px 32px 32px 48px;
      width: 50%;

      &:nth-child(1) {
        border-right: 0;
      }
    }
  }
`;

const StyledProduct = styled.div`
  border-top: 1px solid #c1c7cd;
  display: flex;
  max-width: 576px;
  padding-top: 16px;
  padding-bottom: 16px;

  div:nth-child(1) {
    height: 82px;
    text-align: center;
    width: 82px;

    img {
      height: 100%;
    }
  }

  div:nth-child(2) {
    padding-left: 16px;
    flex-grow: 1;
  }

  p:nth-child(1) {
    font-size: 18px;
    font-weight: bold;
    margin-top: 4px;
    margin-bottom: 0;
  }

  p:nth-child(2) {
    color: #697077;
    font-size: 13px;
    margin-top: 4px;
    margin-bottom: 0;
  }

  p:nth-child(3) {
    color: #697077;
    font-size: 18px;
    margin-top: 0;
    text-align: right;
  }
`;

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

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.checkout_session?.payment_intent?.status === "succeeded")
      dispatch(checkoutAction());
  }, [data]);

  const initialAddress: AddressContent = {
    name: "",
    line1: "",
    line2: "",
    postalCode: "",
    city: "",
    country: ""
  };

  const [shippingContent, setShippingContent] = useState(initialAddress);

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

  const [billingContent, setBillingContent] = useState(initialAddress);

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

  return (
    <StyledPurchaseResult>
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
          <>
            <div style={{ marginBottom: "16px" }}>
              <Notification type="success">
                <p style={{ fontSize: "14px" }}>
                  <strong>Thank you!</strong> Your order has been placed.
                </p>
              </Notification>
            </div>
            <StyledCustomerInfo>
              <div>
                <h3>Shipping Address</h3>
                <p>
                  {shippingContent.name}
                  <br />
                  {shippingContent.line1}
                  <br />
                  {shippingContent.line2.length > 0 && (
                    <>
                      {shippingContent.line2}
                      <br />
                    </>
                  )}
                  {shippingContent.postalCode}&nbsp;&nbsp;{shippingContent.city}
                  <br />
                  {shippingContent.country}
                </p>
              </div>
              <div>
                <h3>Billing Address</h3>
                <p>
                  {billingContent.name}
                  <br />
                  {billingContent.line1}
                  <br />
                  {billingContent.line2.length > 0 && (
                    <>
                      {billingContent.line2}
                      <br />
                    </>
                  )}
                  {billingContent.postalCode}&nbsp;&nbsp;{shippingContent.city}
                  <br />
                  {billingContent.country}
                </p>
              </div>
            </StyledCustomerInfo>
            <h2>Order Summary</h2>
            {data?.line_items.data.map(product => (
              <StyledProduct>
                <div>
                  <img
                    alt=""
                    src={
                      product.description.endsWith("black")
                        ? "/recordrig-black.png"
                        : "/recordrig.png"
                    }
                  />
                </div>
                <div>
                  <p>{product.description}</p>
                  <p>Qty: {product.quantity}</p>
                  <p>{formatCurrency(product.amount_total)}</p>
                </div>
              </StyledProduct>
            ))}
            <p
              style={{
                borderTop: "1px solid #c1c7cd",
                color: "#697077",
                fontSize: "21px",
                marginTop: 0,
                maxWidth: "576px",
                paddingTop: "8px",
                position: "relative",
                textAlign: "right"
              }}
            >
              <span style={{ left: "98px", position: "absolute" }}>Total: </span>
              {formatCurrency(data?.checkout_session?.payment_intent.amount)}
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </StyledPurchaseResult>
  );
};

export default PurchaseResultPage;

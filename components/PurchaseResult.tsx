import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { formatCurrency } from "../utils/prices";
import Notification from "./Notification";

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

  @media (max-width: 639px) {
    flex-direction: column;

    > div {
      padding: 32px 32px 32px 32px;
      width: 100%;

      &:nth-child(1) {
        border-bottom: 0;
      }
    }
  }

  @media (min-width: 640px) {
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
  /** Optional field in Stripe. If empty, it should still exist, just as an empty string (""). */
  line2: string;
  postalCode: string;
  city: string;
  country: string;
}

interface PurchaseResultPageProps {
  readonly billingContent: AddressContent;
  readonly email: string;
  readonly products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  readonly shippingContent: AddressContent;
  readonly totalPrice: number;
}

const PurchaseResult: NextPage<PurchaseResultPageProps> = ({
  billingContent,
  email,
  products,
  shippingContent,
  totalPrice,
}) => (
  <StyledPurchaseResult>
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Notification type="success">
          <p style={{ fontSize: "14px" }}>
            <strong>Thank you!</strong> Your order has been placed. You&apos;ll
            also receive a confirmation by email on <strong>{email}</strong>.
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
            {billingContent.postalCode}&nbsp;{shippingContent.city}
            <br />
            {billingContent.country}
          </p>
        </div>
      </StyledCustomerInfo>
      <h2>Order Summary</h2>
      {products.map((product) => (
        <StyledProduct key={product.name}>
          <div>
            <img
              alt=""
              src={
                product.name.endsWith("lack")
                  ? "/recordrig-black.png"
                  : "/recordrig.png"
              }
            />
          </div>
          <div>
            <p>{product.name}</p>
            <p>Qty: {product.quantity}</p>
            <p>{formatCurrency(product.price)}</p>
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
          textAlign: "right",
        }}
      >
        <span style={{ left: "98px", position: "absolute" }}>Total: </span>
        {formatCurrency(totalPrice)}
        <span
          style={{
            fontSize: "14px",
            left: 0,
            position: "absolute",
            top: "36px",
            width: "100%",
          }}
        >
          Includes VAT & shipping
        </span>
      </p>
    </div>
  </StyledPurchaseResult>
);

export default PurchaseResult;

import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import { Oval } from "svg-loaders-react";
import { totalLimit } from "../data/checkout";
import { extractPrices, formatCurrency, sumTotal } from "../utils/prices";
import {
  checkProductQuantities,
  checkTotalPrice,
  validateShoppingBag
} from "../utils/shoppingBag";
import { ArrowRightIcon } from "./Icon";
import Button from "./Button";
import Notification from "./Notification";
import Tile, { TileContainer } from "./Tile";
import { CapsHeading } from "./Text";

interface StyledProductProps {
  readonly animateRemoval: boolean;
  readonly quantityInvalid: boolean;
}

const removeProductAnimation = keyframes`
  0% {
    border-bottom: 1px solid #dde1e6;
    max-height: 500px;
    opacity: 1;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  25% {
    border-bottom: 1px solid #dde1e6;
    max-height: 500px;
    opacity: 0.5;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  50% {
    border-bottom: 1px solid #dde1e6;
    max-height: 500px;
    opacity: 0.5;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  75% {
    border-bottom: 0px solid #dde1e6;
    max-height: 0;
    opacity: 0.5;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  100% {
    border-bottom: 0px solid #dde1e6;
    max-height: 0;
    opacity: 0.5;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const StyledProduct = styled.li<StyledProductProps>`
  border-bottom: 1px solid #dde1e6;
  max-height: 500px; /* Will change on removal animation. */
  opacity: 1; /* Will change on removal animation. */
  overflow: hidden;
  padding-top: 24px;
  padding-bottom: 24px;

  ${({ animateRemoval }) => css`
    animation: ${animateRemoval && removeProductAnimation} 1.2s;
  `}

  > div {
    box-sizing: border-box;
    flex-grow: 1;
    height: 64px;
    padding-top: 16px;
  }

  p {
    font-weight: bold;
    margin: 0;
  }

  p:nth-child(2) {
    color: #4d5358;
    font-size: 14px;
    font-weight: normal;

    > span {
      color: #24a148;
      font-weight: bold;
    }
  }

  p:nth-child(4) {
    text-align: right;
  }

  select {
    background-color: transparent;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAAH/g49WAAAABGdBTUEAALGPC/xhBQAAAbhJREFUSA29ldFVxCAQRYetQdvQIuxk3Rb8di3CP7UTi9A2tIbFvJCXABkmIcHlnF0IM3PnMQQiUmxH70dbPBY8JBOjGwcnf+Yw7WcGTNgsSe1agAnQAlJR9pPr8x/kXt7ct+r66H/Ey02wQcvJ380c4TTTmTtnTi6hwBkyvHz26T5cap85z9KJhAiSSgtKSIUHSHXyGoCo8UWee1erUhorrl63pHRNNeAMxFwpkLMWuABiqA6kNQY7+R1fDHO3GGz1ACs7aoU0tCE76rKn4VgMKwiHCjDU6N3dVnMBu8hXH3eQl7AprE8tNIN1J/087XItVIGFhcZrXAstwOZAzCxBDZgOtKALsDJQg66A2cAcyvu4ezWwmzBrbdplzYo51hTjBRhc1jVAcaKq2tE/qV+WKkgDZ+wVtAzN9Svh7Y9JnD4nD8XvJSNb9xDGjyPZ49UQ38s0XkuoJgwahvcpfQmvKXRB2FQnjuL+P4WuFEY5aQU5y76l0EphlGALpNceoRuFMfU6gfSuEbpTGFPWCWSUJRQ++XWBuY23/DaBSIimCQ2W6X+jMAL2CSRFE7pTGNFtewjFr2H7Ay/aMznqAvP0AAAAAElFTkSuQmCC");
    background-position: right 4px center;
    background-repeat: no-repeat;
    background-size: 18px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
    font-weight: bold;
    outline: none;
    position: relative;
    width: 50px;
    -moz-appearance: none;
    -webkit-appearance: none;
    ${({ quantityInvalid }) => css`
      background-color: ${quantityInvalid ? "#ffb3b8" : "transparent"};
    `}
  }

  button {
    background: none;
    border: none;
    clear: both;
    cursor: pointer;
    float: right;
    font-size: 15px;
    margin-top: 4px;
    outline: none;
    padding: 0;
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    p,
    select {
      font-size: 20px;
    }

    select {
      top: 24px;
    }

    img {
      display: block;
      margin: 16px auto;
      width: 200px;
    }
  }

  @media (min-width: 641px) {
    display: flex;

    > div {
      padding-left: 32px;
    }

    p,
    select {
      font-size: 24px;
    }

    select {
      top: 30px;
    }

    img {
      height: 200px;
    }

    p:nth-child(2) {
      margin-bottom: 32px;
    }
  }
`;

const StyledProductList = styled.div`
  border-top: 1px solid #dde1e6;
  width: 100%;

  > div {
    bottom: 28px;
    position: relative;
    text-align: center;

    > span {
      background-color: #ffffff;
      color: #697077;
      display: inline-block;
      font-size: 13px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  ul {
    list-style-type: none;
    margin-top: 0;
    padding-left: 0;
  }
`;

const StyledTotals = styled.div`
  p {
    color: #4d5358;
    margin-top: 8px;
    margin-bottom: 8px;

    > span {
      display: block;
      float: left;
    }

    > span:nth-child(2) {
      float: right;
    }
  }

  p:nth-child(1) {
    color: #000000;
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
  }

  p:nth-child(2) {
    color: #4d5358;
    font-size: 14px !important;
    margin-top: 0;
    margin-bottom: 32px;
    text-align: right;
  }

  @media (min-width: 450px) and (max-width: 640px) {
    padding-left: 33%;
  }

  @media (max-width: 640px) {
    p:last-of-type {
      font-size: 20px;
    }
  }

  @media (min-width: 641px) {
    padding-left: 50%;

    p:last-of-type {
      font-size: 24px;
    }
  }
`;

const StyledShoppingBag = styled.div`
  > div {
    min-height: 70vh;
    padding-top: 80px;
    padding-bottom: 256px;
  }

  @media (max-width: 767px) {
    > div {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  @media (min-width: 768px) {
    > div {
      padding-left: 8px;
      padding-right: 8px;
    }

    > div > div {
      margin: 0 auto;
      max-width: 960px;
    }
  }
`;

interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}

interface ShoppingBagProps {
  readonly countrySupported?: boolean;
  readonly handleCheckout: (
    products: readonly { readonly id: string; readonly quantity: number }[]
  ) => any;
  /**
   * Pass products as an array in order to guarantee that their order will be correct.
   * The most recently added product should be listed at the top.
   */
  readonly products: Product[];
  readonly productsData: Record<
    string,
    {
      name: string;
      price: number;
      quantityLimit: number;
    }
  >;
  readonly removeProduct: Function;
  readonly updateProductQuantity: (productId: string, quantity: number) => any;
}

/**
 * Expansive list of all passed `products`. Includes sum total and button to Checkout.
 * Change quantity and Remove functions should be passed from the parent. The Product list should,
 * likewise, be managed by the parent.
 */
const ShoppingBag: FunctionComponent<ShoppingBagProps> = ({
  countrySupported = true,
  handleCheckout,
  updateProductQuantity,
  products,
  productsData,
  removeProduct
}) => {
  const prices = extractPrices(products);

  // Set to a particular Product ID to animate that Product into oblivion.
  const [animateRemoval, setAnimateRemoval] = useState("");

  const handleChangeQuantity = (
    productId: Product["id"],
    desiredQuantity: number
  ) => {
    updateProductQuantity(productId, desiredQuantity);
  };

  const handleRemoveProduct = (productId: Product["id"]) => {
    setAnimateRemoval(productId);
    setTimeout(() => removeProduct(productId), 1000);
  };

  const defaultValidState = {
    shoppingBagIsValid: true,
    errors: []
  };

  const [shoppingBagValidationState, setShoppingBagValidationState] = useState(
    products.length > 0
      ? validateShoppingBag(products, productsData, totalLimit)
      : defaultValidState
  );

  useEffect(() => {
    if (products.length > 0) {
      setShoppingBagValidationState(
        validateShoppingBag(products, productsData, totalLimit)
      );
    } else {
      setShoppingBagValidationState(defaultValidState);
    }
  }, [products]);

  const [totalIsTooHigh, setTotalIsTooHigh] = useState(
    products.length > 0 ? checkTotalPrice(products, totalLimit) : false
  );

  useEffect(() => {
    if (products.length > 0) {
      const isTooHigh = !checkTotalPrice(products, totalLimit)
        .totalPriceIsValid;
      setTotalIsTooHigh(isTooHigh);
    } else {
      setTotalIsTooHigh(false);
    }
  }, [products]);

  const [isBulkOrder, setIsBulkOrder] = useState(
    products.length > 0 ? checkProductQuantities(products, productsData) : false
  );

  useEffect(() => {
    if (products.length > 0) {
      const isBulk = !checkProductQuantities(products, productsData)
        .quantitiesAreValid;
      setIsBulkOrder(isBulk);
    } else {
      setIsBulkOrder(false);
    }
  }, [products]);

  const [email, setEmail] = useState("");

  // If filled out, the Checkout button will be disabled. This simple measure should prevent
  // most illigitemate submissions, while still protecting any visitor's privacy.
  // Note that the invalid value for "autoComplete" is intentional, because some browsers
  // do not accept the correct "off" value.
  const Sticky = () => (
    <form
      action="/submit"
      autoComplete="no"
      data-cy="form"
      method="post"
      style={{ position: "absolute", left: "100vw" }}
      tabIndex={-1}
    >
      <div
        style={{
          height: 0,
          left: "0",
          overflow: "hidden",
          position: "relative",
          width: 0
        }}
      >
        <label htmlFor="email">
          Email
          <input
            data-cy="email"
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            tabIndex={-1}
            type="text"
            value={email}
          />
        </label>
        <input type="submit" value="Submit" tabIndex={-1} />
      </div>
    </form>
  );

  // Always start out with a disabled button initially. Enable once mounted & shopping bag is valid.
  const [checkoutButtonEnabled, setCheckoutButtonEnabled] = useState(false);

  useEffect(() => {
    if (shoppingBagValidationState.shoppingBagIsValid && email.length === 0) {
      setCheckoutButtonEnabled(true);
    } else {
      setCheckoutButtonEnabled(false);
    }
  });

  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const handleCheckoutClick = () => {
    // Prevents multiple clicks in a short timespan.
    setCheckoutClicked(true);
    setTimeout(() => setCheckoutClicked(false), 4000);
    handleCheckout(products);
  };

  const CheckoutButton = () => (
    <Button
      appearDisabled={checkoutClicked}
      cypressId="enabled-checkout-button"
      onClick={checkoutClicked ? undefined : () => handleCheckoutClick()}
    >
      Check Out
      <span
        style={{
          display: "inline-block",
          height: "24px",
          marginLeft: "8px",
          position: "relative",
          top: "6px",
          width: "24px"
        }}
      >
        {checkoutClicked ? (
          <Oval
            style={{
              height: "24px",
              width: "24px"
            }}
          />
        ) : (
          <ArrowRightIcon color="#ffffff" />
        )}
      </span>
    </Button>
  );

  const DisabledCheckoutButton = () => (
    <Button
      appearDisabled
      cypressId="disabled-checkout-button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Check Out
      <span
        style={{
          display: "inline-block",
          height: "24px",
          marginLeft: "8px",
          position: "relative",
          top: "6px",
          width: "24px"
        }}
      >
        <ArrowRightIcon color="#ffffff" />
      </span>
    </Button>
  );

  return (
    <StyledShoppingBag>
      <div>
        {products.length > 0 ? (
          <div>
            <Sticky />
            {!countrySupported && (
              <div style={{ marginBottom: "16px" }}>
                <Notification type="warning">
                  <p style={{ fontSize: "14px" }}>
                    <strong>
                      We currently only ship to countries within the EU.
                    </strong>{" "}
                    If you&apos;d like to get notified when we expand our
                    shipping area,{" "}
                    <Link href="/contact">
                      <a style={{ color: "#0f62fe" }}>let us know</a>
                    </Link>
                    !
                  </p>
                </Notification>
              </div>
            )}
            {!shoppingBagValidationState.shoppingBagIsValid && (
              <div style={{ marginBottom: "16px" }}>
                <Notification type="error">
                  <p style={{ fontSize: "14px", paddingBottom: "4px" }}>
                    <strong>
                      The contents of your Shopping Bag need to be modified
                      before you can continue to Check Out.
                    </strong>{" "}
                    Please modify your Shopping Bag to correct the following
                    issue(s):
                  </p>
                  <ul data-cy="errors-list" style={{ fontSize: "13px" }}>
                    {shoppingBagValidationState.errors.map(error => (
                      <li
                        key={`${error.id}-${error.description.substring(
                          0,
                          60
                        )}`}
                        style={{ paddingBottom: "8px" }}
                      >
                        {error.description}
                      </li>
                    ))}
                  </ul>
                </Notification>
              </div>
            )}
            {isBulkOrder && (
              <div style={{ marginBottom: "16px" }}>
                <Notification type="info">
                  <p style={{ fontSize: "14px" }}>
                    <strong>For bulk orders, discounts might apply.</strong>{" "}
                    <Link href="/contact">
                      <a style={{ color: "#0f62fe" }}>Contact us</a>
                    </Link>{" "}
                    for a custom agreement.
                  </p>
                </Notification>
              </div>
            )}
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginTop: "48px",
                textAlign: "center"
              }}
            >
              Your bag total is{" "}
              <span
                style={{
                  backgroundColor: `${
                    totalIsTooHigh ? "#ffb3b8" : "transparent"
                  }`
                }}
              >
                {formatCurrency(sumTotal(prices))}
              </span>
              .
            </p>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              Get free shipping on all EU orders.
            </p>
            <div style={{ margin: "0 auto", maxWidth: "450px" }}>
              {checkoutButtonEnabled ? (
                <CheckoutButton />
              ) : (
                <DisabledCheckoutButton />
              )}
            </div>
            <div style={{ marginTop: "64px" }}>
              <Tile>
                <TileContainer>
                  <div style={{ marginBottom: "24px" }}>
                    <CapsHeading>Your Shopping Bag.</CapsHeading>
                  </div>
                  <StyledProductList>
                    <ul>
                      {products.map(({ id, name, price, quantity }) => (
                        <StyledProduct
                          animateRemoval={animateRemoval === id}
                          data-cy={`product-${id}`}
                          key={`product-${id}`}
                          quantityInvalid={
                            quantity > productsData[id].quantityLimit
                          }
                        >
                          <img
                            alt=""
                            src={
                              id.endsWith("black")
                                ? "/recordrig-black.png"
                                : "/recordrig.png"
                            }
                          />
                          <div>
                            <p>{name}</p>
                            <p>
                              Estimated delivery: within <span>14 days</span>
                            </p>
                            <select
                              data-cy={`quantity-${id}`}
                              id={`quantity-${id}`}
                              onChange={e =>
                                handleChangeQuantity(
                                  id,
                                  parseInt(e.currentTarget.value, 10)
                                )
                              }
                            >
                              {[...Array(productsData[id].quantityLimit)].map(
                                (_option, i) => (
                                  <option
                                    key={`amount-${i + 1}`}
                                    value={i + 1}
                                    selected={quantity === i + 1}
                                  >
                                    {i + 1}
                                  </option>
                                )
                              )}
                            </select>
                            <p>{formatCurrency(price * quantity)}</p>
                            <button
                              data-cy={`remove-${id}`}
                              onClick={() => handleRemoveProduct(id)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>
                        </StyledProduct>
                      ))}
                    </ul>
                  </StyledProductList>
                  <StyledTotals>
                    <p>
                      <span>Total:</span>&nbsp;
                      <span
                        style={{
                          backgroundColor: `${
                            totalIsTooHigh ? "#ffb3b8" : "transparent"
                          }`
                        }}
                      >
                        {formatCurrency(sumTotal(prices))}
                      </span>
                    </p>
                    <p>Includes VAT & shipping</p>
                    {checkoutButtonEnabled ? (
                      <CheckoutButton />
                    ) : (
                      <DisabledCheckoutButton />
                    )}
                  </StyledTotals>
                </TileContainer>
              </Tile>
            </div>
          </div>
        ) : (
          <span
            style={{
              display: "inline-block",
              marginTop: "15vh",
              width: "100%"
            }}
          >
            <p style={{ textAlign: "center" }}>Your shopping bag is empty.</p>
            <div style={{ margin: "32px auto", maxWidth: "450px" }}>
              <Button cypressId="to-shop" href="/shop/buy-recordrig">
                Shop RecordRig
                <span
                  style={{
                    display: "inline-block",
                    height: "24px",
                    marginLeft: "8px",
                    position: "relative",
                    top: "6px",
                    width: "24px"
                  }}
                >
                  <ArrowRightIcon color="#ffffff" />
                </span>
              </Button>
            </div>
          </span>
        )}
      </div>
    </StyledShoppingBag>
  );
};

export default ShoppingBag;

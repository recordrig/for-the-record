import React, { FunctionComponent, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  extractPrices,
  formatCurrency,
  priceWithoutTax,
  sumTotal
} from "../utils/prices";
import ArrowRightIcon from "./ArrowRightIcon";
import Button from "./Button";

interface StyledProductProps {
  readonly animateRemoval: boolean;
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
    box-shadow: none;
    cursor: pointer;
    font-weight: bold;
    outline: none;
    position: relative;
    width: 48px;
    -moz-appearance: none;
    -webkit-appearance: none;
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
      width: 240px;
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

  p:last-of-type {
    border-top: 1px solid #dde1e6;
    color: #000000;
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 32px;
    padding-top: 8px;
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
  margin: 0 auto;
  max-width: 758px;
`;

interface Product {
  readonly id: string;
  readonly price: number;
  readonly quantity: number;
}

interface ShoppingBagProps {
  /**
   * Pass products as an array in order to guarantee that their order will be correct.
   * The most recently added product should be listed at the top.
   *
   * The passed collection should hold at least 1 product.
   */
  readonly products: readonly Product[];
  readonly removeProduct: Function;
  readonly updateProductQuantity: Function;
}

/**
 * Expansive list of all passed `products`. Includes sum total and button to Checkout.
 * Change quantity and Remove functions should be passed from the parent. The Product list should,
 * likewise, be managed by the parent.
 */
const ShoppingBag: FunctionComponent<ShoppingBagProps> = ({
  updateProductQuantity,
  products,
  removeProduct
}) => {
  const prices = extractPrices(products);
  const total = sumTotal(prices);
  const preTaxTotal = priceWithoutTax(total);
  const taxTotal = total - preTaxTotal;

  // Set to a particular Product ID to animate that Product into oblivion.
  const [animateRemoval, setAnimateRemoval] = useState("");

  const handleChangeQuantity = (
    productId: Product["id"],
    desiredQuantity: string
  ) => {
    updateProductQuantity(productId, desiredQuantity);
  };

  const handleRemoveProduct = (productId: Product["id"]) => {
    setAnimateRemoval(productId);
    setTimeout(() => removeProduct(productId), 1000);
  };

  return (
    <StyledShoppingBag>
      <StyledProductList>
        <ul>
          {products.map(({ id, price, quantity }) => (
            <StyledProduct
              animateRemoval={animateRemoval === id}
              key={`product-${id}`}
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
                <p>
                  RecordRig -{" "}
                  {id.endsWith("black") ? "Stealth Black" : "Pristine White"}
                </p>
                <p>Estimated delivery: 2 weeks</p>
                <select
                  id={`${id}-quantity`}
                  onChange={e =>
                    handleChangeQuantity(id, e.currentTarget.value)
                  }
                  value={quantity}
                >
                  {[1, 2, 3, 4].map(option => (
                    <option key={`amount-${option}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p>{formatCurrency(price * quantity)}</p>
                <button onClick={() => handleRemoveProduct(id)} type="button">
                  Remove
                </button>
              </div>
            </StyledProduct>
          ))}
        </ul>
      </StyledProductList>
      <StyledTotals>
        <p>
          <span>Subtotal:</span>&nbsp;<span>{formatCurrency(preTaxTotal)}</span>
        </p>
        <p>
          <span>Tax (21%):</span>&nbsp;<span>{formatCurrency(taxTotal)}</span>
        </p>
        <p>
          <span>Shipping:</span>&nbsp;<span>FREE</span>
        </p>
        <p>
          <span>Total:</span>&nbsp;<span>{formatCurrency(total)}</span>
        </p>
        <Button href="/shop/checkout">
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
      </StyledTotals>
    </StyledShoppingBag>
  );
};

export default ShoppingBag;

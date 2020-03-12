import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Link from "next/link";

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

  li {
    border-bottom: 1px solid #dde1e6;
    box-sizing: border-box;
    display: flex;
    padding-top: 24px;
    padding-bottom: 24px;

    > div {
      box-sizing: border-box;
      flex-grow: 1;
      height: 64px;
      padding-top: 16px;
      padding-left: 24px;
    }

    img {
      height: 160px;
    }

    p {
      font-size: 24px;
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

    button {
      background: none;
      border: none;
      float: right;
      font-size: 15px;
      padding: 0;
      text-decoration: underline;
    }
  }
`;

const StyledCheckoutLink = styled.a`
  background-color: #0062ff;
  border-radius: 10px;
  box-sizing: border-box;
  color: #ffffff;
  display: block;
  height: 64px;
  font-size: 19px;
  line-height: 64px;
  text-align: center;
  text-decoration: none;
  width: 100%;
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
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 32px;
    padding-top: 8px;
  }

  @media (min-width: 450px) and (max-width: 640px) {
    padding-left: 33%;
  }

  @media (min-width: 641px) {
    padding-left: 50%;
  }
`;

const StyledShoppingBag = styled.div`
  margin: 0 auto;
  max-width: 758px;
`;

interface Product {
  readonly id: string;
  readonly quantity: number;
}

interface ShoppingBagProps {
  /**
   * Pass products as an array in order to guarantee that their order will be correct.
   * The most recently added product should be listed at the top.
   *
   * The passed collection should hold at least 1 product.
   */
  readonly products: readonly Product[] & { readonly 0: Product };
  readonly indicateAddition?: boolean;
}

/**
 * Expansive list of all passed `products`. Includes sum total and button to Checkout.
 */
const ShoppingBag: FunctionComponent<ShoppingBagProps> = ({ products }) => {
  // So long as RecordRigs are the only thing we sell, the price is always the same.
  const PRICE = 239900;

  // TODO: Update qty
  // TODO: Remove product

  return (
    <StyledShoppingBag>
      <StyledProductList>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <img
                alt=""
                src={
                  product.id.endsWith("black")
                    ? "/recordrig-black.png"
                    : "/recordrig.png"
                }
              />
              <div>
                <p>
                  RecordRig -{" "}
                  {product.id.endsWith("black")
                    ? "Stealth Black"
                    : "Pristine White"}
                </p>
                <p>Estimated delivery: 2 weeks</p>
                <p>{product.quantity}</p>
                <p>€ 2.399,00</p>
                <button>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </StyledProductList>
      <StyledTotals>
        <p>
          <span>Subtotal:</span>&nbsp;<span>€ 1.982,64</span>
        </p>
        <p>
          <span>Tax (21%):</span>&nbsp;<span>€ 416,36</span>
        </p>
        <p>
          <span>Shipping:</span>&nbsp;<span>FREE</span>
        </p>
        <p>
          <span>Total:</span>&nbsp;<span>€ 2.399,00</span>
        </p>
        <Link href="/shop/checkout" passHref>
          <StyledCheckoutLink>
            Check Out <span style={{ fontSize: "20px" }}>&nbsp;&rarr;</span>
          </StyledCheckoutLink>
        </Link>
      </StyledTotals>
    </StyledShoppingBag>
  );
};

export default ShoppingBag;

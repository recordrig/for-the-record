import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledProductList = styled.div`
  max-width: 575px;
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
    height: 100px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 24px;
    padding-right: 24px;

    > div {
      box-sizing: border-box;
      height: 64px;
      padding-top: 16px;
      padding-left: 24px;
    }

    img {
      height: 64px;
    }

    p {
      font-weight: bold;
      margin: 0;
    }

    span {
      color: #697077;
      font-size: 12px;
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
  margin: 0 16px;
  text-align: center;
  text-decoration: none;
  width: calc(100% - 16px);
`;

const StyledTotals = styled.div``;

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
    <>
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
                <p>Remove</p>
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
    </>
  );
};

export default ShoppingBag;

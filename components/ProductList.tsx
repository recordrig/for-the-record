import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledProductListProps {
  readonly indicateAddition: boolean;
}

const StyledProductList = styled.div<StyledProductListProps>`
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

  ${({ indicateAddition }) => css`
    @keyframes flash {
      0% {
        background-color: transparent;
      }

      25% {
        background-color: transparent;
      }

      60% {
        background-color: #defbe6;
      }

      75% {
        background-color: #defbe6;
      }

      100% {
        background-color: transparent;
      }
    }

    li:first-child {
      animation: ${indicateAddition ? "flash 1.5s" : "none"};
      will-change: ${indicateAddition ? "background-color" : "unset"};
    }
  `}
`;

interface Product {
  readonly id: string;
  readonly quantity: number;
}

interface ProductListProps {
  /**
   * Pass products as an array in order to guarantee that their order will be correct.
   * The most recently added product should be listed at the top.
   */
  readonly products: readonly Product[];
  readonly indicateAddition?: boolean;
}

/**
 * The Product List is a compact style list of product pictures, names and quantity
 * of the most recently added products. The most recently added product should be listed
 * at the top.
 *
 * Pass `flash={true}` to make the top (most recently added) product briefly flash so
 * as to indicate it was recently added to the list.
 */
const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  indicateAddition = false
}) => {
  const productsToRender =
    products.length > 3 ? [products[0], products[1], products[2]] : products;

  const remainingProductsAmount = products.length > 3 ? products.length - 3 : 0;

  return (
    <StyledProductList indicateAddition={indicateAddition}>
      <ul>
        {productsToRender.map(product => (
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
              {product.quantity > 1 && <span>{product.quantity}x</span>}
            </div>
          </li>
        ))}
      </ul>
      {remainingProductsAmount > 0 && (
        <div>
          <span>
            {remainingProductsAmount} more item
            {remainingProductsAmount > 1 && "s"} in your Bag
          </span>
        </div>
      )}
    </StyledProductList>
  );
};

export default ProductList;

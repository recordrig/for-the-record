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
    padding-left: 24px;
    padding-right: 24px;

    > div {
      box-sizing: border-box;
      padding-left: 24px;
    }

    p {
      font-weight: bold;
      margin: 0;
    }

    span {
      color: #697077;
      font-size: 12px;
    }

    &:first-child {
      border-top: 1px solid #dde1e6;
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

  @media (max-width: 575px) {
    li {
      height: 92px;
      padding-top: 16px;
      padding-bottom: 16px;

      > div {
        height: 60px;
        padding-top: 8px;
      }

      img {
        height: 60px;
      }
    }
  }

  @media (min-width: 576px) {
    li {
      height: 146px;
      padding-top: 24px;
      padding-bottom: 24px;

      > div {
        height: 96px;
        padding-top: 16px;
      }

      img {
        height: 96px;
      }
    }
  }
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
  /** Brief green flash on the top product. */
  readonly indicateAddition?: boolean;
  /** The amount to show before cutoff. Defaults to two. */
  readonly showAmount?: number;
  /** The product ID to list at the top. */
  readonly showFirstProductId?: string;
}

/**
 * The Product List is a compact style list of product pictures, names and quantity.
 */
const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  indicateAddition = false,
  showAmount = 2,
  showFirstProductId = undefined
}) => {
  // The first product that matches `showFirstProductId`, or the the product that was
  // originally first (if `showFirstProductId` was not defined, or wasn't found).
  const firstProduct = (() => {
    const findFirstProduct = () =>
      products.find(product => product.id === showFirstProductId);

    // If the product that ought to be showed first was specified, we attempt to find it.
    const firstProductFound = showFirstProductId && findFirstProduct();

    // If indeed the specified product was found, we return it.
    if (firstProductFound) return firstProductFound;

    // If it wasn't found, we'll return `undefined` to indicate its non-existence.
    return undefined;
  })();

  // The list of products without `showFirstProductId`, or the original list of products
  // without changes if it wasn't found.
  const filteredProducts = (() =>
    products.filter(product => !(product.id === showFirstProductId)))();

  // Either a mashed together list of the product that was defined (and found) to be firt,
  // or the plain original list of products as passed from the parent.
  const productsToUse = firstProduct
    ? [firstProduct, ...filteredProducts]
    : products;

  const productsToRender = productsToUse.slice(0, showAmount);
  const remainingProducts = productsToUse.slice(showAmount, products.length);

  // Sum the quantities of all remaining (non-rendered) products.
  const remainingProductsAmount = remainingProducts.reduce(
    (accumulatingTotal, currentProduct) => {
      return accumulatingTotal + currentProduct.quantity;
    },
    0
  );

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

import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledProductListProps {
  indicateAddition: boolean;
}

const StyledProductList = styled.div<StyledProductListProps>`
  ${({ indicateAddition }) => css`
    display: block;
  `}
`;

interface Product {
  id: string;
  quantity: number;
}

interface ProductListProps {
  /**
   * Pass products as an array in order to guarantee that their order will be correct.
   * The most recently added product should be listed at the top.
   */
  products: Product[];
  indicateAddition?: boolean;
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
  return (
    <StyledProductList indicateAddition={indicateAddition}>
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
              <span>{product.quantity}x</span>
            </div>
          </li>
        ))}
      </ul>
    </StyledProductList>
  );
};

export default ProductList;

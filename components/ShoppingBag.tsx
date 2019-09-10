import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  border-bottom: 2px solid #eee;
`;

const StyledSubtotal = styled.div``;

const StyledCheckoutButton = styled.button``;

const StyledShoppingBag = styled.div``;

type ShoppingBagProps = {
  products?: {
    title: string;
    description?: string;
    quantity: number;
  }[];
  subtotal?: number;
};

const ShoppingBag: FunctionComponent<ShoppingBagProps> = ({
  products,
  subtotal
}: ShoppingBagProps) => (
  <StyledShoppingBag>
    {!products && <p>You do not have anything in your shopping bag.</p>}
    {products && products.length === 0 && (
      <p>You do not have anything in your shopping bag.</p>
    )}
    {products &&
      products.length > 0 &&
      products.map(product => (
        <StyledItem key={`shopping bag product ${product.title}`}>
          <p>{product.title}</p>
          {product.description && <p>{product.description}</p>}
          <p>{product.quantity}</p>
        </StyledItem>
      ))}
    {products && products.length > 0 && (
      <StyledSubtotal>
        <p>
          Subtotal:
          <span>
            &nbsp;
            {subtotal || 0}
            &nbsp;EUR
          </span>
        </p>
        <p>
          Shipping:
          <span>&nbsp;FREE</span>
        </p>
      </StyledSubtotal>
    )}
    {products && products.length > 0 && (
      <StyledCheckoutButton>Checkout</StyledCheckoutButton>
    )}
  </StyledShoppingBag>
);

export default ShoppingBag;

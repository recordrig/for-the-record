import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface StyledShoppingBagIconProps {
  readonly animate: boolean;
}

const fadeOutIcon = keyframes`
  0% {
    opacity: 1;
  }

  /* Delay fade out so that the icons will overlap. */
  10% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`;

const fadeInIcon = keyframes`
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

const StyledShoppingBagIconStill = styled.object<StyledShoppingBagIconProps>`
  position: absolute;
  width: inherit;

  ${({ animate }) => css`
    animation: ${animate && fadeOutIcon} 1.4s; /* Slightly shorter so that it is visible again. */
  `}
`;

const StyledShoppingBagIconAnimated = styled.object<StyledShoppingBagIconProps>`
  position: absolute;
  width: inherit;

  ${({ animate }) => css`
    animation: ${animate ? fadeInIcon : fadeOutIcon} 1.5s;
  `}
`;

const StyledShoppingBagIcon = styled.div`
  > div {
    position: relative;
    width: 32px;
  }
`;

interface ShoppingBagIconProps {
  readonly amount: number;
}

const ShoppingBagIcon: FunctionComponent<ShoppingBagIconProps> = ({
  amount
}) => {
  // Set the local amount once from props.
  const [stateAmount, setStateAmount] = useState(amount);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Animate addition if needed.
    if (amount > stateAmount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1500);
    }

    // Sync state amount.
    if (amount !== stateAmount) {
      setStateAmount(amount);
    }
  }, [amount]);

  return (
    <StyledShoppingBagIcon>
      <div>
        <StyledShoppingBagIconStill
          animate={animate}
          aria-label=""
          type="image/svg+xml"
          data="/shopping-bag-still.svg"
        />
        {animate && (
          <StyledShoppingBagIconAnimated
            animate={animate}
            aria-label=""
            type="image/svg+xml"
            data="/shopping-bag-add-animation.svg"
          />
        )}
      </div>
      <span>{amount}</span>
    </StyledShoppingBagIcon>
  );
};

export default ShoppingBagIcon;

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
  bottom: 0;
  position: absolute;
  width: inherit;

  ${({ animate }) => css`
    animation: ${animate && fadeOutIcon} 1.4s; /* Slightly shorter so that it is visible again. */
  `}
`;

const StyledShoppingBagIconAnimated = styled.object<StyledShoppingBagIconProps>`
  bottom: 0;
  position: absolute;
  width: inherit;

  ${({ animate }) => css`
    animation: ${animate ? fadeInIcon : fadeOutIcon} 1.5s;
  `}
`;

const bulge = keyframes`
  0% {
    transform: scale(.1, .1);
  }

  75% {
    transform: scale(.1, .1);
  }

  85% {
    transform: scale(1.1, 1.1);
  }

  100% {
    transform: scale(1, 1);
  }
`;

const StyledShoppingBagIcon = styled.div`
  height: inherit;
  min-height: 32px;

  > div {
    height: inherit;
    min-height: 32px;
    overflow: hidden;
    position: relative;
    width: 32px;
  }

  > div > span {
    animation: ${bulge} 1.5s ease;
    bottom: 1px;
    color: #ffffff;
    background-color: #ff4e28;
    border-radius: 8px;
    font-size: 10px;
    font-weight: bold;
    min-width: 12px;
    padding: 1px 2px;
    position: absolute;
    right: 1px;
    text-align: center;
    z-index: 1;
  }
`;

interface ShoppingBagIconProps {
  readonly amount: number;
}

/**
 * Shopping bag with amount indicater.
 *
 * Animates whenever an addition is made. Inherits parent height and aligns to its bottom side.
 */
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
        {amount > 0 && <span>{amount}</span>}
      </div>
    </StyledShoppingBagIcon>
  );
};

export default ShoppingBagIcon;

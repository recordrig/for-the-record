import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";

const StyledShoppingBagButton = styled.div`
  object {
    height: 50px;
    width: 50px;
  }
`;

interface ShoppingBagButtonProps {
  readonly amount: number;
}

const ShoppingBagButton: FunctionComponent<ShoppingBagButtonProps> = ({
  amount
}) => {
  // Set the local amount once from props.
  const [stateAmount, setStateAmount] = useState(amount);

  const [svgLink, setSvgLink] = useState("/shopping-bag-still.svg");
  const removeSvgAnimation = () => setSvgLink("/shopping-bag-still.svg");

  useEffect(() => {
    // Animate addition if needed.
    if (amount > stateAmount) {
      setSvgLink("/shopping-bag-add-animation.svg");
      setTimeout(removeSvgAnimation, 1500);
    }

    // Sync state amount.
    if (amount !== stateAmount) {
      setStateAmount(amount);
    }
  }, [amount]);

  return (
    <StyledShoppingBagButton>
      <div>
        <object aria-label="" type="image/svg+xml" data={svgLink} />
      </div>
      <span>{amount}</span>
    </StyledShoppingBagButton>
  );
};

export default ShoppingBagButton;

import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBagButton from "./ShoppingBagButton";

const ChangeAmount = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <ShoppingBagButton amount={amount} />
      <button onClick={() => setAmount(amount - 1)} type="button">
        -1
      </button>
      <button onClick={() => setAmount(amount + 1)} type="button">
        +1
      </button>
    </div>
  );
};

storiesOf("ShoppingBagButton", module)
  .add("No items", () => <ShoppingBagButton amount={0} />)
  .add("2 items", () => <ShoppingBagButton amount={2} />)
  .add("change amount", () => <ChangeAmount />);

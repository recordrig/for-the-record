import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBagIcon from "./ShoppingBagIcon";

const ChangeAmount = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <div
        style={{
          border: "2px solid black",
          height: "64px",
          overflow: "hidden"
        }}
      >
        <div style={{ height: "50px" }}>
          <ShoppingBagIcon amount={amount} />
        </div>
      </div>
      <button onClick={() => setAmount(amount - 1)} type="button">
        -1
      </button>
      <button onClick={() => setAmount(amount + 1)} type="button">
        +1
      </button>
    </div>
  );
};

storiesOf("ShoppingBagIcon", module)
  .add("No items", () => <ShoppingBagIcon amount={0} />)
  .add("2 items", () => <ShoppingBagIcon amount={2} />)
  .add("change amount", () => <ChangeAmount />);

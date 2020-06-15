import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import {
  ArrowRightIcon,
  CheckIcon,
  CrossIcon,
  InfoIcon,
  ShoppingBagIcon
} from "./Icon";

const ShoppingBagInteractive = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <ShoppingBagIcon amount={amount} />
      <button onClick={() => setAmount(amount - 1)} type="button">
        -1
      </button>
      <button onClick={() => setAmount(amount + 1)} type="button">
        +1
      </button>
    </div>
  );
};

storiesOf("Icon", module)
  .add("arrow: default", () => <ArrowRightIcon />)
  .add("arrow: color", () => <ArrowRightIcon color="#ff0000" />)
  .add("check: default", () => <CheckIcon />)
  .add("check: color", () => <CheckIcon color="#ff0000" />)
  .add("check: type filled", () => <CheckIcon type="filled" />)
  .add("check: type outline", () => <CheckIcon type="outline" />)
  .add("cross: default", () => <CrossIcon />)
  .add("cross: color", () => <CrossIcon color="#ff0000" />)
  .add("cross: type outline", () => <CrossIcon type="outline" />)
  .add("info: default", () => <InfoIcon />)
  .add("info: color", () => <InfoIcon color="#ff0000" />)
  .add("info: type outline", () => <InfoIcon type="outline" />)
  .add("shopping bag: 0", () => <ShoppingBagIcon amount={0} />)
  .add("shopping bag: 2", () => <ShoppingBagIcon amount={2} />)
  .add("shopping bag: interactive", () => <ShoppingBagInteractive />);

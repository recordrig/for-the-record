import * as React from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBag from "./ShoppingBag";

storiesOf("ShoppingBag", module)
  .add("Default", () => <ShoppingBag />)
  .add("0 items", () => <ShoppingBag products={[]} />)
  .add("1 item", () => (
    <ShoppingBag
      products={[
        {
          title: "RecordRig - Stealth Black",
          description: "+ 2TB HDD",
          quantity: 1
        }
      ]}
    />
  ))
  .add("2 item", () => (
    <ShoppingBag
      products={[
        {
          title: "RecordRig - Pristine White",
          description: "",
          quantity: 1
        }
      ]}
    />
  ));

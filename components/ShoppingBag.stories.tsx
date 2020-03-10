import * as React from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBag from "./ShoppingBag";

storiesOf("ShoppingBag", module).add("default", () => (
  <>
    <ShoppingBag
      products={[
        {
          id: "RR20-stealth-black",
          quantity: 1
        },
        {
          id: "RR20-pristine-white",
          quantity: 2
        }
      ]}
    />
  </>
));

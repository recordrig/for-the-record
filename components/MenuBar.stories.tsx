import * as React from "react";
import { storiesOf } from "@storybook/react";
import MenuBar from "./MenuBar";

storiesOf("MenuBar", module)
  .add("default", () => <MenuBar products={[]} />)
  .add("products", () => (
    <MenuBar
      products={[
        {
          id: "RR20-stealth-black",
          quantity: 1
        },
        {
          id: "RR20-pristine-white",
          quantity: 1
        },
        {
          id: "RR21-stealth-black",
          quantity: 3
        },
        {
          id: "RR21-pristine-white",
          quantity: 1
        },
        {
          id: "RR22-stealth-black",
          quantity: 1
        },
        {
          id: "RR22-pristine-white",
          quantity: 2
        }
      ]}
    />
  ));

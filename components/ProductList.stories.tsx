import * as React from "react";
import { storiesOf } from "@storybook/react";
import ProductList from "./ProductList";

storiesOf("ProductList", module)
  .add("default", () => (
    <>
      <ProductList
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
  ))
  .add("indicate addition", () => (
    <>
      <ProductList
        indicateAddition
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
  ))
  .add("1 more item", () => (
    <>
      <ProductList
        products={[
          {
            id: "RR20-stealth-black",
            quantity: 2
          },
          {
            id: "RR20-pristine-white",
            quantity: 1
          },
          {
            id: "RR21-stealth-black",
            quantity: 1
          },
          {
            id: "RR21-pristine-white",
            quantity: 1
          }
        ]}
      />
    </>
  ))
  .add("3 more items", () => (
    <>
      <ProductList
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
    </>
  ));

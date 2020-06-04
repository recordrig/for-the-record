import * as React from "react";
import { storiesOf } from "@storybook/react";
import ProductList from "./ProductList";

const longList = [
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
    quantity: 10
  },
  {
    id: "RR22-stealth-black",
    quantity: 1
  },
  {
    id: "RR22-pristine-white",
    quantity: 2
  },
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
    quantity: 4
  },
  {
    id: "RR22-stealth-black",
    quantity: 1
  },
  {
    id: "RR22-pristine-white",
    quantity: 2
  }
];

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
  .add("additional products", () => (
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
            quantity: 2
          },
          {
            id: "RR21-pristine-white",
            quantity: 1
          }
        ]}
      />
    </>
  ))
  .add("lots of products", () => (
    <>
      <ProductList products={longList} />
    </>
  ))
  .add("show custom amount", () => (
    <>
      <ProductList products={longList} showAmount={4} />
    </>
  ))
  .add("show 1", () => (
    <>
      <ProductList products={longList} showAmount={1} />
    </>
  ))
  .add("show 100", () => (
    <>
      <ProductList products={longList} showAmount={100} />
    </>
  ));

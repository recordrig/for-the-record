import * as React from "react";
import { storiesOf } from "@storybook/react";
import ProductList from "./ProductList";

const longList = [
  {
    id: "RR20-black",
    quantity: 1,
  },
  {
    id: "RR20-white",
    quantity: 1,
  },
  {
    id: "RR21-black",
    quantity: 3,
  },
  {
    id: "RR21-white",
    quantity: 10,
  },
  {
    id: "RR22-black",
    quantity: 1,
  },
  {
    id: "RR22-white",
    quantity: 2,
  },
  {
    id: "RR23-black",
    quantity: 1,
  },
  {
    id: "RR23-white",
    quantity: 1,
  },
  {
    id: "RR24-black",
    quantity: 3,
  },
  {
    id: "RR24-white",
    quantity: 4,
  },
  {
    id: "RR25-black",
    quantity: 1,
  },
  {
    id: "RR25-white",
    quantity: 2,
  },
];

storiesOf("ProductList", module)
  .add("default", () => (
    <>
      <ProductList
        products={[
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
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
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
        ]}
      />
    </>
  ))
  .add("additional products", () => (
    <>
      <ProductList
        products={[
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
        ]}
      />
    </>
  ))
  .add("show first", () => (
    <>
      <ProductList
        products={[
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
        ]}
        showFirstProductId="RR20-white"
      />
    </>
  ))
  .add("show first with indicate addition", () => (
    <>
      <ProductList
        indicateAddition
        products={[
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
        ]}
        showFirstProductId="RR20-white"
      />
    </>
  ))
  .add("show first with additional products", () => (
    <>
      <ProductList
        products={[
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
          {
            id: "RR20-black",
            quantity: 1,
          },
          {
            id: "RR20-white",
            quantity: 2,
          },
        ]}
        showFirstProductId="RR20-white"
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

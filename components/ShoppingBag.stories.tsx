import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBag from "./ShoppingBag";

const ShoppingBagDefaultContainer = () => {
  const [products, setProducts] = useState([
    {
      id: "RR20-stealth-black",
      price: 239900,
      quantity: 1
    },
    {
      id: "RR20-pristine-white",
      price: 239900,
      quantity: 2
    }
  ]);

  const updateProductQuantity = (productId, desiredQuantity) => {
    setProducts(
      products.map(product =>
        product.id === productId
          ? { ...product, quantity: desiredQuantity }
          : product
      )
    );
  };

  const removeProduct = productId => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ShoppingBag
      products={products}
      updateProductQuantity={updateProductQuantity}
      removeProduct={removeProduct}
    />
  );
};

storiesOf("ShoppingBag", module)
  .add("default", () => <ShoppingBagDefaultContainer />)
  .add("empty", () => (
    <ShoppingBag
      products={[]}
      updateProductQuantity={() => ""}
      removeProduct={() => ""}
    />
  ));

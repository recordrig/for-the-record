import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBag from "./ShoppingBag";

const ShoppingBagDefaultContainer = () => {
  const [products, setProducts] = useState([
    {
      id: "RR20-stealth-black",
      quantity: 1
    },
    {
      id: "RR20-pristine-white",
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

  return (
    <ShoppingBag
      products={products}
      updateProductQuantity={updateProductQuantity}
    />
  );
};

storiesOf("ShoppingBag", module).add("default", () => (
  <>
    <ShoppingBagDefaultContainer />
  </>
));

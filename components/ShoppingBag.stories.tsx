import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ShoppingBag from "./ShoppingBag";

const productsData = {
  PRODUCT1: {
    name: "Product 1",
    price: 200000,
    quantityLimit: 4
  },
  PRODUCT2: {
    name: "Product 2",
    price: 100000,
    quantityLimit: 4
  }
};

const handleCheckout = products =>
  alert(`onSelectColor called with ${products}`);

const ShoppingBagDefaultContainer = () => {
  const [products, setProducts] = useState([
    {
      id: "PRODUCT1",
      name: "Product 1",
      price: 200000,
      quantity: 1
    },
    {
      id: "PRODUCT2",
      name: "Product 2",
      price: 100000,
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
      handleCheckout={handleCheckout}
      products={products}
      productsData={productsData}
      updateProductQuantity={updateProductQuantity}
      removeProduct={removeProduct}
    />
  );
};

const ShoppingBagInvalidContainer = () => {
  const [products, setProducts] = useState([
    {
      id: "PRODUCT1",
      name: "Product 1",
      price: 200000,
      quantity: 6
    },
    {
      id: "PRODUCT2",
      name: "Product 2",
      price: 100000,
      quantity: 8
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
      handleCheckout={handleCheckout}
      products={products}
      productsData={productsData}
      updateProductQuantity={updateProductQuantity}
      removeProduct={removeProduct}
    />
  );
};

storiesOf("ShoppingBag", module)
  .add("default", () => <ShoppingBagDefaultContainer />)
  .add("empty", () => (
    <ShoppingBag
      handleCheckout={handleCheckout}
      products={[]}
      productsData={productsData}
      updateProductQuantity={() => ""}
      removeProduct={() => ""}
    />
  ))
  .add("invalid", () => <ShoppingBagInvalidContainer />);

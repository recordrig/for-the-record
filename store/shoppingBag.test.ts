import { addProduct, removeProduct, validateShoppingBag } from "./shoppingBag";

test("Check the shoppingBag data structure and throw if a product's ID does not match the obj key", () => {
  const shoppingBag = { PRODUCTID: { id: "WRONG", quantity: 1 } };

  expect(() => {
    validateShoppingBag(shoppingBag);
  }).toThrow();
});

test("Add product to empty shopping bag", () => {
  const prevShoppingBag = {};
  const productId = "PRODUCTID";
  const newShoppingBag = { PRODUCTID: { id: "PRODUCTID", quantity: 1 } };

  expect(addProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag with different products", () => {
  const prevShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 }
  };
  const productId = "PRODUCTID";
  const newShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 },
    PRODUCTID: { id: "PRODUCTID", quantity: 1 }
  };

  expect(addProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag which already contains that product (increase quantity)", () => {
  const prevShoppingBag = { PRODUCTID: { id: "PRODUCTID", quantity: 1 } };
  const productId = "PRODUCTID";
  const newShoppingBag = { PRODUCTID: { id: "PRODUCTID", quantity: 2 } };

  expect(addProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag which already contains that product as well as different products", () => {
  const prevShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 },
    PRODUCTID: { id: "PRODUCTID", quantity: 1 }
  };
  const productId = "PRODUCTID";
  const newShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 },
    PRODUCTID: { id: "PRODUCTID", quantity: 2 }
  };

  expect(addProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Remove product from shopping bag when it's the only product", () => {
  const prevShoppingBag = {
    PRODUCTID: { id: "PRODUCTID", quantity: 1 }
  };
  const productId = "PRODUCTID";
  const newShoppingBag = {};

  expect(removeProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Remove product from shopping bag which contains multiple of that product (decrease quantity)", () => {
  const prevShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTID: { id: "PRODUCTID", quantity: 2 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 }
  };
  const productId = "PRODUCTID";
  const newShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTID: { id: "PRODUCTID", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 }
  };

  expect(removeProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Removing a product when it's not present does NOT error but just returns the original products", () => {
  const prevShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 }
  };
  const productId = "PRODUCTID";
  const newShoppingBag = {
    PRODORP: { id: "PRODORP", quantity: 1 },
    PRODUCTTT: { id: "PRODUCTTT", quantity: 1 }
  };

  expect(removeProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Removing a product from empty shopping bag does NOT error but just returns the original empty object", () => {
  const prevShoppingBag = {};
  const productId = "PRODUCTID";
  const newShoppingBag = {};

  expect(removeProduct(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

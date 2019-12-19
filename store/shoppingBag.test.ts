import { addProduct, validateShoppingBag } from "./shoppingBag";

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

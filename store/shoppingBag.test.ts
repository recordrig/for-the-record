import { addItem } from "./shoppingBag";

test("Add product to empty shopping bag", () => {
  const prevShoppingBag = [];
  const productId = "PRODUCTID";
  const newShoppingBag = [{ id: "PRODUCTID", quantity: 1 }];

  expect(addItem(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag which already contains that product", () => {
  const prevShoppingBag = [{ id: "PRODUCTID", quantity: 1 }];
  const productId = "PRODUCTID";
  const newShoppingBag = [{ id: "PRODUCTID", quantity: 2 }];

  expect(addItem(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag which already contains that product as well as different products", () => {
  const prevShoppingBag = [
    { id: "PRODORP", quantity: 1 },
    { id: "PRODUCTTT", quantity: 1 },
    { id: "PRODUCTID", quantity: 1 }
  ];
  const productId = "PRODUCTID";
  const newShoppingBag = [
    { id: "PRODORP", quantity: 1 },
    { id: "PRODUCTTT", quantity: 1 },
    { id: "PRODUCTID", quantity: 2 }
  ];

  expect(addItem(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

test("Add product to shopping bag with different products", () => {
  const prevShoppingBag = [
    { id: "PRODORP", quantity: 1 },
    { id: "PRODUCTTT", quantity: 1 }
  ];
  const productId = "PRODUCTID";
  const newShoppingBag = [
    { id: "PRODORP", quantity: 1 },
    { id: "PRODUCTTT", quantity: 1 },
    { id: "PRODUCTID", quantity: 1 }
  ];

  expect(addItem(prevShoppingBag, productId)).toEqual(newShoppingBag);
});

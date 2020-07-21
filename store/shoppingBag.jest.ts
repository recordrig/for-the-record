import shoppingBag, {
  addProductAction,
  checkoutAction,
  removeProductAction,
  updateProductQuantityAction
} from "./shoppingBag";

describe("shoppingBag reducer", () => {
  describe("Add product", () => {
    test("Add product to empty shopping bag", () => {
      const state = [];

      const action = addProductAction("PRODUCTID");

      const newState = [
        {
          id: "PRODUCTID",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Add product to filled shopping bag - most recent addition should be first in the arr", () => {
      const state = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      const action = addProductAction("PRODUCTID");

      const newState = [
        {
          id: "PRODUCTID",
          quantity: 1
        },
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Add product to shopping bag which already contains that product - product entry should be moved to be the first in the arr", () => {
      const state = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTID",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      const action = addProductAction("PRODUCTID");

      const newState = [
        {
          id: "PRODUCTID",
          quantity: 2
        },
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });

  describe("Checkout", () => {
    test("The shopping bag is emptied", () => {
      const state = [
        {
          id: "PRODUCTID",
          quantity: 3
        },
        {
          id: "PRODORP",
          quantity: 1
        }
      ];

      const action = checkoutAction();

      const newState = [];

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });

  describe("Remove product", () => {
    test("Remove product from shopping bag when it's the only product", () => {
      const state = [
        {
          id: "PRODUCTID",
          quantity: 2
        }
      ];

      const action = removeProductAction("PRODUCTID");

      const newState = [];

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Remove product from shopping bag which contains multiple products - order should stay the same", () => {
      const state = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTID",
          quantity: 2
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      const action = removeProductAction("PRODUCTID");

      const newState = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Removing a product when it's not present does NOT error but just returns the original products", () => {
      const state = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      const action = removeProductAction("PRODUCTID");

      const newState = [
        {
          id: "PRODORP",
          quantity: 1
        },
        {
          id: "PRODUCTTT",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Removing a product from empty shopping bag does NOT error but just returns the original empty object", () => {
      const state = [];

      const action = removeProductAction("PRODUCTID");

      const newState = [];

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });

  describe("Update product quantity", () => {
    test("The correct product is updated with the supplied number", () => {
      const state = [
        {
          id: "PRODUCTID",
          quantity: 3
        },
        {
          id: "PRODORP",
          quantity: 1
        }
      ];

      const action = updateProductQuantityAction("PRODUCTID", 1);

      const newState = [
        {
          id: "PRODUCTID",
          quantity: 1
        },
        {
          id: "PRODORP",
          quantity: 1
        }
      ];

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });
});

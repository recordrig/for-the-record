import shoppingBag, {
  addProductAction,
  removeProductAction
} from "./shoppingBag";

describe("shoppingBag reducer", () => {
  test("Check the shoppingBag data structure and throw if invalid", () => {
    const faultyState = {
      PRODUCTID: {
        id: "WRONG",
        quantity: 1
      }
    };

    const action = addProductAction("PRODUCTID");

    expect(() => {
      shoppingBag(faultyState, action);
    }).toThrow();
  });

  describe("Add product", () => {
    test("Add product to empty shopping bag", () => {
      const state = {};

      const action = addProductAction("PRODUCTID");

      const newState = {
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Add product to shopping bag with different products", () => {
      const state = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        }
      };

      const action = addProductAction("PRODUCTID");

      const newState = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        },
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Add product to shopping bag which already contains that product (increase quantity)", () => {
      const state = {
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        }
      };

      const action = addProductAction("PRODUCTID");

      const newState = {
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 2
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Add product to shopping bag which already contains that product as well as different products", () => {
      const state = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        },
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        }
      };

      const action = addProductAction("PRODUCTID");

      const newState = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        },
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 2
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });

  describe("Remove product", () => {
    test("Remove product from shopping bag when it's the only product", () => {
      const state = {
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        }
      };

      const action = removeProductAction("PRODUCTID");

      const newState = {};

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Remove product from shopping bag which contains multiple of that product (decrease quantity)", () => {
      const state = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 2
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        }
      };

      const action = removeProductAction("PRODUCTID");

      const newState = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTID: {
          id: "PRODUCTID",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Removing a product when it's not present does NOT error but just returns the original products", () => {
      const state = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        }
      };

      const action = removeProductAction("PRODUCTID");

      const newState = {
        PRODORP: {
          id: "PRODORP",
          quantity: 1
        },
        PRODUCTTT: {
          id: "PRODUCTTT",
          quantity: 1
        }
      };

      expect(shoppingBag(state, action)).toEqual(newState);
    });

    test("Removing a product from empty shopping bag does NOT error but just returns the original empty object", () => {
      const state = {};

      const action = removeProductAction("PRODUCTID");

      const newState = {};

      expect(shoppingBag(state, action)).toEqual(newState);
    });
  });
});

import {
  checkProductQuantities,
  checkTotalPrice,
  validateShoppingBag
} from "./shoppingBag";

const productsData = {
  PROD1: {
    name: "Product 1",
    price: 200000,
    quantityLimit: 2
  },
  PROD2: {
    name: "Product 2",
    price: 250000,
    quantityLimit: 4
  }
};

const totalPriceLimit = 500000;

describe("Shopping bag utilities", () => {
  describe("checkProductQuantities", () => {
    test("Throws error if it cannot find a product's ID", () => {
      const products = [
        {
          id: "PROD1",
          name: "Product 1",
          price: 200000,
          quantity: 1
        },
        {
          id: "PROD999",
          name: "Product 2",
          price: 250000,
          quantity: 1
        }
      ];

      expect(() => {
        checkProductQuantities(products, productsData);
      }).toThrow();
    });

    test("Returns no errors if product quantities are ok", () => {
      const products = [
        {
          id: "PROD1",
          quantity: 1,
          name: "Product 1"
        },
        {
          id: "PROD2",
          quantity: 2,
          name: "Product 2"
        }
      ];

      const result = checkProductQuantities(products, productsData);

      expect(result.quantitiesAreValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Returns errors with appropriate description if quantities are NOT ok", () => {
      const products = [
        {
          id: "PROD1",
          quantity: 1,
          name: "Product 1"
        },
        {
          id: "PROD2",
          quantity: 5,
          name: "Product 2"
        }
      ];

      const result = checkProductQuantities(products, productsData);

      expect(result.quantitiesAreValid).toEqual(false);
      expect(result.errors.length).toEqual(1);
      expect(result.errors[0].id).toEqual("productQuantity");
      expect(result.errors[0].description).toContain("Product 2");
      expect(result.errors[0].product).toEqual("PROD2");
    });
  });

  describe("checkTotalPrice", () => {
    test("Returns no error if total price does NOT exceed the limit", () => {
      const products = [
        {
          quantity: 1,
          price: 100000
        },
        {
          quantity: 2,
          price: 200000
        }
      ];

      const result = checkTotalPrice(products, totalPriceLimit);

      expect(result.totalPriceIsValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Returns error if total price DOES exceed the limit", () => {
      const products = [
        {
          quantity: 4,
          price: 100000
        },
        {
          quantity: 4,
          price: 200000
        }
      ];

      const result = checkTotalPrice(products, totalPriceLimit);

      // expect(result.totalPriceIsValid).toEqual(false);
      expect(result.errors.length).toEqual(1);
      expect(result.errors[0].id).toEqual("totalPrice");
      expect(typeof result.errors[0].description).toBe("string");
    });
  });

  describe("validateShoppingBag", () => {
    test("Accepts a valid shopping bag", () => {
      const products = [
        {
          id: "PROD1",
          quantity: 1,
          name: "Product 1",
          price: 100000
        },
        {
          id: "PROD2",
          quantity: 2,
          name: "Product 2",
          price: 200000
        }
      ];

      const result = validateShoppingBag(
        products,
        productsData,
        totalPriceLimit
      );

      expect(result.shoppingBagIsValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Does not accept invalid shopping bag and lists errors", () => {
      const products = [
        {
          id: "PROD1",
          quantity: 1,
          name: "Product 1",
          price: 100000
        },
        {
          id: "PROD2",
          quantity: 5,
          name: "Product 2",
          price: 200000
        }
      ];

      const result = validateShoppingBag(
        products,
        productsData,
        totalPriceLimit
      );

      expect(result.shoppingBagIsValid).toEqual(false);
      expect(result.errors.length).toEqual(2);
    });
  });
});

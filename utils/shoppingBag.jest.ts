import {
  checkProductQuantities,
  checkTotalPrice,
  validateShoppingBag
} from "./shoppingBag";

describe("Shopping bag utilities", () => {
  describe("checkProductQuantities", () => {
    test("Returns no errors incase if none of the quantities exceed 4", () => {
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

      const result = checkProductQuantities(products);

      expect(result.quantitiesAreValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Returns errors with appropriate description if a product quantity does exceed 4", () => {
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

      const result = checkProductQuantities(products);

      expect(result.quantitiesAreValid).toEqual(false);
      expect(result.errors.length).toEqual(1);
      expect(result.errors[0].id).toEqual("productQuantity");
      expect(result.errors[0].description).toContain("Product 2");
      expect(result.errors[0].product).toEqual("PROD2");
    });
  });

  describe("checkTotalPrice", () => {
    test("Returns no error if total price does not exceed 10K", () => {
      const products = [
        {
          quantity: 1,
          price: 1000
        },
        {
          quantity: 2,
          price: 2000
        }
      ];

      const result = checkTotalPrice(products);

      expect(result.totalPriceIsValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Returns error if total price does exceed 10K", () => {
      const products = [
        {
          quantity: 4,
          price: 1000
        },
        {
          quantity: 4,
          price: 2000
        }
      ];

      const result = checkTotalPrice(products);

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
          price: 1000
        },
        {
          id: "PROD2",
          quantity: 2,
          name: "Product 2",
          price: 2000
        }
      ];

      const result = validateShoppingBag(products);

      expect(result.shoppingBagIsValid).toEqual(true);
      expect(result.errors.length).toEqual(0);
    });

    test("Does not accept invalid shopping bag and lists errors", () => {
      const products = [
        {
          id: "PROD1",
          quantity: 1,
          name: "Product 1",
          price: 1000
        },
        {
          id: "PROD2",
          quantity: 5,
          name: "Product 2",
          price: 2000
        }
      ];

      const result = validateShoppingBag(products);

      expect(result.shoppingBagIsValid).toEqual(false);
      expect(result.errors.length).toEqual(2);
    });
  });
});

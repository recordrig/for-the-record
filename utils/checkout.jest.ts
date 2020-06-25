// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import {
  completeProductsData,
  validateProductsForCheckout,
  structureProductsForCheckout
} from "./checkout";

const productsData = {
  PRODUCT1: {
    name: "Product 1",
    price: 200000,
    quantityLimit: 2
  },
  PRODUCT2: {
    name: "Product 2",
    price: 250000,
    quantityLimit: 4
  }
};

describe("Stripe utilities", () => {
  describe("completeProductsData", () => {
    test("Adds price and name fields", () => {
      const products = [
        {
          id: "PRODUCT1",
          quantity: 1
        },
        {
          id: "PRODUCT2",
          quantity: 2
        }
      ];

      const expectedResult = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 2
        }
      ];

      const result = completeProductsData(products, productsData);
      expect(result).toEqual(expectedResult);
    });

    test("Errors if it cannot find a product's ID", () => {
      const products = [
        {
          id: "PRODUCT1",
          quantity: 1
        },
        {
          id: "PRODUCT 2020",
          quantity: 2
        }
      ];

      expect(() => {
        completeProductsData(products, productsData);
      }).toThrow();
    });
  });

  describe("validateProductsForCheckout", () => {
    test("Does nothing if total price and quantities are valid", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 1
        }
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).not.toThrow();
    });

    test("Errors if it cannot find a product's ID", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1
        },
        {
          id: "PRODUCT9000",
          name: "Product 2",
          price: 250000,
          quantity: 1
        }
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow();
    });

    test("Errors if a product's quantity exceeds its quantity limit", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 8
        },
        {
          id: "PRODUCT9000",
          name: "Product 2",
          price: 250000,
          quantity: 1
        }
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow();
    });

    test("Errors if the total price exceeds the total price limit", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 8
        },
        {
          id: "PRODUCT9000",
          name: "Product 2",
          price: 250000,
          quantity: 1
        }
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow();
    });
  });

  describe("prepareProductsForCheckout", () => {
    test("Changes the structure into Stripe's required format", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 2
        }
      ];

      const expectedResult = [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Product 1",
              metadata: {
                id: "PRODUCT1"
              },
              unit_amount: 200000
            }
          },
          quantity: 1
        },
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Product 2",
              metadata: {
                id: "PRODUCT2"
              },
              unit_amount: 250000
            }
          },
          quantity: 2
        }
      ];

      const result = structureProductsForCheckout(products);
      expect(result).toEqual(expectedResult);
    });
  });
});

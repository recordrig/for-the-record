// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import { prepareProductsForCheckout } from "./checkout";

const productsData = {
  PRODUCT1: {
    name: "Product 1",
    price: 200000
  },
  PRODUCT2: {
    name: "Product 2",
    price: 250000
  }
};

describe("Stripe utilities", () => {
  describe("prepareProductsForCheckout", () => {
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

      const result = prepareProductsForCheckout(products, productsData);
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
        prepareProductsForCheckout(products, productsData);
      }).toThrow();
    });
  });
});

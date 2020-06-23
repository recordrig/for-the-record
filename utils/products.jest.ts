import { validateProductIds, addPriceToProducts } from "./products";

describe("Products utilities", () => {
  describe("validateProductIds", () => {
    test("Does nothing if valid", () => {
      const products = [
        {
          id: "PRODUCT1"
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT2: {
          name: "Product 2",
          price: 4000
        }
      };

      expect(() => {
        validateProductIds(products, productsData);
      }).not.toThrow();
    });

    test("Errors if it cannot find a product's ID", () => {
      const products = [
        {
          id: "PRODUCT1"
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT3: {
          name: "Product 3",
          price: 4000
        }
      };

      expect(() => {
        validateProductIds(products, productsData);
      }).toThrow();
    });
  });

  describe("addPriceToProducts", () => {
    test("Adds the appropriate price field to valid products", () => {
      const products = [
        {
          id: "PRODUCT1"
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT2: {
          name: "Product 2",
          price: 4000
        }
      };

      const expectedResult = [
        {
          id: "PRODUCT1",
          price: 5000
        },
        {
          id: "PRODUCT2",
          price: 4000
        }
      ];

      const result = addPriceToProducts(products, productsData);
      expect(result).toEqual(expectedResult);
    });

    test("Keeps any additional fields intact", () => {
      const products = [
        {
          id: "PRODUCT1",
          additionalField: "content"
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT2: {
          name: "Product 2",
          price: 4000
        }
      };

      const expectedResult = [
        {
          id: "PRODUCT1",
          price: 5000,
          additionalField: "content"
        },
        {
          id: "PRODUCT2",
          price: 4000
        }
      ];

      const result = addPriceToProducts(products, productsData);
      expect(result).toEqual(expectedResult);
    });

    test("Overrides price if it already existed", () => {
      const products = [
        {
          id: "PRODUCT1",
          price: 2000
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT2: {
          name: "Product 2",
          price: 4000
        }
      };

      const expectedResult = [
        {
          id: "PRODUCT1",
          price: 5000
        },
        {
          id: "PRODUCT2",
          price: 4000
        }
      ];

      const result = addPriceToProducts(products, productsData);
      expect(result).toEqual(expectedResult);
    });

    test("Errors when a product ID is invalid, halting execution", () => {
      const products = [
        {
          id: "PRODUCT1"
        },
        {
          id: "PRODUCT2"
        }
      ];

      const productsData = {
        PRODUCT1: {
          name: "Product 1",
          price: 5000
        },
        PRODUCT3: {
          name: "Product 3",
          price: 4000
        }
      };

      expect(() => {
        addPriceToProducts(products, productsData);
      }).toThrow();
    });
  });
});

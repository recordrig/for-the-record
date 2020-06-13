import {
  extractPrices,
  formatCurrency,
  priceWithoutTax,
  sumTotal
} from "./prices";

describe("Prices utilities", () => {
  describe("extractPrices", () => {
    test("Extracts prices correctly", () => {
      const products = [
        {
          price: 5000,
          quantity: 1
        },
        {
          price: 5000,
          quantity: 2
        }
      ];

      const result = extractPrices(products);
      const expectedResult = [5000, 10000];

      expect(result).toEqual(expectedResult);
    });

    test("Accepts & ignores any additional fields", () => {
      const prices = [
        {
          id: "A",
          price: 5000,
          quantity: 1
        },
        {
          id: "B",
          price: 5000,
          quantity: 2
        }
      ];

      const result = extractPrices(prices);
      const expectedResult = [5000, 10000];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("formatCurrency", () => {
    test("Formats the currency per the Netherlands locale", () => {
      const price = 250000;
      const result = formatCurrency(price);
      const expectedResult = "€ 2500,00";

      expect(result).toEqual(expectedResult);
    });

    test("Does not include cents if this options was passed", () => {
      const price = 250000;
      const result = formatCurrency(price, true);
      const expectedResult = "€ 2500";

      expect(result).toEqual(expectedResult);
    });

    test("Errors on floats", () => {
      const price = 49.99;

      expect(() => {
        formatCurrency(price);
      }).toThrow();
    });
  });

  describe("priceWithoutTax", () => {
    test("Returns the price excluding Dutch VAT (21%)", () => {
      const price = 250000;
      const result = priceWithoutTax(price);
      const expectedResult = 206612;

      expect(result).toEqual(expectedResult);
    });

    test("Errors on floats", () => {
      const price = 49.99;

      expect(() => {
        priceWithoutTax(price);
      }).toThrow();
    });
  });

  describe("sumTotal", () => {
    test("Sums prices correctly", () => {
      const prices = [5000, 10000];
      const result = sumTotal(prices);
      const expectedResult = 15000;

      expect(result).toEqual(expectedResult);
    });

    test("Errors on floats", () => {
      const prices = [5000, 49.99];

      expect(() => {
        sumTotal(prices);
      }).toThrow();
    });
  });
});

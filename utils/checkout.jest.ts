// We are integrating with Stripe in this file, so we'll turn this off.
/* eslint-disable @typescript-eslint/camelcase */
import StripeTypes from "stripe";
import {
  completeProductsData,
  validateProductsForCheckout,
  structureProductsForCheckout,
  createOrderConfirmationEmailTemplate,
} from "./checkout";

const productsData = {
  PRODUCT1: {
    name: "Product 1",
    price: 200000,
    quantityLimit: 2,
  },
  PRODUCT2: {
    name: "Product 2",
    price: 250000,
    quantityLimit: 4,
  },
};

describe("Stripe utilities", () => {
  describe("completeProductsData", () => {
    test("Adds price and name fields", () => {
      const products = [
        {
          id: "PRODUCT1",
          quantity: 1,
        },
        {
          id: "PRODUCT2",
          quantity: 2,
        },
      ];

      const expectedResult = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1,
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 2,
        },
      ];

      const result = completeProductsData(products, productsData);
      expect(result).toEqual(expectedResult);
    });

    test("Errors if it cannot find a product's ID", () => {
      const products = [
        {
          id: "PRODUCT1",
          quantity: 1,
        },
        {
          id: "PRODUCT 2020",
          quantity: 2,
        },
      ];

      expect(() => {
        completeProductsData(products, productsData);
      }).toThrow();
    });
  });

  describe("validateProductsForCheckout", () => {
    test("Does nothing if all fields are valid", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1,
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 1,
        },
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
          quantity: 1,
        },
        {
          id: "PRODUCT9000",
          name: "Product 2",
          price: 250000,
          quantity: 1,
        },
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow();
    });

    test("Does NOT error if fields are valid, but in a different order", () => {
      const products = [
        {
          id: "PRODUCT1",
          quantity: 1,
          name: "Product 1",
          price: 200000,
        },
        {
          id: "PRODUCT2",
          quantity: 1,
          name: "Product 2",
          price: 250000,
        },
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).not.toThrow();
    });

    test("Errors with description if an extra, unexpected field was passed", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 8,
          foo: "bar",
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 1,
        },
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow("Product fields are invalid.");
    });

    test("Errors with description if the total price exceeds the total price limit", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 8,
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 1,
        },
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow("Total price is invalid.");
    });

    test("Errors with description if a product's quantity exceeds its quantity limit", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 2,
          quantity: 3,
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 1,
        },
      ];

      expect(() => {
        validateProductsForCheckout(products, productsData, 500000);
      }).toThrow("Product quantities are invalid.");
    });
  });

  describe("prepareProductsForCheckout", () => {
    test("Changes the structure into Stripe's required format", () => {
      const products = [
        {
          id: "PRODUCT1",
          name: "Product 1",
          price: 200000,
          quantity: 1,
        },
        {
          id: "PRODUCT2",
          name: "Product 2",
          price: 250000,
          quantity: 2,
        },
      ];

      const expectedResult: StripeTypes.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: "eur",
            unit_amount: 200000,
            product_data: {
              name: "Product 1",
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "eur",
            unit_amount: 250000,
            product_data: {
              name: "Product 2",
            },
          },
          quantity: 2,
        },
      ];

      const result = structureProductsForCheckout(products);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("createOrderConfirmationEmailTemplate", () => {
    test("Takes Stripe data and converts it to the appropriate SendGrid templates structure", () => {
      const products = [
        {
          id: "li_12345",
          object: "item",
          amount_subtotal: 250000,
          amount_total: 250000,
          currency: "eur",
          description: "RecordRig - Stealth Black",
          price: {
            id: "price_12345",
            object: "price",
            active: false,
            billing_scheme: "per_unit",
            created: 1594724633,
            currency: "eur",
            livemode: false,
            lookup_key: null,
            metadata: {},
            nickname: null,
            product: "prod_12345",
            recurring: null,
            tiers_mode: null,
            transform_quantity: null,
            type: "one_time",
            unit_amount: 250000,
            unit_amount_decimal: "250000",
          },
          quantity: 1,
        },
        {
          id: "li_12345",
          object: "item",
          amount_subtotal: 500000,
          amount_total: 500000,
          currency: "eur",
          description: "RecordRig - Pristine White",
          price: {
            id: "price_12345",
            object: "price",
            active: false,
            billing_scheme: "per_unit",
            created: 1594724633,
            currency: "eur",
            livemode: false,
            lookup_key: null,
            metadata: {},
            nickname: null,
            product: "prod_12345",
            recurring: null,
            tiers_mode: null,
            transform_quantity: null,
            type: "one_time",
            unit_amount: 250000,
            unit_amount_decimal: "250000",
          },
          quantity: 2,
        },
      ] as StripeTypes.ApiList<StripeTypes.LineItem>["data"];

      const total = 750000;
      const customerEmail = "geraldo@rivia.vengerberg";

      const shippingInfo = {
        name: "Geralt of Rivia",
        line1: "Somestreet 124",
        postalCode: "ABABAB 99",
        city: "Vengerberg",
        country: "Netherlands",
      };

      const billingInfo = {
        name: "Geralt of Rivia",
        line1: "Billingstrt 124",
        line2: "Another line",
        postalCode: "NONO 50",
        city: "Novigrad",
        country: "Netherlands",
      };

      const expectedResult = {
        products: [
          {
            name: "RecordRig - Stealth Black",
            amount: 1,
            price: "€2.500,00",
            img: "https://recordrig.com/recordrig-black.png",
          },
          {
            name: "RecordRig - Pristine White",
            amount: 2,
            price: "€5.000,00",
            img: "https://recordrig.com/recordrig.png",
          },
        ],
        total: "€7.500,00",
        customerEmail: "geraldo@rivia.vengerberg",
        shippingAddress: {
          name: "Geralt of Rivia",
          line1: "Somestreet 124",
          postalCode: "ABABAB 99",
          city: "Vengerberg",
          country: "Netherlands",
        },
        billingAddress: {
          name: "Geralt of Rivia",
          line1: "Billingstrt 124",
          line2: "Another line",
          postalCode: "NONO 50",
          city: "Novigrad",
          country: "Netherlands",
        },
      };

      const result = createOrderConfirmationEmailTemplate(
        products,
        total,
        customerEmail,
        shippingInfo,
        billingInfo
      );
      expect(result).toEqual(expectedResult);
    });
  });
});

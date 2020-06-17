import { extractPrices, sumTotal } from "./prices";

type ErrorIds = "totalPrice" | "productQuantity";

interface QuantityError {
  readonly id: ErrorIds;
  readonly description: string;
  readonly product: string;
}

export const checkProductQuantities = (
  products: readonly {
    readonly id: string;
    readonly quantity: number;
    readonly name: string;
  }[]
): {
  readonly quantitiesAreValid: boolean;
  readonly errors: readonly QuantityError[];
} => {
  const productsWhichExceed = products.filter(product => product.quantity > 4);
  if (productsWhichExceed.length === 0)
    return { quantitiesAreValid: true, errors: [] };
  const errors: readonly QuantityError[] = productsWhichExceed.map(product => {
    return {
      id: "productQuantity",
      description: `The product quantity for ${product.name} exceeds 4. Modify the amount for this products so that it is set between 1 and 4.`,
      product: product.id
    };
  });
  return {
    quantitiesAreValid: false,
    errors
  };
};

interface TotalPriceError {
  readonly id: ErrorIds;
  readonly description: string;
}

export const checkTotalPrice = (
  products: readonly {
    readonly quantity: number;
    readonly price: number;
  }[]
): {
  readonly totalPriceIsValid: boolean;
  readonly errors: readonly TotalPriceError[];
} => {
  const prices = extractPrices(products);
  const total = sumTotal(prices);
  if (total <= 10000) return { totalPriceIsValid: true, errors: [] };
  return {
    totalPriceIsValid: false,
    errors: [
      {
        id: "totalPrice",
        description:
          "The total price for all products exceeds the €10.000 threshold. Modify your shopping bag contents so that the total price remains below this amount."
      }
    ]
  };
};

/**
 * Checks if Shopping Bag is ok to check out.
 */
export const validateShoppingBag = (
  products: readonly {
    readonly id: string;
    readonly quantity: number;
    readonly name: string;
    readonly price: number;
  }[]
): {
  readonly shoppingBagIsValid: boolean;
  readonly errors: readonly (QuantityError | TotalPriceError)[];
} => {
  const quantitiesResult = checkProductQuantities(products);
  const priceResult = checkTotalPrice(products);
  return {
    shoppingBagIsValid:
      quantitiesResult.quantitiesAreValid && priceResult.totalPriceIsValid,
    errors: [...quantitiesResult.errors, ...priceResult.errors]
  };
};

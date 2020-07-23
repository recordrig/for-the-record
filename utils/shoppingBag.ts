import { extractPrices, formatCurrency, sumTotal } from "./prices";
import { validateProductIds } from "./products";

type ErrorIds = "totalPrice" | "productQuantity";

interface QuantityError {
  id: ErrorIds;
  description: string;
  product: string;
}

/**
 * Checks all passed product quantities against passed, assumed to be valid product data
 * and will return a list of errors if there are any, intended to be user feedback.
 *
 * Will THROW an error if the product ID's aren't found (it cannot possibly validate quantities
 * if these are not found).
 */
export const checkProductQuantities = (
  products: {
    id: string;
    quantity: number;
    name: string;
  }[],
  productsData: Record<
    string,
    {
      name: string;
      price: number;
      quantityLimit: number;
    }
  >
): {
  quantitiesAreValid: boolean;
  errors: QuantityError[];
} => {
  validateProductIds(products, productsData);

  const productsWhichExceed = products.filter(
    (product) => product.quantity > productsData[product.id].quantityLimit
  );

  if (productsWhichExceed.length === 0)
    return { quantitiesAreValid: true, errors: [] };

  const errors: QuantityError[] = productsWhichExceed.map((product) => {
    const limit = productsData[product.id].quantityLimit;
    return {
      id: "productQuantity",
      description: `The product quantity for ${product.name} exceeds ${limit}. Modify the amount for this product so that it is set between 1 and ${limit}.`,
      product: product.id,
    };
  });

  return {
    quantitiesAreValid: false,
    errors,
  };
};

interface TotalPriceError {
  id: ErrorIds;
  description: string;
}

/**
 * Chekcs if the total price of the passed products does not exceed the passed checkout limit.
 * Returns a list of errors for user feedback.
 */
export const checkTotalPrice = (
  products: {
    quantity: number;
    price: number;
  }[],
  totalPriceLimit: number
): {
  totalPriceIsValid: boolean;
  errors: TotalPriceError[];
} => {
  const prices = extractPrices(products);
  const total = sumTotal(prices);

  if (total <= totalPriceLimit) return { totalPriceIsValid: true, errors: [] };

  return {
    totalPriceIsValid: false,
    errors: [
      {
        id: "totalPrice",
        description: `The total price for all products exceeds the ${formatCurrency(
          totalPriceLimit
        )} threshold. Modify your shopping bag contents so that the total price remains below this amount.`,
      },
    ],
  };
};

/**
 * Checks if Shopping Bag is ok to check out. Will return a list of descriptive errors for
 * user feedback if that's not yet the case.
 */
export const validateShoppingBag = (
  products: {
    id: string;
    quantity: number;
    name: string;
    price: number;
  }[],
  productsData: Record<
    string,
    {
      name: string;
      price: number;
      quantityLimit: number;
    }
  >,
  totalPriceLimit: number
): {
  shoppingBagIsValid: boolean;
  errors: (QuantityError | TotalPriceError)[];
} => {
  const quantitiesResult = checkProductQuantities(products, productsData);
  const priceResult = checkTotalPrice(products, totalPriceLimit);

  return {
    shoppingBagIsValid:
      quantitiesResult.quantitiesAreValid && priceResult.totalPriceIsValid,
    errors: [...quantitiesResult.errors, ...priceResult.errors],
  };
};

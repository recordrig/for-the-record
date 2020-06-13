// We do not process floats because it can make our computations unreliable.
const checkInteger = (price: number): void => {
  const strPrice = price.toString();
  if (strPrice.includes(".") || strPrice.includes(","))
    throw new Error(
      `Price was passed as a float instead of an integer: ${price}. Pass your price as a whole number, cents included (e.g. "49.99" should instead be "4999").`
    );
};

/**
 * Accepts an array of products which should have at least a `price` and `quantity` field.
 * Will return an array of total prices per entry.
 *
 * E.g. if there is only one product in the list and this product's `price` is 5000 and has a
 * `quantity` of 2, it will return `[10000]`.
 */
export const extractPrices = (
  products: readonly {
    readonly price: number;
    readonly quantity: number;
  }[]
): readonly number[] => products.map(({ price, quantity }) => price * quantity);

/**
 * Accepts a number assumed to be a monetary value in cents, and returns a formatted string
 * ready to render in the frontend. Passing `round = true` will return the formatted price
 * WITHOUT cents.
 *
 * E.g. if it receives a number `5000`, it will return `"€ 50,00"`.
 */
export const formatCurrency = (intPrice: number, noCents = false): string => {
  checkInteger(intPrice);
  const strPrice = intPrice.toString();
  const priceWithoutCents = strPrice.slice(0, -2);
  const cents = strPrice.slice(-2);
  const priceWithCents = `${priceWithoutCents},${cents}`;
  return `€ ${noCents ? priceWithoutCents : priceWithCents}`;
};

/**
 * Accepts a number which is assumed to be the total price including tax, and will return the
 * price without this tax.
 */
export const priceWithoutTax = (priceIncludingTax: number): number => {
  checkInteger(priceIncludingTax);
  return Math.round(priceIncludingTax / 1.21);
};

/**
 * Accepts an array of prices and will return the sum total.
 */
export const sumTotal = (prices: readonly number[]): number =>
  prices.reduce((accumulator, currentValue) => {
    checkInteger(currentValue);
    return accumulator + currentValue;
  });

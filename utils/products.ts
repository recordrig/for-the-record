interface DataProduct {
  readonly name: string;
  readonly price: number;
}

type DataProducts = Record<string, DataProduct>;

/**
 * Validate that products passed actually exist as valid data (by ID).
 */
export const validateProductIds = (
  products: readonly {
    readonly id: string;
  }[],
  productsData: DataProducts
): void => {
  products.forEach(product => {
    const foundId = Object.keys(productsData).find(key => key === product.id);
    if (!foundId)
      throw new Error(
        `Product with ID ${product.id} was not found in the products data.`
      );
  });
};

/**
 * Accepts an array of products which should have at least an `id` field, along with
 * the valid products data to base the new products list on.
 * Will return an array of of the original products, but including a `price` field.
 */
// eslint-disable-next-line import/prefer-default-export
export const addPriceToProducts = (
  products: readonly {
    readonly id: string;
  }[],
  productsData: DataProducts
): readonly {
  readonly id: string;
  readonly price: number;
}[] => {
  validateProductIds(products, productsData);
  return products.map(product => ({
    ...product,
    price: productsData[product.id].price
  }));
};

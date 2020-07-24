interface DataProduct {
  name: string;
  price: number;
}

type DataProducts = Record<string, DataProduct>;

/**
 * Validate that products passed actually exist as valid data (by ID).
 */
export const validateProductIds = (
  products: {
    id: string;
  }[],
  productsData: DataProducts
): void => {
  products.forEach((product) => {
    const foundId = Object.keys(productsData).find((key) => key === product.id);
    if (!foundId)
      throw new Error(
        `Product with ID ${product.id} was not found in the products data.`
      );
  });
};

/**
 * Accepts an array of products which should have at least an `id` field, along with
 * the valid products data to base the new products list on.
 *
 * Will return an array of of the original products, but including a `price` field.
 */
export const addPriceToProducts = (
  products: {
    id: string;
  }[],
  productsData: DataProducts
): {
  id: string;
  price: number;
}[] => {
  validateProductIds(products, productsData);
  return products.map((product) => ({
    ...product,
    price: productsData[product.id].price,
  }));
};

/**
 * Accepts an array of products which should have at least an `id` field, along with
 * the valid products data to base the new products list on.
 *
 * Will return an array of of the original products, but including a `name` field.
 */
export const addNameToProducts = (
  products: {
    id: string;
  }[],
  productsData: DataProducts
): {
  id: string;
  name: string;
}[] => {
  validateProductIds(products, productsData);
  return products.map((product) => ({
    ...product,
    name: productsData[product.id].name,
  }));
};

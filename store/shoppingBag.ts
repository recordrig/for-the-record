export interface ShoppingBagProduct {
  id: string;
  quantity: number;
}

export interface ShoppingBag {
  [key: string]: ShoppingBagProduct;
}

/**
 * Check if all product ID's match their corresponding object key.
 */
export const validateShoppingBag = (shoppingBag: ShoppingBag): boolean => {
  Object.entries(shoppingBag).forEach(([objKey, product]) => {
    if (objKey !== product.id) {
      throw new Error(
        `Shopping bag data is invalid:
        Product ID (${product.id}) does not match its object's key (${objKey}).`
      );
    }
  });
  return true;
};

export const addProduct = (
  shoppingBag: ShoppingBag,
  productId: ShoppingBagProduct["id"]
): ShoppingBag => {
  validateShoppingBag(shoppingBag);

  // If the shopping bag is empty or if the shopping bag does NOT contain this item yet,
  // add it to the collection.
  if (Object.keys(shoppingBag).length === 0 || !(productId in shoppingBag)) {
    return {
      ...shoppingBag,
      [productId]: {
        id: productId,
        quantity: 1
      }
    };
  }

  // Find the product which should be present already, and update its quantity.
  return Object.assign({}, shoppingBag, {
    [productId]: {
      id: productId,
      quantity: shoppingBag[productId].quantity + 1
    }
  });
};

export const removeProduct = (
  shoppingBag: ShoppingBag,
  productId: ShoppingBagProduct["id"]
): ShoppingBag => {
  validateShoppingBag(shoppingBag);

  // If at least 2 of these products are already in the shopping bag, we'll decrease its quantity.
  if (productId in shoppingBag && shoppingBag[productId].quantity >= 2) {
    return {
      ...shoppingBag,
      [productId]: {
        id: productId,
        quantity: shoppingBag[productId].quantity - 1
      }
    };
  }

  // Remove the product from the shopping bag by splitting it in two, and only returning the
  // remaining products that do not match the productId we were looking for.
  const { [productId]: product, ...newShoppingBag } = shoppingBag;

  return newShoppingBag;
};

// TODO: reducer
const reducer = {};

export default reducer;

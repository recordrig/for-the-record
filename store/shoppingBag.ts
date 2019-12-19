interface ShoppingBagItem {
  id: string;
  quantity: number;
}

export const addItem = (
  shoppingBag: ShoppingBagItem[],
  productId: ShoppingBagItem["id"]
): ShoppingBagItem[] => {
  // If the shopping bag is empty, return it early with the freshly stuffed in product.
  if (shoppingBag.length === 0) return [{ id: productId, quantity: 1 }];

  // If the shopping bag does NOT contain this item yet, add it to the end of the list.
  if (!shoppingBag.some(product => product.id === productId)) {
    return {
      ...shoppingBag
    };
  }

  return shoppingBag.map(product => {
    // If the product is already in the shopping bag, replace it with updated quantity.
    if (product.id === productId) {
      return { ...product, quantity: product.quantity + 1 };
    }
    // If this is not the product we were looking for, keep this product as it is.
    return product;
  });
};

// TODO: reducer
const reducer = {};

export default reducer;

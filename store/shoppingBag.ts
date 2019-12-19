interface ShoppingBagItem {
  id: string;
  quantity: number;
}

interface ShoppingBag extends Array<ShoppingBagItem> {}

export const addItem = (
  prevShoppingBag: ShoppingBag,
  productId: ShoppingBagItem["id"]
): ShoppingBag => {
  // If the shopping bag is empty, return it early with the freshly stuffed in product.
  if (prevShoppingBag.length === 0) return [{ id: productId, quantity: 1 }];
  return prevShoppingBag.map(product => {
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

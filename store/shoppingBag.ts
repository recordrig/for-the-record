// Shared interfaces.
// -----------------------------------------------------------/

export interface ShoppingBagProduct {
  readonly id: string;
  readonly quantity: number;
}

// Action types.
// -----------------------------------------------------------/

enum ActionTypes {
  ADD_PRODUCT = "shoppingBag/ADD_PRODUCT",
  CHECKOUT = "shoppingBag/CHECKOUT",
  REMOVE_PRODUCT = "shoppingBag/REMOVE_PRODUCT",
  UPDATE_PRODUCT_QUANTITY = "shoppingBag/UPDATE_PRODUCT_QUANTITY"
}

// Action creators.
// -----------------------------------------------------------/

interface AddProductAction {
  readonly type: ActionTypes.ADD_PRODUCT;
  /**
   * The Product ID of the to-be added product.
   */
  readonly payload: {
    readonly id: string;
  };
}

export const addProductAction = (
  id: AddProductAction["payload"]["id"]
): AddProductAction => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: {
      id
    }
  };
};

interface CheckoutAction {
  readonly type: ActionTypes.CHECKOUT;
}

export const checkoutAction = (): CheckoutAction => {
  return {
    type: ActionTypes.CHECKOUT
  };
};

interface RemoveProductAction {
  readonly type: ActionTypes.REMOVE_PRODUCT;
  /**
   * The Product ID of the to-be removed product.
   */
  readonly payload: {
    readonly id: string;
  };
}

export const removeProductAction = (
  id: AddProductAction["payload"]["id"]
): RemoveProductAction => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: {
      id
    }
  };
};

interface UpdateProductQuantityAction {
  readonly type: ActionTypes.UPDATE_PRODUCT_QUANTITY;
  readonly payload: {
    /**
     * The Product ID of the to-be updated product.
     */
    readonly id: string;
    readonly newQuantity: number;
  };
}

export const updateProductQuantityAction = (
  id: UpdateProductQuantityAction["payload"]["id"],
  newQuantity: UpdateProductQuantityAction["payload"]["newQuantity"]
): UpdateProductQuantityAction => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_QUANTITY,
    payload: {
      id,
      newQuantity
    }
  };
};

// Reducer helper functions.
// -----------------------------------------------------------/

// Add product to Shopping Bag by ID. The product will be added at the top of the list.
const addProduct = (
  shoppingBag: readonly ShoppingBagProduct[],
  productId: ShoppingBagProduct["id"]
): readonly ShoppingBagProduct[] => {
  // Find the product in the current Shopping Bag (if it exists).
  const previousProductEntry = shoppingBag.find(
    product => product.id === productId
  );

  // Check if the product was already in the Bag and if so, re-insert with the
  // updated quantity.
  if (previousProductEntry !== undefined) {
    // First remove the product from the array so that we can insert it in the
    // appropriate place (at the start).
    const filteredShoppingBag = shoppingBag.filter(
      product => product.id !== productId
    );

    // Return a filtered Shopping Bag which no longer contains the original Product
    // at its previous entry position. Instead, update the product quantity and insert
    // it at the top.
    return [
      {
        id: productId,
        quantity: previousProductEntry.quantity + 1
      },
      ...filteredShoppingBag
    ];
  }

  // So long as the product wasn't in the Shopping Bag yet we can just return the
  // original Shopping Bag, with the newly added product at the top.
  return [
    {
      id: productId,
      quantity: 1
    },
    ...shoppingBag
  ];
};

// Customer checks out. This empties the Shopping Bag.
const checkout = (): [] => [];

// Simply returns a new array without the product. Doesn't care if the product was
// there to begin with.
const removeProduct = (
  shoppingBag: readonly ShoppingBagProduct[],
  productId: ShoppingBagProduct["id"]
): readonly ShoppingBagProduct[] =>
  shoppingBag.filter(product => product.id !== productId);

// Will update the appropriate product entry in the array. Leaves the original
// order intact.
const updateProductQuantity = (
  shoppingBag: readonly ShoppingBagProduct[],
  productId: ShoppingBagProduct["id"],
  newQuantity: ShoppingBagProduct["quantity"]
): readonly ShoppingBagProduct[] =>
  shoppingBag.map(product =>
    product.id === productId ? { ...product, quantity: newQuantity } : product
  );

// Reducer.
// -----------------------------------------------------------/

type Action =
  | AddProductAction
  | CheckoutAction
  | RemoveProductAction
  | UpdateProductQuantityAction;

const initialState: readonly ShoppingBagProduct[] = [];

const shoppingBag = (
  state = initialState,
  action: Action
): readonly ShoppingBagProduct[] => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return addProduct(state, action.payload.id);
    case ActionTypes.CHECKOUT:
      return checkout();
    case ActionTypes.REMOVE_PRODUCT:
      return removeProduct(state, action.payload.id);
    case ActionTypes.UPDATE_PRODUCT_QUANTITY:
      return updateProductQuantity(
        state,
        action.payload.id,
        action.payload.newQuantity
      );
    default:
      return state;
  }
};

export default shoppingBag;

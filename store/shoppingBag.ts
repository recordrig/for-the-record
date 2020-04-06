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

// Add product to Shopping Bag by ID. A new product will put it first in the list.
// In the case of quantity modifications, the original order is left intact.
const addProduct = (
  shoppingBag: readonly ShoppingBagProduct[],
  productId: ShoppingBagProduct["id"]
): readonly ShoppingBagProduct[] => {
  // If the shopping bag is empty or if the shopping bag does NOT contain this item yet,
  // add it to the start of the collection.
  if (
    shoppingBag.length === 0 ||
    !shoppingBag.find(product => product.id === productId)
  ) {
    return [
      {
        id: productId,
        quantity: 1
      },
      ...shoppingBag
    ];
  }

  return shoppingBag.map(product =>
    product.id === productId
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );
};

const removeProduct = (
  shoppingBag: readonly ShoppingBagProduct[],
  productId: ShoppingBagProduct["id"]
): readonly ShoppingBagProduct[] =>
  shoppingBag.filter(product => product.id !== productId);

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

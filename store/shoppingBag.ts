// Shared interfaces.
// -----------------------------------------------------------/

interface ShoppingBagProduct {
  readonly id: string;
  readonly quantity: number;
}

// Action types.
// -----------------------------------------------------------/

enum ActionTypes {
  ADD_PRODUCT = "shoppingBag/ADD_PRODUCT",
  REMOVE_PRODUCT = "shoppingBag/REMOVE_PRODUCT"
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
): readonly ShoppingBagProduct[] => {
  // If at least 2 of these products are already in the shopping bag, we'll decrease its quantity,
  // leaving the original array order intact.
  if (
    shoppingBag.find(product => product.id === productId) &&
    shoppingBag[shoppingBag.findIndex(product => product.id === productId)]
      .quantity >= 2
  ) {
    return [
      ...shoppingBag,
      {
        id: productId,
        quantity: shoppingBag[productId].quantity - 1
      }
    ];
  }

  const newShoppingBag = Object.fromEntries(
    Object.entries(shoppingBag).filter(([key]) => key !== productId)
  );

  return newShoppingBag;
};

// Reducer.
// -----------------------------------------------------------/

type Action = AddProductAction | RemoveProductAction;

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
    default:
      return state;
  }
};

export default shoppingBag;

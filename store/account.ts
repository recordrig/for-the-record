// Shared interfaces.
// -----------------------------------------------------------/

export interface Account {
  /**
   * The customer ID from Stripe, or `null` if no Stripe customer ID is associated
   * with this account.
   */
  readonly customerId: string | null;
}

// Action types.
// -----------------------------------------------------------/

enum ActionTypes {
  UPDATE_CUSTOMER_ID = "account/UPDATE_CUSTOMER_ID"
}

// Action creators.
// -----------------------------------------------------------/

interface UpdateCustomerIdAction {
  readonly type: typeof ActionTypes.UPDATE_CUSTOMER_ID;
  readonly payload: {
    readonly id: string | null;
  };
}

export const updateCustomerIdAction = (
  id: UpdateCustomerIdAction["payload"]["id"]
): UpdateCustomerIdAction => {
  return {
    type: ActionTypes.UPDATE_CUSTOMER_ID,
    payload: {
      id
    }
  };
};

// Reducer.
// -----------------------------------------------------------/

const initialState: Account = {
  customerId: null
};

// All potential action inputs for the account reducer.
type Action = UpdateCustomerIdAction;

// Account reducer.
const account = (state = initialState, action: Action): Account => {
  switch (action.type) {
    case ActionTypes.UPDATE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload.id
      };
    default:
      return state;
  }
};

export default account;

interface Account {
  /**
   * The customer ID from Stripe, or `null` if no Stripe customer ID is associated
   * with this account.
   */
  customerId: string | null;
}

const prefix = "account";

/**
 * All available account actions.
 */
const actionTypes = {
  UPDATE_CUSTOMER_ID: `${prefix}/UPDATE_CUSTOMER_ID`
};

interface UpdateCustomerIdAction {
  type: typeof actionTypes.UPDATE_CUSTOMER_ID;
  payload: {
    id: string | null;
  };
}

/**
 * Action creator for updating the customer ID in the local state.
 */
const updateCustomerId = (
  id: UpdateCustomerIdAction["payload"]["id"]
): UpdateCustomerIdAction => {
  return {
    type: actionTypes.UPDATE_CUSTOMER_ID,
    payload: {
      id
    }
  };
};

/**
 * All available account actions ("action creators").
 */
export const actions = {
  updateCustomerId
};

const initialState: Account = {
  customerId: null
};

/**
 * All potential action inputs for the account reducer.
 */
type Action = UpdateCustomerIdAction;

/**
 * Account reducer.
 */
const account = (state = initialState, action: Action): Account => {
  switch (action.type) {
    case actionTypes.UPDATE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload.id
      };
    default:
      return state;
  }
};

export default account;

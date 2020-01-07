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
export const actionTypes = {
  UPDATE_CUSTOMER_ID: `${prefix}/UPDATE_CUSTOMER_ID`
};

interface UpdateCustomerIdAction {
  type: typeof actionTypes.UPDATE_CUSTOMER_ID;
  payload: {
    id: string | null;
  };
}

type Action = UpdateCustomerIdAction;

const initialState: Account = {
  customerId: null
};

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

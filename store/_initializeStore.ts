import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import account, { Account } from "./account";
import shoppingBag, { ShoppingBagProduct } from "./shoppingBag";

/**
 * The entire application's state tree structure. Only lists top-level items. Individual
 * reducer's structures are defined in their own modules.
 */
export interface State {
  readonly account: Account;
  readonly shoppingBag: readonly ShoppingBagProduct[];
}

/**
 * The app's state when the store has just been instantiated. It presets some key names.
 */
const initialState: State = {
  account: {
    customerId: null
  },
  shoppingBag: []
};

/**
 * The root reducer. Cascades through all possible actions. Returns the new application state tree
 * which replaces the old one in its entirety (as state is always immutable).
 *
 * Each "sub"-reducer only impacts its own section of the state.
 */
const reducer = combineReducers({
  account,
  shoppingBag
});

/**
 * Creates a Redux store with this app's presets and the devtools. Use the paired
 * `withRedux()` helper function around a Page component to initialize the store
 * when a page is requested.
 */
const initializeStore = (preloadedState = initialState): Store => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};

export default initializeStore;

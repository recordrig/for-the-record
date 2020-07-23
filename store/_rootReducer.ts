import { combineReducers } from "redux";
import { withReduxStateSync } from "redux-state-sync";
import cookieConsent from "./cookieConsent";
import shoppingBag from "./shoppingBag";

/**
 * The root reducer. Cascades through all possible actions. Returns the new application state tree
 * which replaces the old one in its entirety (as state is always immutable).
 *
 * Each "sub"-reducer only impacts its own section of the state.
 */
const rootReducer = combineReducers({
  cookieConsent,
  shoppingBag,
});

export default withReduxStateSync(rootReducer);

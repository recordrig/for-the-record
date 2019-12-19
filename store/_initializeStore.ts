import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

/**
 * The entire application's state tree structure.
 */
interface State {
  /**
   * The `shoppingBag` holds an array of products. May also be emtpy.
   */
  shoppingBag: {
    id: string;
    quantity: number;
  }[];
}

/**
 * Generic Action structure so we can make some assumptions about an action's contents.
 * An Action describes how the application state should be updated.
 *
 * Inspired by [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action).
 * Defining everything right here also prevents us from adding an entire library just for a
 * simple interface definition.
 *
 * Though Redux itself also exports a (very basic) Action interface, we prefer to define it in
 * entirety as opposed to extending. This way, the documentation will be complete when any Action
 * is hovered over (instead of omitting the original docs, which include a description of `type`).
 */
interface Action {
  /**
   * The type of an action identifies to the consumer the nature of the action that has occurred.
   * `type` is a string constant. If two types are the same, they MUST be strictly equivalent.
   */
  type: string;
  /**
   * The optional `payload` property MAY be any type of value. It represents the payload of the
   * action. Any information about the action that is not the type or status of the action should
   * be part of the payload field.
   *
   * By convention, if `error` is `true`, the `payload` SHOULD be an error object. This is akin
   * to rejecting a promise with an error object.
   */
  payload?: any;
  /**
   * The optional `error` property MAY be set to `true` if the action represents an error.
   * An action whose `error` is `true` is analogous to a rejected Promise. By convention, the
   * `payload` SHOULD be an error object.
   *
   * If error has any other value besides `true`, including `undefined` and `null`, the action
   * MUST NOT be interpreted as an error.
   */
  error?: string;
  /**
   * The optional `meta` property MAY be any type of value. It is intended for any extra information
   * that is not part of the payload. (Think "timestamps" and whatnot.)
   */
  meta?: object;
}

const initialState: State = {
  shoppingBag: []
};

/**
 * The root reducer. Cascades through all possible actions. Returns the new application state tree
 * which replaces the old one in its entirety (as state is always immutable).
 *
 * @param state The original state, before the impending update.
 * @param action Describes how the state should change.
 */
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    // TODO: Combine reducers.
    case "shoppingBag/ADD_ITEM":
      return {
        ...state,
        shoppingBag: [
          ...state.shoppingBag,
          addItemToShoppingBag(state.shoppingBag, action)
        ]
      };
    default:
      return state;
  }
};

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

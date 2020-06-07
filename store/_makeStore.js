import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from "redux-state-sync";
import throttle from "lodash.throttle";
import rootReducer from "./_rootReducer";

/**
 * The app's state when the store has just been instantiated. It presets some key names.
 */
const initialAppStatePreset = {
  shoppingBag: []
};

/**
 * Creates a an initial Redux store to aid SSR.
 *
 * NB: The server-side store does not intend to be used as a store on the server.
 * Rather, it's created in order aid SSR: the initiated server store is passed to
 * the client, prerendered. But only on the client-side will this store actually
 * function as a store.
 */
const makeInitialStore = (initialAppState = initialAppStatePreset) =>
  createStore(rootReducer, initialAppState);

/**
 * Creates the Redux store which we'll use to manage client-side global state.
 *
 * NB: This code is assumed to only execute on the client, and as such follows a synchronous style.
 *
 * The client store will be enhanced with devtools and mechanisms that'll keep browser tabs synced,
 * and will fetch some parts of the startup state from localStorage (e.g. the shopping bag).
 */
const makeClientStore = (initialAppState = initialAppStatePreset) => {
  // If there's a previously saved Shopping Bag state, we'll load it.
  const loadPersistedShoppingBagState = () => {
    // Try-catch, because privacy settings might prevent us from reading localStorage contents.
    try {
      const serializedShoppingBagState = localStorage.getItem("shoppingBag");

      if (serializedShoppingBagState === null) {
        return undefined;
      }
      return JSON.parse(serializedShoppingBagState);
    } catch {
      return undefined;
    }
  };

  // Save Shopping Bag state to localStorage, so that user's shopping bag is recovered upon revisiting.
  const persistShoppingBagState = shoppingBagState => {
    // Try-catch, because privacy settings might prevent us from reading localStorage contents.
    try {
      const serializedShoppingBagState = JSON.stringify(shoppingBagState);
      localStorage.setItem("shoppingBag", serializedShoppingBagState);
    } catch (err) {
      console.error(
        `Persisting Shopping Bag state to localStorage failed. Error message: ${err}`
      );
    }
  };

  // Either is a valid Shopping Bag state, or is undefined if there was no (valid) state.
  const shoppingBag = loadPersistedShoppingBagState();

  // Either is the app state with data recovered from localStorage, or the barebones predefined app state.
  const initialClientState = shoppingBag
    ? { ...initialAppState, ...shoppingBag }
    : initialAppState;

  // createStateSyncMiddleware is needed for browser tab syncing.
  const middlewares = [createStateSyncMiddleware({})];

  const store = createStore(
    rootReducer,
    initialClientState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  // Needed for browser tab syncing.
  initStateWithPrevTab(store);

  // Subscribe to changes so that we can persist the Shopping Bag to localStorage whenever it updates.
  store.subscribe(
    // JSON.stringify is an expensive operation and the Store might update many times in a row, so we
    // throttle it to prevent performance issues and needless repetitions.
    throttle(() => {
      persistShoppingBagState({
        shoppingBag: store.getState().shoppingBag
      });
    }, 1000)
  );

  return store;
};

// Since the same code is executed on both the server and the client, we'll need to determine
// where we are in order to create the appropriate store.
const isClient = !(typeof window === "undefined");
const makeStore = isClient ? makeClientStore : makeInitialStore;

export default makeStore;

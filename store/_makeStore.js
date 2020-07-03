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
  cookieConsent: {
    YOUTUBE_EMBEDS: false
  },
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
  // If there's a persisted state, we'll load it.
  const loadPersistedState = () => {
    // Try-catch, because privacy settings might prevent us from reading localStorage contents.
    try {
      const serializedPersistedState = localStorage.getItem("persistedState");

      if (serializedPersistedState === null) {
        return undefined;
      }
      return JSON.parse(serializedPersistedState);
    } catch {
      return undefined;
    }
  };

  // Save some state to localStorage, so that it might be recovered upon revisiting.
  const persistState = stateToPersist => {
    // Try-catch, because privacy settings might prevent us from reading localStorage contents.
    try {
      const serializedState = JSON.stringify(stateToPersist);
      localStorage.setItem("persistedState", serializedState);
    } catch (err) {
      console.error(
        `Persisting state to localStorage failed. Error message: ${err}`
      );
    }
  };

  // Either is a valid state, or is undefined if there was no (valid) state.
  const persistedState = loadPersistedState();

  // Either is the app state with data recovered from localStorage, or the barebones predefined app state.
  const initialClientState = persistedState
    ? { ...initialAppState, ...persistedState }
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

  // Subscribe to changes so that we can persist state whenever it updates.
  store.subscribe(
    // JSON.stringify is an expensive operation and the Store might update many times in a row, so we
    // throttle it to prevent performance issues and needless repetitions.
    throttle(() => {
      persistState({
        cookieConsent: store.getState().cookieConsent,
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

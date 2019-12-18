import { Action, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

interface State {
  shoppingBag: {
    id: string;
    quantity: number;
  }[];
}

const initialState: State = {
  shoppingBag: []
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "shoppingBag/ADD":
      return {
        ...state,
        shoppingBag: [] // TODO: Make add functional
      };
    default:
      return state;
  }
};

const initializeStore = (preloadedState = initialState): Store => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};

export default initializeStore;

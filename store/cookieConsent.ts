// Shared interfaces & types.
// -----------------------------------------------------------/

type ConsentCategories = "YOUTUBE_EMBEDS";

type Consent = Record<ConsentCategories, boolean>;

// Action types.
// -----------------------------------------------------------/

enum ActionTypes {
  ADD_CONSENT = "cookieConsent/ADD_CONSENT",
  REMOVE_CONSENT = "cookieConsent/REMOVE_CONSENT",
}

// Action creators.
// -----------------------------------------------------------/

interface AddConsentAction {
  readonly type: ActionTypes.ADD_CONSENT;
  readonly payload: {
    readonly consentCategory: ConsentCategories;
  };
}

export const addConsentAction = (
  consentCategory: ConsentCategories
): AddConsentAction => {
  return {
    type: ActionTypes.ADD_CONSENT,
    payload: {
      consentCategory,
    },
  };
};

interface RemoveConsentAction {
  readonly type: ActionTypes.REMOVE_CONSENT;
  readonly payload: {
    readonly consentCategory: ConsentCategories;
  };
}

export const removeConsentAction = (
  consentCategory: ConsentCategories
): RemoveConsentAction => {
  return {
    type: ActionTypes.REMOVE_CONSENT,
    payload: {
      consentCategory,
    },
  };
};

// Reducer helper functions.
// -----------------------------------------------------------/

const addConsent = (
  prevConsentState: Consent,
  consentCategory: ConsentCategories
): Consent => {
  return {
    ...prevConsentState,
    [consentCategory]: true,
  };
};

const removeConsent = (
  prevConsentState: Consent,
  consentCategory: ConsentCategories
): Consent => {
  return {
    ...prevConsentState,
    [consentCategory]: false,
  };
};

// Reducer.
// -----------------------------------------------------------/

type Action = AddConsentAction | RemoveConsentAction;

const initialState: Consent = {
  YOUTUBE_EMBEDS: false,
};

const cookieConsent = (state = initialState, action: Action): Consent => {
  switch (action.type) {
    case ActionTypes.ADD_CONSENT:
      return addConsent(state, action.payload.consentCategory);
    case ActionTypes.REMOVE_CONSENT:
      return removeConsent(state, action.payload.consentCategory);
    default:
      return state;
  }
};

export default cookieConsent;

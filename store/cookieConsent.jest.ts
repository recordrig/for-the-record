import cookieConsent, {
  addConsentAction,
  removeConsentAction,
} from "./cookieConsent";

describe("cookieConsent reducer", () => {
  describe("Add consent", () => {
    test("ONLY modifies the appropriate consent setting", () => {
      const state = {
        CONSENT_1: false,
        YOUTUBE_EMBEDS: false,
        CONSENT_2: false,
      };

      const action = addConsentAction("YOUTUBE_EMBEDS");

      const newState = {
        CONSENT_1: false,
        YOUTUBE_EMBEDS: true,
        CONSENT_2: false,
      };

      expect(cookieConsent(state, action)).toEqual(newState);
    });

    test("Add consent for YouTube embeds", () => {
      const state = {
        YOUTUBE_EMBEDS: false,
      };

      const action = addConsentAction("YOUTUBE_EMBEDS");

      const newState = {
        YOUTUBE_EMBEDS: true,
      };

      expect(cookieConsent(state, action)).toEqual(newState);
    });
  });

  describe("Remove consent", () => {
    test("ONLY modifies the appropriate consent setting", () => {
      const state = {
        CONSENT_1: false,
        YOUTUBE_EMBEDS: true,
        CONSENT_2: false,
      };

      const action = removeConsentAction("YOUTUBE_EMBEDS");

      const newState = {
        CONSENT_1: false,
        YOUTUBE_EMBEDS: false,
        CONSENT_2: false,
      };

      expect(cookieConsent(state, action)).toEqual(newState);
    });

    test("Remove consent for YouTube embeds", () => {
      const state = {
        YOUTUBE_EMBEDS: true,
      };

      const action = removeConsentAction("YOUTUBE_EMBEDS");

      const newState = {
        YOUTUBE_EMBEDS: false,
      };

      expect(cookieConsent(state, action)).toEqual(newState);
    });
  });
});

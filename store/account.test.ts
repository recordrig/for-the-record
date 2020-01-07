import account, { actionTypes } from "./account";

describe("account reducer", () => {
  describe(actionTypes.UPDATE_CUSTOMER_ID, () => {
    test("Update customer ID in otherwise empty state object", () => {
      const state = {
        customerId: null
      };

      const action = {
        type: actionTypes.UPDATE_CUSTOMER_ID,
        payload: {
          id: "CUSTOMERID"
        }
      };

      const newState = {
        customerId: "CUSTOMERID"
      };

      expect(account(state, action)).toEqual(newState);
    });

    test("Update customer ID without affecting other state contents", () => {
      const state = {
        foo: "bar",
        customerId: null,
        bar: "beer"
      };

      const action = {
        type: actionTypes.UPDATE_CUSTOMER_ID,
        payload: {
          id: "CUSTOMERID"
        }
      };

      const newState = {
        foo: "bar",
        customerId: "CUSTOMERID",
        bar: "beer"
      };

      expect(account(state, action)).toEqual(newState);
    });

    test("Update customer ID from some value to empty (null, that is)", () => {
      const state = {
        customerId: "CUSTOMERID"
      };

      const action = {
        type: actionTypes.UPDATE_CUSTOMER_ID,
        payload: {
          id: null
        }
      };

      const newState = {
        customerId: null
      };

      expect(account(state, action)).toEqual(newState);
    });
  });
});

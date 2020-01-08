import account, { actions } from "./account";

describe("account reducer", () => {
  describe("updateCustomerId", () => {
    test("Update customer ID in otherwise empty state object", () => {
      const state = {
        customerId: null
      };

      const action = actions.updateCustomerId("CUSTOMERID");

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

      const action = actions.updateCustomerId("CUSTOMERID");

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

      const action = actions.updateCustomerId(null);

      const newState = {
        customerId: null
      };

      expect(account(state, action)).toEqual(newState);
    });
  });
});

describe("Checkout Flow", () => {
  // Labels aren't EXACT device sizes, but approximations.
  const sizes = [
    { width: 320, height: 480, label: "iPhone 5" },
    { width: 1366, height: 700, label: "Laptop" }
  ];

  sizes.forEach(({ width, height, label }) => {
    it(`Can buy RecordRigs (${label})`, () => {
      cy.viewport(width, height);
      cy.visit("/");
      cy.get("[data-cy=menubar-shop-button").click();
      cy.get("[data-cy=option-black]").click();
      cy.get("[data-cy=add-to-bag-button]").click();
      cy.get("[data-cy=continue-shopping]").click();
      cy.get("[data-cy=switch-to-white]").click();
      cy.get("[data-cy=add-to-bag-button]").click();
      cy.get("[data-cy=ready-to-order]").click();
      cy.get("[data-cy=enabled-checkout-button]").click({ multiple: true });
      // cy.get("#email").type("cypress@recordrig.com");
      // cy.get("#shippingName").type("Myname Something");
      // cy.get("#shippingAddressLine1").type("Somestreet 12");
      // cy.get("#shippingPostalCode").type("8912 OK");
      // cy.get("#shippingLocality").type("Citytown");
      // cy.get("#giropay-tab").click();
      // cy.get("button[type='submit']").click();
      // TODO: Check overview
    });
  });
});

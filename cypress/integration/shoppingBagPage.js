describe("Shopping Bag", () => {
  // Labels aren't EXACT device sizes, but approximations.
  const sizes = [
    { width: 320, height: 480, label: "iPhone 5" },
    { width: 1366, height: 700, label: "Laptop" }
  ];

  // TODO: const validBag
  // TODO: const invalidBag

  it("Shows a link to the Shop if loaded while empty", () => {
    // TODO
  });

  it("Can load persisted Shopping Bag from localStorage", () => {
    // TODO
  });

  sizes.forEach(({ width, height, label }) => {
    context(`Shopping Bag - valid bag (${label})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit("/shop/shopping-bag");
        // TODO: Load persisted shopping bag.
      });

      it(`Displays all products correctly and can Check Out`, () => {
        // TODO
      });

      it(`Can remove products`, () => {
        // TODO
      });
    });

    context(`Shopping Bag - invalid bag (${label})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit("/shop/shopping-bag");
        // TODO: Load persisted shopping bag.
      });

      it(`Displays all errors and can correct them, enabling Check Out`, () => {
        // TODO
      });
    });
  });
});

describe("Shop Page", () => {
  // Labels aren't EXACT device sizes, but approximations.
  const sizes = [
    { width: 320, height: 480, label: "iPhone 5" },
    { width: 375, height: 775, label: "iPhone 11" },
    { width: 1024, height: 675, label: "iPad landscape" },
    { width: 1366, height: 700, label: "Laptop" },
    { width: 1920, height: 1080, label: "HD" },
    { width: 4096, height: 2160, label: "4K" },
  ];

  const addToBagButton = "[data-cy=add-to-bag-button]";
  const almostYours = "[data-cy=almost-yours]";
  const blackAddToBag = "[data-cy=black-add-to-bag]";
  const blackDeviceContent = "[data-cy=black-device-content]";
  const blackOption = "[data-cy=option-black]";
  const continueShopping = "[data-cy=continue-shopping]";
  const readyToOrder = "[data-cy=ready-to-order]";
  const reviewShoppingBag = "[data-cy=review-shopping-bag]";
  const whiteAddToBag = "[data-cy=white-add-to-bag]";
  const whiteDeviceContent = "[data-cy=white-device-content]";
  const whiteOption = "[data-cy=option-white]";

  const addToBagTest = (): void => {
    cy.get(`${addToBagButton}`).click();
    cy.get(`${almostYours}`).should("be.visible");
    cy.get(`${readyToOrder}`).should("be.visible");
  };

  const addAndReturnTest = (): void => {
    cy.get(`${addToBagButton}`).click();
    cy.get(`${continueShopping}`).click();
    cy.get(`${addToBagButton}`).should("have.css", "color", "rgb(36, 161, 72)");
    cy.get(`${addToBagButton}`).click();
    cy.get(`${reviewShoppingBag}`).should("be.visible");
  };

  it("Can navigate using browser-native controls", () => {
    cy.visit("/shop/buy-recordrig");
    cy.percySnapshot();
    cy.get(`${blackOption}`).click();
    cy.url().should("include", "stealth-black");
    cy.go("back");
    cy.url().should("eq", `${Cypress.config().baseUrl}/shop/buy-recordrig`);
    cy.go("forward");
    cy.url().should("include", "stealth-black");
    cy.go("back");
    cy.get(`${whiteOption}`).click();
    cy.go("back");
    cy.url().should("eq", `${Cypress.config().baseUrl}/shop/buy-recordrig`);
  });

  sizes.forEach(({ width, height, label }) => {
    context(`Select color (${label})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit("/shop/buy-recordrig");
      });

      it(`Displays both color options (${label})`, () => {
        cy.get(`${blackOption}`).should("be.visible");
        cy.get(`${whiteOption}`).should("be.visible");
      });

      it(`Can choose Stealth Black (${label})`, () => {
        cy.get(`${blackOption}`).click();
        cy.get(`${whiteOption}`).should("not.exist");
        cy.url().should("include", "stealth-black");
        cy.get(`${blackDeviceContent}`).should("be.visible");
        cy.get(`${blackAddToBag}`).should("be.visible");
      });

      it(`Can choose Pristine White (${label})`, () => {
        cy.get(`${whiteOption}`).click();
        cy.get(`${blackOption}`).should("not.exist");
        cy.url().should("include", "pristine-white");
        cy.get(`${whiteDeviceContent}`).should("be.visible");
        cy.get(`${whiteAddToBag}`).should("be.visible");
      });
    });

    context(`Add Stealth Black to Shopping Bag (${label})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit("/shop/buy-recordrig?color=stealth-black");
      });

      it(`Displays Stealth Black content (${label})`, () => {
        cy.get(`${blackDeviceContent}`).should("be.visible");
        cy.get(`${blackAddToBag}`).should("be.visible");
      });

      it(`Can add Stealth Black to Shopping Bag and shows next steps (${label})`, () => {
        addToBagTest();
      });

      it(`Can add Stealth Black to Shopping Bag, return and re-add (${label})`, () => {
        addAndReturnTest();
      });
    });

    context(`Add Pristine White to Shopping Bag (${label})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit("/shop/buy-recordrig?color=pristine-white");
      });

      it(`Displays Pristine White content (${label})`, () => {
        cy.get(`${whiteDeviceContent}`).should("be.visible");
        cy.get(`${whiteAddToBag}`).should("be.visible");
      });

      it(`Can add Pristine White to Shopping Bag and shows next steps (${label})`, () => {
        addToBagTest();
      });

      it(`Can add Pristine White to Shopping Bag, return and re-add (${label})`, () => {
        addAndReturnTest();
      });
    });
  });
});

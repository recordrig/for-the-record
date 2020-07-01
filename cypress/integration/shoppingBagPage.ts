// We use actual data because the Shopping Bag page will fill product
// info based on the ID. If the ID were to be invalid, the Shopping Bag
// functionalities would not work. Through importing data, we make sure
// data will remain synced should our catalogue ever update.
import products from "../../data/products";
import { ShoppingBagProduct } from "../../store/shoppingBag";

describe("Shopping Bag Page", () => {
  // Labels aren't EXACT device sizes, but approximations.
  const sizes = [
    { width: 320, height: 480, label: "iPhone 5" },
    { width: 1366, height: 700, label: "Laptop" }
  ];

  // Products we've imported from real data and assigned to our shopping bags should
  // get rendered.
  const product0 = `[data-cy=product-${Object.keys(products)[0]}]`;
  const product1 = `[data-cy=product-${Object.keys(products)[1]}]`;
  const removeProduct0 = `[data-cy=remove-${Object.keys(products)[0]}]`;
  const removeProduct1 = `[data-cy=remove-${Object.keys(products)[1]}]`;
  const quantityProduct0 = `[data-cy=quantity-${Object.keys(products)[0]}]`;
  const email = `[data-cy=email]`;
  const enabledCheckoutButton = "[data-cy=enabled-checkout-button";
  const disabledCheckoutButton = "[data-cy=disabled-checkout-button";
  const toShop = "[data-cy=to-shop]";
  const errorsList = "[data-cy=errors-list]";

  const validShoppingBag: readonly ShoppingBagProduct[] = [
    {
      id: Object.keys(products)[0],
      quantity: 1
    },
    {
      id: Object.keys(products)[1],
      quantity: 2
    }
  ];

  // NB only remains invalid so long as the first two products in our catalogue remain
  // at their price point. Might require updating once the catalogue changes.
  const invalidShoppingBag: readonly ShoppingBagProduct[] = [
    {
      id: Object.keys(products)[0],
      quantity: 8
    },
    {
      id: Object.keys(products)[1],
      quantity: 8
    }
  ];

  context(`Empty bag`, () => {
    it("Shows a link to the Shop if loaded while empty", () => {
      cy.visit("/shop/shopping-bag");
      cy.get(`${toShop}`).should("be.visible");
    });
  });

  sizes.forEach(({ width, height, label }) => {
    context(`Valid bag (${label})`, () => {
      beforeEach(() => {
        localStorage.setItem(
          "shoppingBag",
          JSON.stringify({
            shoppingBag: validShoppingBag
          })
        );
        cy.viewport(width, height);
        cy.visit("/shop/shopping-bag");
      });

      it(`Displays all products correctly and can Check Out`, () => {
        cy.get(`${product0}`).should("be.visible");
        cy.get(`${product1}`).should("be.visible");
        cy.get(`${enabledCheckoutButton}`).should("be.visible");
        cy.get(`${disabledCheckoutButton}`).should("not.exist");
      });

      it(`Disables Check Out button when form is filled`, () => {
        cy.get(`${enabledCheckoutButton}`).should("be.visible");
        cy.get(`${email}`).type("it", { force: true });
        cy.get(`${enabledCheckoutButton}`).should("not.exist");
        cy.get(`${disabledCheckoutButton}`).should("be.visible");
        cy.get(`${email}`).type("isi@me.com", { force: true });
        cy.get(`${enabledCheckoutButton}`).should("not.exist");
        cy.get(`${disabledCheckoutButton}`).should("be.visible");
        cy.get(`${email}`).clear({ force: true });
        cy.get(`${enabledCheckoutButton}`).should("be.visible");
        cy.get(`${disabledCheckoutButton}`).should("not.exist");
      });

      it(`Can remove product, disabling button to Check Out`, () => {
        cy.get(`${product0}`).should("be.visible");
        cy.get(`${removeProduct0}`).click();
        cy.get(`${product0}`).should("not.exist");
        cy.get(`${product1}`).should("be.visible");
        cy.get(`${removeProduct1}`).click();
        cy.get(`${product1}`).should("not.exist");
        cy.get(`${enabledCheckoutButton}`).should("not.exist");
        cy.get(`${disabledCheckoutButton}`).should("not.exist");
        cy.get(`${toShop}`).should("be.visible");
      });
    });

    context(`Invalid bag (${label})`, () => {
      beforeEach(() => {
        localStorage.setItem(
          "shoppingBag",
          JSON.stringify({
            shoppingBag: invalidShoppingBag
          })
        );
        cy.viewport(width, height);
        cy.visit("/shop/shopping-bag");
      });

      it(`Displays all errors and can correct them, enabling Check Out`, () => {
        cy.get(`${errorsList}`)
          .children()
          .should("have.length", 3);
        cy.get(`${disabledCheckoutButton}`).should("be.visible");
        cy.get(`${quantityProduct0}`).select("1");
        cy.get(`${quantityProduct0}`).should("have.value", "1");
        cy.get(`${errorsList}`)
          .children()
          .should("have.length", 2);
        cy.get(`${disabledCheckoutButton}`).should("be.visible");
        cy.get(`${removeProduct1}`).click();
        cy.get(`${errorsList}`)
          .children()
          .should("have.length", 0);
        cy.get(`${enabledCheckoutButton}`).should("be.visible");
      });
    });
  });
});

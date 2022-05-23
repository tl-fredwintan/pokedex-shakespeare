describe("Pokedex Collection", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("User Input", () => {
    it("Search container and input element should exists", () => {
      cy.get("#search-container").should("exist");
      cy.get("#search").should("exist");
    });
    it("Dropdown should open on minimum 2 characters", () => {
      cy.get("#search").clear();
      cy.get("#search").type("bu");
      cy.get("#search").clear();
      cy.get("#dropdown").should("not.exist");
    });
    it("Dropdown should close on click outside div", () => {
      cy.get("#search").clear();
      cy.get("#search").type("bu");
    });
    it("Dropdown should open/close on click with minimum 2 characters", () => {
      cy.visit("/");
      cy.get("#search").clear();
      cy.get("#search").type("bu");
      cy.get("#header").click();
      cy.get("#dropdown").should("not.exist");
    });
    it("Should navigate to pokemon overview on click", () => {
      cy.get("#search").clear();
      cy.get("#search").type("bu");
      cy.get('#dropdown > [href="/pokemon/bulbasaur"]').click();
      cy.get("#search").should("not.exist");
    });
  });

  describe("Card Collection", () => {
    it("First load should contain 20 pokemon card", () => {
      cy.get("div#pokemon-card.sc-bczRLJ.sc-gsnTZi").should("have.length", 20);
    });
    it("Infinite Scroll fetch N times", () => {
      //dynamic classname
      cy.get("div#pokemon-card.sc-bczRLJ.sc-gsnTZi")
        .should("have.length", 20)
        .then(() => {
          //N number of pokemon cards
          cy.wait(500);
          cy.window().scrollTo("bottom");
          cy.get("div#pokemon-card.sc-bczRLJ.sc-gsnTZi").should(
            "have.length",
            40
          );
          cy.wait(500);
          cy.window().scrollTo("bottom");
          cy.get("div#pokemon-card.sc-bczRLJ.sc-gsnTZi").should(
            "have.length",
            60
          );
        });
    });
  });
});

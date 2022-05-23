describe("Pokemon Overview", () => {
  beforeEach(() => {
    cy.visit("/pokemon/bulbasaur");
  });
  it("Loader should be visible ", () => {
    cy.get("#loader").should("be.visible");
    cy.get("#loader").should("not.exist");
  });
  it("Should display pokemon overview card", () => {
    cy.get("#pokemon-overview").should("exist");
  });
  it("Should navigate back to /pokemon on path click", () => {
    cy.get("#pokemon-overview").should("exist");
    cy.get(".sc-bjUoiL").click();
    cy.window().then((win) => {
      expect(win.location.pathname).to.equal("/pokemon");
    });
  });
  it("Overview should have name, description and image", () => {
    cy.get("#pokemon-overview").should("exist");
    cy.get(".sc-fnykZs").invoke("attr", "alt").should("eq", "bulbasaur");
    cy.get("#title").contains("bulbasaur");
    cy.get("#description").invoke("text").should("have.length.gt", 0);
  });
  it("Not found should be visible", () => {
    cy.visit("/pokemon/unknown");
    cy.get("#not-found").should("be.visible");
    cy.get("#not-found").should("exist");
  });
});

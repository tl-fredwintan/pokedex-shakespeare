import bulbasaur from "../fixtures/bulbasaur";

describe("Testing API Requests ", () => {
  describe("Pokedex Collection", () => {
    it("GET /pokemon", () => {
      cy.request("http://localhost:8080/pokemon").as("getPokemon");
      cy.get("@getPokemon").then((pokemon) => {
        expect(pokemon.status).to.eq(200);
        assert.isString(pokemon.body[0].name, "Name is a string");
        expect(pokemon.body[0].name).to.be.a("string");
        expect(pokemon.body[0].id).to.be.a("number");
        assert.isArray(pokemon.body, "Pokemon Response is an array");
        expect(pokemon.body).to.have.length.of.at.most(151);
      });
    });
    it("POST /pokemon", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:8080/pokemon",
        body: {
          offset: 0,
        },
      }).as("postPokemon");
      cy.get("@postPokemon").then((pokemon) => {
        expect(pokemon.status).to.eq(200);
        assert.isArray(pokemon.body, "Pokemon Response is an array");
        expect(pokemon.body[0]).to.deep.equal(bulbasaur);
        expect(pokemon.body).to.have.length.of.at.most(20);
      });
    });
  });
  describe("Pokemon Overview", () => {
    it("GET pokemon/bulbasaur", () => {
      cy.request("http://localhost:8080/pokemon/bulbasaur").as("getBulbasaur");
      cy.get("@getBulbasaur").then((response) => {
        expect(response.status).to.eq(200);
        assert.isObject(response.body, "Bulbasaur should return as an object");
      });
    });
  });
});

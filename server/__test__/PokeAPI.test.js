import {
  getPokemonList,
  getPokemonBatch,
  getPokemon,
  getPokemonDetails,
  getPokemonDescription,
} from "../api/services/PokeAPI";
import { batchElement, spearow, lastPokemon } from "./PokeAPI.fixture.js";

describe("- Testing PokeAPI Service -", () => {
  describe("METHOD: getPokemonList()", () => {
    test("Should not be null", async () => {
      let response = await getPokemonList();
      expect(response).not.toBeNull();
    });
    test("Should contain maximum 151 elements", async () => {
      let response = await getPokemonList();
      expect(response.length).toEqual(151);
    });
    test("Object should { name, id } keys only", async () => {
      let response = await getPokemonList();
      let { name, id } = response[0];
      expect(name).toEqual("bulbasaur");
      expect(id).toEqual(1);
      expect(response[0]).toMatchObject({ name: "bulbasaur", id: 1 });
    });
  });
  describe("METHOD: getPokemonBatch()", () => {
    test("Should not be null", async () => {
      let offset = 0;
      let response = await getPokemonBatch(offset);
      expect(response).not.toBeNull();
    });
    test("Should contain maximum 20 elements", async () => {
      let offset = 0;
      let response = await getPokemonBatch(offset);
      expect(response.length).toEqual(20);
    });
    test("Should equal the expected response object", async () => {
      let offset = 0;
      let response = await getPokemonBatch(offset);
      expect(response[0]).toEqual(batchElement);
    });
    test("Next batch offset should contain spearow", async () => {
      let offset = 20;
      let response = await getPokemonBatch(offset);
      expect(response[0]).toEqual(spearow);
    });
    test("Last pokemon should be mew", async () => {
      let offset = 140;
      let response = await getPokemonBatch(offset);
      expect(response[response.length - 1]).toEqual(lastPokemon);
    });
    test("Last batch should only have 11 pokemons", async () => {
      let offset = 140;
      let response = await getPokemonBatch(offset);
      expect(response.length).toEqual(11);
    });
  });
  describe("METHOD: getPokemonDetails()", () => {
    test("Should not be null", async () => {
      let response = await getPokemonDetails("pikachu");
      expect(response).not.toBeNull();
    });
    test("Pokemon details should equal expected response", async () => {
      let response = await getPokemonDetails("spearow");
      expect(response).toEqual(spearow);
    });
    test("Unknown pokemon should throw a 404 error", async () => {
      let pokemon = "unknown";
      expect(getPokemonDetails(pokemon)).rejects.toThrow({
        code: 404,
        message: `Looks like ${pokemon} is not a valid Pokémon`,
      });
    });
  });
  describe("METHOD: getPokemonDescription()", () => {
    test("Should not be null", async () => {
      let response = await getPokemonDescription("pikachu");
      expect(response).not.toBeNull();
    });
    test("Description should not contain any formatting", async () => {
      let response = await getPokemonDescription("spearow");
      expect(response).toEqual(
        expect.not.stringMatching(/(\f\n|\n|\f|\n\f)/gm)
      );
    });
    test("Unknown pokemon should throw a 404 error", async () => {
      let pokemon = "unknown";
      expect(getPokemonDetails(pokemon)).rejects.toThrow({
        code: 404,
        message: `Looks like ${pokemon} is not a valid Pokémon`,
      });
    });
  });
  describe("METHOD: getPokemon()", () => {
    test("Should not be null", async () => {
      let response = await getPokemon("pikachu");
      expect(response).not.toBeNull();
    });
    test("Object should contain the correct keys and values", async () => {
      let response = await getPokemon("bulbasaur");
      expect(response).toEqual(
        expect.objectContaining({
          id: 1,
          name: "bulbasaur",
          type: expect.any(Array),
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          description: expect.any(String),
        })
      );
    });
  });
});

import axios from "axios";
import { getPokemonTranslation } from "../api/services/Shakespeare.js";
import { translated, description } from "./Shakespeare.fixture.js";

jest.mock("axios");

describe("- Testing Shakespeare Service -", () => {
  describe("METHOD: getTranslation", () => {
    afterEach(jest.clearAllMocks);
    test("Should translate description to Shakespeare English", async () => {
      axios.get.mockResolvedValue(translated);
      let response = await getPokemonTranslation(description);
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.funtranslations.com/translate/shakespeare.json?text=${encodeURI(
          description
        )}`
      );
      expect(response).toEqual(translated);
    });
    test("Should return null if limit is hit", async () => {
      axios.get.mockRejectedValueOnce(null);
      let response = await getPokemonTranslation(description);
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.funtranslations.com/translate/shakespeare.json?text=${encodeURI(
          description
        )}`
      );
      expect(response).toEqual(null);
    });
  });
});

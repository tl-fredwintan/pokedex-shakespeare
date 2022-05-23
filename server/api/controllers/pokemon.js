import useAsync from "../utils/useAsync.js";
import ApiError from "../utils/ApiError.js";
import Log from "../../config/logger.js";
import { getPokemonList, getPokemonBatch } from "../services/PokeAPI.js";

export const pokemonList = useAsync(async (req, res) => {
  Log.info(
    "[CONTROLLER] Attempting to retrieve Pokemons list from PokeAPI service"
  );
  const pokemons = await getPokemonList();

  if (!pokemons) {
    throw new ApiError(
      500,
      "Something went wrong. Could not retrieve Pokémons"
    );
  }
  res.status(200).send(pokemons);
  Log.info("[CONTROLLER] Successfully retrieved Pokemons list");
});

export const pokemonBatch = useAsync(async (req, res) => {
  Log.info(
    '"CONTROLLER" Attempting to retrieve Pokemon segment from PokeAPI service'
  );
  const { offset } = req.body;
  if (offset > 160) {
    res.send({
      message: "No more Pokemon is avaliable",
    });
  }

  const pokemonBatch = await getPokemonBatch(offset);
  if (!pokemonBatch) {
    throw new ApiError(
      500,
      "Something went wrong. Could not retrieve Pokémons"
    );
  }

  res.send(pokemonBatch);
  Log.info('"CONTROLLER" Successfully retrieved Pokemon batch');
});

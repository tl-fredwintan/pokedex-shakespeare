import useAsync from "../utils/useAsync.js";
import Log from "../../config/logger.js";
import { getPokemon } from "../services/PokeAPI.js";
import { getPokemonTranslation } from "../services/Shakespeare.js";

export const translate = useAsync(async (req, res) => {
  Log.info(
    "[CONTROLLER] Attempting to retrieve Pokemons information to translate"
  );
  const { name } = req.params;
  // Pokemon data
  const pokemonInfo = await getPokemon(name);
  const { description } = pokemonInfo;
  //remove \n and \f from description
  const cleanup = description.replace(/[\n\f]+/g, "");
  const response = await getPokemonTranslation(cleanup);

  let translated = {};
  if (response !== null) {
    translated = {
      ...pokemonInfo,
      description: response.data.contents.translated,
      translated: true,
    };
  }

  let payload =
    Object.keys(translated).length === 0
      ? { ...pokemonInfo, translated: false }
      : translated;

  Log.info(
    `[CONTROLLER] ${
      response
        ? `Successfully translated pokemon ${name} description`
        : `Unable to translate pokemon ${name} description at this time. Returning non-transalated description`
    }`
  );
  res.status(200).send(payload);
});

/**
 *   const payload = {
    ...pokemonInfo,
    description: translatedText ? translatedText : pokemonInfo.description,
    translated: translatedText ? true : false,
  };
 */

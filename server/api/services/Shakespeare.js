import axios from "axios";
import Log from "../../config/logger.js";

const _SHAKESPEARE =
  "https://api.funtranslations.com/translate/shakespeare.json";

export const getPokemonTranslation = async (description) => {
  Log.info(
    `"SERVICE" Attempting to translate "${description}" to Shakespearean`
  );

  try {
    Log.http(`"SERVICES" GET ${_SHAKESPEARE} with text ${description}`);
    return await axios.get(`${_SHAKESPEARE}?text=${encodeURI(description)}`);
  } catch (error) {
    Log.http(`"SERVICE" GET ${_SHAKESPEARE}. Limit reached`);
    return null;
  }
};

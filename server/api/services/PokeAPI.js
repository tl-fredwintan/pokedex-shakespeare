import axios from "axios";
import NodeCache from "node-cache";
import randomise from "../utils/randomise.js";
import Log from "../../config/logger.js";
import ApiError from "../utils/ApiError.js";

const _POKEAPI = "https://pokeapi.co/api/v2";
const cache = new NodeCache();

export const getPokemonList = async () => {
  let response = await axios.get(`${_POKEAPI}/generation/1`);
  const { pokemon_species } = response.data;
  let pokemonList = pokemon_species.map(({ name, url }) => {
    const path = new URL(url).pathname.split("/");
    const id = parseInt(path[4]);
    return { name, id };
  });

  Log.http(`"SERVICE" GET ${_POKEAPI}/generation/1`);
  return pokemonList;
};

export const getPokemonBatch = async (offset) => {
  if (cache.has(offset)) {
    Log.info(
      `"SERVICE" Found previous cached response on offset ${offset}. Returning cached data`
    );
    return cache.get(offset);
  }

  let batchOfPokemons = [];
  let reachedLimit = offset === 140;
  const promises = new Array(reachedLimit ? 11 : 20)
    .fill()
    .map((_, i) => axios.get(`${_POKEAPI}/pokemon/${i + offset + 1}`));
  await Promise.all(promises).then((dataset) => {
    Log.http(`"SERVICE" Fetching batches of ${offset}/151 Pokemons`);
    return dataset.map(async (value) => {
      const { id, name, sprites, types } = value.data;
      batchOfPokemons.push({
        id,
        name,
        type: types,
        image: sprites["other"]["official-artwork"].front_default,
      });
    });
  });
  cache.set(offset, batchOfPokemons);
  return batchOfPokemons;
};

export const getPokemon = async (pokemonName) => {
  let meta = await getPokemonDetails(pokemonName);
  let description = await getPokemonDescription(pokemonName);

  Log.info(
    `"SERVICE" Successfully retrieved Pokemon ${pokemonName} details and description`
  );
  return { ...meta, description };
};

export const getPokemonDetails = async (pokemonName) => {
  try {
    let response = await axios.get(`${_POKEAPI}/pokemon/${pokemonName}`);
    const { id, name, sprites, types } = response.data;
    Log.http(
      `"SERVICE" GET ${_POKEAPI}/${pokemonName} for ${pokemonName} details`
    );
    return {
      id,
      name,
      type: types,
      image: sprites["other"]["official-artwork"].front_default,
    };
  } catch (error) {
    Log.error(`"SERVICE" GET ${_POKEAPI}/${pokemonName}. ${error.message}`);
    throw new ApiError(404, `Looks like ${pokemonName} is not a valid Pokémon`);
  }
};

export const getPokemonDescription = async (pokemonName) => {
  try {
    let pokemonSpecies = await axios.get(
      `${_POKEAPI}/pokemon-species/${pokemonName}`
    );
    const { flavor_text_entries } = pokemonSpecies.data;

    let description = flavor_text_entries
      .filter((pokemon) => pokemon.language.name == "en")
      .map(({ flavor_text }) => {
        let removeLine = flavor_text.replace(/(\f\n|\n|\f|\n\f)/gm, " ");
        return removeLine;
      });
    Log.http(`"SERVICE" GET ${_POKEAPI}/${pokemonName} description`);
    return await randomise(description);
  } catch {
    Log.error(`"SERVICE" GET ${_POKEAPI}/${pokemonName}. ${error.message}`);
    throw new ApiError(404, `Looks like ${pokemonName} is not a valid Pokémon`);
  }
};

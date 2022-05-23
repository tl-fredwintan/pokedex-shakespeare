import express from "express";
import CacheService from "../middlewares/CacheService.js";
import { pokemonList, pokemonBatch } from "../controllers/pokemon.js";
import { translate } from "../controllers/translate.js";

const router = express.Router();

router
  .get("/", CacheService(), pokemonList)
  .post("/", pokemonBatch)
  .get("/:name", CacheService(), translate);

export default router;

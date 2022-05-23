import express from "express";
import compression from "compression";
import cors from "cors";
import pokemon from "../api/routes/pokemon.js";
import ApiError from "../api/utils/ApiError.js";
import { errorConvert, errorHandler } from "../api/middlewares/error.js";
import { httpSuccessHandler, httpErrorHandler } from "./morgan.js";

const app = express();

//catch HTTP request
app.use(httpSuccessHandler);
app.use(httpErrorHandler);

// parse json request body
app.use(express.json());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// routes
app.use("/pokemon", pokemon);

// Error handlers
app.use(errorConvert);
app.use((req, res, next) => {
  next(new ApiError(404, `Not found`));
});
app.use(errorHandler);

export default app;

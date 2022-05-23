import NodeCache from "node-cache";
import Log from "../../config/logger.js";

//TTL 5mins
const cache = new NodeCache({ stdTTL: 5000 });

const CacheService = () => (req, res, next) => {
  const key = req.originalUrl;
  const response = cache.get(key);

  if (!response) {
    // Pass reference of res.send
    res.originalSend = res.send;
    // Overwrite res.send in order to cache body
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body);
    };
    next();
    Log.info(
      `"MIDDLEWARE" No response cache found. Caching ${key} response body`
    );
  } else {
    Log.info(
      `"MIDDLEWARE" ${key} response body cached found. Returning cached data`
    );
    res.send(response);
  }
};

export default CacheService;

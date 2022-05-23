//global try catch wrapper for async/await functions.
const useAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next).catch(next));
};

export default useAsync;

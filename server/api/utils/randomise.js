// Pick random description from array of pokemon description
const randomise = async (description) => {
  return description[Math.floor(Math.random() * description.length)];
};

export default randomise;

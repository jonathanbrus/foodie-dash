export const findOneById = (id, elements) => {
  return elements.find((element) => element._id === id);
};

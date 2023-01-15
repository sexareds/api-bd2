export const paginateJSON = () => {
  return (req, res, next) => {
    const { query: { limit, offset } } = req;
    const pagination = {
      limit: limit || 10,
      offset: offset || 0
    };
    req.pagination = pagination;
    next();
  };
};
// a method to paginate the results in controllers using mysql stored procedures

export const paginate = (req, res) => {
  const { query: { page, limit } } = req;
  const currentPage = page || 1;
  const currentLimit = limit || 10;

  return { page, currentLimit };
};
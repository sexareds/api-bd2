const paginate = (total, page, limit) => {
  const pages = Math.ceil(total / limit);
  const currentPage = page;
  const prevPage = page - 1;
  const nextPage = page + 1;
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;
  return {
    total,
    pages,
    currentPage,
    prevPage,
    nextPage,
    hasNextPage,
    hasPrevPage,
  };
};

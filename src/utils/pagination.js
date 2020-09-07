const limitOffset = (page) => {
  const limit = 20;
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
  };
};

const nextPrevUrls = (
  req,
  totalItemCount,
  itemLimit,
  currentPage,
  exceptionQueries,
) => {
  const numberOfPages = Math.ceil(totalItemCount / itemLimit);
  const protocol = req.protocol;
  const host = req.get('host');
  const originalUrl = req.originalUrl.split('?')[0];

  const queries = Object.entries(req.query).filter(
    (entry) => !exceptionQueries.includes(entry[0]),
  );
  const queryString = queries.length
    ? `&${queries.map((query) => `${query[0]}=${query[1]}`).join('&')}`
    : '';

  const nextPageQuery = !currentPage
    ? `page=${currentPage + 2}`
    : `page=${currentPage + 1}`;

  const prevPageQuery = `page=${currentPage - 1}`;

  const nextPage =
    numberOfPages === currentPage
      ? ``
      : `${protocol}://${host}${originalUrl}?${nextPageQuery}${queryString}`;
  const prevPage =
    currentPage === 1
      ? ``
      : `${protocol}://${host}${originalUrl}?${prevPageQuery}${queryString}`;

  return { nextPage, prevPage, numberOfPages };
};

module.exports = { limitOffset, nextPrevUrls };

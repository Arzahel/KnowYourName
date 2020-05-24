const appConfig = require('../config/app.json');

/**
 * Parse data from input query and check it
 * @param {Number} limit
 * @param {Number} page
 *
 * @typedef {Object} PageQuery
 * @property {Number} limit
 * @property {Number} page
 *
 * @returns {PageQuery} result
 */
const normalizePageAndLimit = (limit, page) => ({
  limit:
    !limit || limit > appConfig.maxPageLimit ?
      appConfig.defaultPageLimit :
      +limit,
  page: !page || page < 0 ? 1 : +page,
});

module.exports = {

  /**
   *
   * @param {Number} page
   * @param {Number} limit
   * @param {Object} options
   * @returns {Object} options - SQL query options, page - current page
   * @summary Creating SQL query options to move page by page
   */
  getPageOptions: (page, limit, options = {}) => {
    const data = normalizePageAndLimit(limit, page);

    return Object.assign(
      {
        offset: (data.page - 1) * data.limit,
        limit: data.limit,
      },
      options,
    );
  },

  /**
   *
   * @param {Number} count Total count of elements
   * @param {Number} limit Elements on page
   * @param {Number} page Current page
   *
   * @typedef {Object} PageInfo
   * @property {Number} pages
   * @property {Number} results
   * @property {Number} currentPage
   *
   * @returns {PageInfo} result
   */
  getResponsePageInfo: (count, limit, page) => ({
    pages: Math.ceil(count / limit),
    results: count,
    currentPage: page,
  }),
};

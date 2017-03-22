const parseLinkHeader = require('parse-link-header');

function defaultReducer(memo, newValue) {
  return memo.concat(newValue);
}

function getNextPage(response) {
  var links = response.headers.link && parseLinkHeader(response.headers.link);
  return links && links.next && links.next.url;
}

var handleResponse = options => {
  return response =>
    requestNextPage(
      Object.assign({}, options, {
        pageNumber: options.pageNumber + 1,
        initialValue: options.reducer(options.initialValue, response)
      }),
      response
    );
};

var requestNextPage = (options, response) =>
  options.pageNumber < options.maxPages && getNextPage(response)
    ? options.got(getNextPage(response), options.options).then(handleResponse(options))
    : Promise.resolve(options.initialValue);

/**
 * Download multiple pages of a paged endpoint. This works for endpoints
 * that support the Link header type. The GitHub API does. gotLinks takes
 * care of combining the results using a reducer method, and will pass any
 * error that occurs.
 *
 * @param {Object} options
 * @param {*} [options.initialValue=[]]
 * @param {number} [options.maxPages=Infinity]
 * @param {Function} [options.reducer]
 * @return {Promise}
 */
var gotLinks = options => options.got(options.url, options.options).then(
    handleResponse(
      Object.assign({}, {
        initialValue: [],
        reducer: defaultReducer,
        maxPages: Infinity,
        pageNumber: 0
      }, options)
    )
  );

module.exports = gotLinks;

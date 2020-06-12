const rp = require('request-promise');
const token = require('./config/parser').apiKey;

module.exports = {

  /**
   * @param {String} uri Url path to parse data
   * @return {Promise<Object>} parsing data in JSON format
   */
  parse: async (uri) => {
    const options = {
      uri,
      qs: {
        api_key: token,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    const response = await rp(options);

    if (response.status_code) {
      throw new Error(
        `Parsing error ${uri} + response message: ${response.status_message}`,
      );
    }

    return response;
  },
};

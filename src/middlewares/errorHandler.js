/**
 * Responsible for handling errors triggered by the API.
 */
const HttpError = require('@errors/HttpError');

module.exports = (config) => (error, request, response, next) => {
  // We could skip to the default handler if the client doesn't want json!

  if (!(error instanceof HttpError)) {
    const data = {
      status: 500,
      description: 'Internal Server Error',
      message: (config.isProdEnv()) ? 'Sorry, something went wrong' : error.message,
    };

    if (!config.isProdEnv()) {
      data.stackTrace = error.stack;
    }

    return response
      .status(500)
      .json(data);
  }

  return response
    .status(error.getStatusCode())
    .json({
      status: error.getStatusCode(),
      description: error.getDescription(),
      message: error.message,
    });
};

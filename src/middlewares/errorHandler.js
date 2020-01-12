/**
 * Responsible for handling errors triggered by the API.
 */
const HttpError = require('@errors/HttpError');

module.exports = (error, request, response, next) => {
  // We could skip to the default handler if the client doesn't want json!

  if (!(error instanceof HttpError)) {
    return response
      .status(500)
      .json({
        status: 500,
        description: 'Internal Server Error',
        message: 'Sorry, something went wrong', // TODO: Expose the message and stacktrace on DEV enviroment.
      });
  }

  return response
    .status(error.getStatusCode())
    .json({
      status: error.getStatusCode(),
      description: error.getDescription(),
      message: error.message,
    });
};

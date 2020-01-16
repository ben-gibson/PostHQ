class HttpError extends Error {
  constructor(statusCode, description, message) {
    super(message);
    this.description = description;
    this.statusCode = statusCode;
  }

  static NotFound(message) {
    return new HttpError(404, 'Not Found', message);
  }

  static Unauthorized(message) {
    return new HttpError(401, 'Unauthorized', message);
  }

  static InvalidRequest(message) {
    return new HttpError(400, 'Bad Request', message);
  }

  getStatusCode() {
    return this.statusCode;
  }

  getDescription() {
    return this.description;
  }
}

module.exports = HttpError;

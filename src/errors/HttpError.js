class HttpError extends Error {
  constructor(statusCode, description, message) {
    super(message);
    this.description = description;
    this.statusCode = statusCode;
  }

  static NotFound(message) {
    return new HttpError(404, 'Not Found', message);
  }

  getStatusCode() {
    return this.statusCode;
  }

  getDescription() {
    return this.description;
  }
}

module.exports = HttpError;

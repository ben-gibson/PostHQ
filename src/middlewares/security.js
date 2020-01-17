const HttpError = require('@errors/HttpError');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User');

/**
 * Responsible for intercepting API requests and enforcing valid authentication.
 */
module.exports = (request, response, next) => {
  // Don't run on the login endpoint
  if (request.path === '/auth/login') {
    next();
    return;
  }

  const authorization = request.get('authorization');

  if (!authorization) {
    throw HttpError.Unauthorized('errors.access-token.missing');
  }

  // TODO: Make case insensitive match and only look at the beginning of the string.
  const token = authorization
    .replace('Bearer', '')
    .trim();

  let decoded;

  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw HttpError.Unauthorized('errors.access-token.expired');
    }

    throw HttpError.Unauthorized('errors.access-token.invalid');
  }

  const user = User.findById(decoded._id);

  // TODO: Check the user account is still active etc..
  if (!user) {
    throw HttpError.Unauthorized('todo');
  }

  request.user = user;

  next();
};

const asyncHandler = require('express-async-handler');
const authenticator = require('@security/authenticator');
const HttpError = require('@errors/HttpError');
const AuthError = require('@errors/AuthError');
const Credentials = require('@security/Credentials');

module.exports = () => ({
  login: asyncHandler(async (request, response) => {
    const { body } = request;

    // Add stronger validation!
    if (!body.email) {
      throw HttpError.InvalidRequest('validation.invalid-email');
    }

    if (!body.password) {
      throw HttpError.InvalidRequest('validation.invalid-password');
    }

    let jwt;

    try {
      jwt = await authenticator.authenticate(new Credentials(body.email, body.password));
    } catch (error) {
      if (error instanceof AuthError) {
        throw HttpError.Unauthorized('auth.failed');
      }

      throw error;
    }

    return response
      .status(200)
      .json(jwt);
  }),
});

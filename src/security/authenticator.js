const User = require('@root/src/models/User');
const AuthError = require('@errors/AuthError');
const crypto = require('@security/crypto');
const jwt = require('jsonwebtoken');
const config = require('@config/config');

/**
 * Responsible for taking some credentials and return a valid JWT token.
*/
module.exports.authenticate = async (credentials) => {
  const user = await User
    .findOne({ email: credentials.getEmail() })
    .select('+password')
    .exec();

  if (!user) {
    throw new AuthError('Could not authenticate user!');
  }

  // Also check if the user account is locked etc
  const match = await crypto.compareHash(user.password, credentials.getPassword());

  if (!match) {
    throw new AuthError('Could not authenticate user!');
  }

  return jwt.sign({ data: user }, config.jwt.secret, { expiresIn: '1h' });
};

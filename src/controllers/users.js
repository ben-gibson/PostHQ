const asyncHandler = require('express-async-handler');
const User = require('@models/user');
const HttpError = require('@errors/HttpError');

exports.list = asyncHandler(async (request, response) => {
  const users = await User.find();

  return response.json(users);
});

exports.create = asyncHandler(async (request, response) => {
  const user = new User(request.body);
  const result = await user.save();

  return response
    .status(201)
    .send(result);
});

exports.getUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);

  if (!user) {
    throw HttpError.NotFound(`User '${request.params.id}' could not be found`);
  }

  return response.send(user);
});

exports.deleteUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);

  if (user) {
    await user.remove();
  }

  return response
    .status(204)
    .send();
});

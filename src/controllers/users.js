const asyncHandler = require('express-async-handler');
const User = require('../models/user');

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

exports.deleteUser = asyncHandler(async (request, response) => {
  await User.deleteOne({ _id: request.params.id });

  return response
    .status(202)
    .send();
});

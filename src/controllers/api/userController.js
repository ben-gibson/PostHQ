const asyncHandler = require('express-async-handler');
const HttpError = require('@errors/HttpError');

module.exports = (User) => ({

  list: asyncHandler(async (request, response) => {
    const users = await User.find();

    return response.json(users);
  }),

  create: asyncHandler(async (request, response) => {
    const user = new User(request.body);

    try {
      const result = await user.save();

      return response
        .status(201)
        .json(result);
    } catch (error) {
      return response
        .status(400)
        .json(error.message); // TODO: Add safe conversion of validation errors.
    }
  }),

  getUser: asyncHandler(async (request, response) => {
    const user = await User.findById(request.params.id);

    if (!user) {
      throw HttpError.NotFound(`User '${request.params.id}' could not be found`);
    }

    return response.json(user);
  }),

  deleteUser: asyncHandler(async (request, response) => {
    const user = await User.findById(request.params.id);

    if (user) {
      await user.remove();
    }

    return response
      .status(204)
      .json();
  }),
});

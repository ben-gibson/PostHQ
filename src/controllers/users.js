const User = require('../models/user');

exports.list = async (request, response) => {
  try {
    const users = await User.find();

    return response.json(users);
  } catch (error) {
    return response
      .status(500)
      .send(error);
  }
};

exports.create = async (request, response) => {
  try {
    console.log(request.body);
    const user = new User(request.body);
    const result = await user.save();

    return response
      .status(201)
      .send(result);
  } catch (error) {
    return response
      .status(500)
      .send(error);
  }
};

exports.deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
  } catch (error) {
    return response.send(error);
  }

  return response
    .status(202)
    .send();
};

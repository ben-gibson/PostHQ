const express = require('express');
const userController = require('@controllers/userController');
const User = require('@models/user');

const routes = express.Router();

const controller = userController(User);

routes.route('/')
  .get(controller.list)
  .post(controller.create);

routes.route('/:id')
  .get(controller.getUser)
  .delete(controller.deleteUser);

module.exports = routes;

const express = require('express');
const userController = require('@root/src/controllers/api/userController');
const User = require('@root/src/models/User');

const routes = express.Router();

const controller = userController(User);

routes.route('/')
  .get(controller.list)
  .post(controller.create);

routes.route('/:id')
  .get(controller.getUser)
  .delete(controller.deleteUser);

module.exports = routes;

const express = require('express');
const authController = require('@root/src/controllers/api/authController');

const routes = express.Router();

const controller = authController();

routes.route('/login')
  .post(controller.login);

module.exports = routes;

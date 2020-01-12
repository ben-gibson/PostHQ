const express = require('express');
const users = require('@controllers/users');

const routes = express.Router();

routes.route('/')
  .get(users.list)
  .post(users.create);

routes.route('/:id')
  .get(users.getUser)
  .delete(users.deleteUser);

module.exports = routes;

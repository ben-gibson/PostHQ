const express = require('express');
const users = require('../controllers/users');

const routes = express.Router();

routes.route('/')
  .get(users.list);

module.exports = routes;

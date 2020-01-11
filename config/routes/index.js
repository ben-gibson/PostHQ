const express = require('express');
const users = require('./users');

const routes = express.Router();

routes.use('/users', users);

routes.use((request, response) => {
  response
    .status(404)
    .send();
});

module.exports = routes;

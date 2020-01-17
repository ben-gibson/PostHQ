const express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

routes.use((request, response) => {
  response
    .status(404)
    .send();
});

module.exports = routes;

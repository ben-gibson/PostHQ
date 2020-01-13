require('module-alias/register');
const express = require('express');
const databaseConnect = require('@root/db');
const bodyParser = require('body-parser');
const errorHandler = require('@middlewares/errorHandler');
const config = require('@config/config');
const routes = require('./config/routes');

const app = express();

databaseConnect();

app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler(config));

// Hand over responsibility to supertest to bind to a port when we're running integration tests!
if (!config.isTestEnv()) {
  app.listen(config.port);
}

module.exports = app;

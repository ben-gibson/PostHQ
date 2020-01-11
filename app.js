require('module-alias/register');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./config/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

mongoose.connect('mongodb://posthqdev:posthqdev@db/posthq', { keepAlive: 1, useNewUrlParser: true });
mongoose.connection.once('open', () => app.listen(port));

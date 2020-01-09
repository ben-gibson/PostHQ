const express = require('express');
const app = express();
const port = 3000;
const usersController = require('./controllers/users');

app.use('/users', usersController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

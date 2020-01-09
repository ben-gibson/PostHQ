const express = require('express');

const routes = express.Router();

routes.route('/')
    .get((request, response) => {
        response.json([
            {
                "id": "24b6188f-26e7-4e0c-aa09-732709281454",
                "name": "Chief Hopper",
                "email": "cheif.hopper@theupsidedown.com",
                "registered_at": "2020-01-09T16:12:53Z"
            }
        ]);
    });

module.exports = routes;
// TODO: Look into bootstraping tests so that this doesn't have to be setup each time.
require('module-alias/register');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('@root/app.js');
const User = require('@models/user');

const agent = request.agent(app);

describe('User Controller Test', () => {
  it('should list users', async () => {
    const result = await agent.get('/api/users')
      .send();
  });
});

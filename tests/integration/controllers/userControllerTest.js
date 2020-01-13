// TODO: Look into bootstraping tests so that this doesn't have to be setup each time.
require('module-alias/register');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('@root/app.js');
const User = require('@models/user');
const { expect } = require('chai');

const agent = request.agent(app);

describe('User Controller Test', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('GET /users', () => {
    it('should list users', async () => {
      const registeredAt = new Date();

      await User.create({
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        password: 'foobarbaz',
        registeredAt,
      });

      await User.create({
        name: 'Eleven',
        email: 'eleven@theupsidedown.com',
        password: 'foobarbaz',
        registeredAt,
      });

      const response = await agent
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .send();

      const { body } = response;

      expect(body).to.be.an('array').that.has.lengthOf(2);

      expect(body[0]).to.deep.include(
        {
          email: 'chief.hopper@theupsidedown.com',
          name: 'Chief Hopper',
          registeredAt: registeredAt.toISOString(),
        },
      );

      expect(body[1]).to.deep.include(
        {
          email: 'eleven@theupsidedown.com',
          name: 'Eleven',
          registeredAt: registeredAt.toISOString(),
        },
      );
    });
  });

  describe('GET /users/:id', () => {
    it('should get user by id', async () => {
      const registeredAt = new Date();
      const id = 'cee0c7e9-8c0f-4c52-8825-0d30decebc47';

      await User.create({
        _id: id,
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        password: 'foobarbaz',
        registeredAt,
      });

      const response = await agent
        .get(`/api/users/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .send();

      const { body } = response;

      expect(body).to.eql(
        {
          _id: id,
          email: 'chief.hopper@theupsidedown.com',
          name: 'Chief Hopper',
          registeredAt: registeredAt.toISOString(),
        },
      );
    });

    it('should respond with not found when user does not exist', async () => {
      const id = 'cee0c7e9-8c0f-4c52-8825-0d30decebc47';

      const response = await agent
        .get(`/api/users/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .send();

      const { body } = response;

      expect(body).to.eql(
        {
          description: 'Not Found',
          message: "User 'cee0c7e9-8c0f-4c52-8825-0d30decebc47' could not be found",
          status: 404,
        },
      );
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user by id', async () => {
      const id = 'cee0c7e9-8c0f-4c52-8825-0d30decebc47';

      await User.create({
        _id: id,
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        password: 'foobarbaz',
        registeredAt: new Date(),
      });

      const response = await agent
        .delete(`/api/users/${id}`)
        .set('Accept', 'application/json')
        .expect(204)
        .send();

      const { body } = response;

      expect(body).to.be.empty;
    });

    it('should silently succeed when user does not exist', async () => {
      const id = 'cee0c7e9-8c0f-4c52-8825-0d30decebc47';

      const response = await agent
        .delete(`/api/users/${id}`)
        .set('Accept', 'application/json')
        .expect(204)
        .send();

      const { body } = response;

      expect(body).to.be.empty;
    });
  });
});

// TODO: Look into bootstraping tests so that this doesn't have to be setup each time.
require('module-alias/register');

const userController = require('@controllers/userController');
const sinon = require('sinon');
const chai = require('chai');
const HttpError = require('@errors/HttpError');

const { expect } = chai;
chai.use(require('chai-as-promised'));

describe('User Controller', () => {
  let stubRequest;
  let stubResponse;
  let controller;
  let MockUser;

  beforeEach(() => {
    MockUser = class {};

    stubResponse = {
      json: sinon.spy(() => stubResponse),
      status: sinon.spy(() => stubResponse),
    };

    stubRequest = {
      params: {},
    };

    controller = userController(MockUser);
  });

  describe('List users', () => {
    it('should list all users', async () => {
      const users = [
        {
          _id: '72123b7d-0a7a-43a7-9433-8457849e840c',
          name: 'Chief Hopper',
          email: 'chief.hopper@theupsidedown.com',
          registeredAt: '2020-01-11T23:44:04.824Z',
        },
        {
          _id: '72123b7d-0a7a-43a7-9433-8457849e840c',
          name: 'Eleven',
          email: 'eleven@theupsidedown.com',
          registeredAt: '2020-01-11T23:55:04.824Z',
        },
      ];

      MockUser.find = () => users;

      await controller.list(stubRequest, stubResponse);

      expect(stubResponse.json.calledWith(users)).to.equal(true);
    });
  });

  describe('Get User', () => {
    it('should get user by id', async () => {
      const user = {
        _id: '72123b7d-0a7a-43a7-9433-8457849e840c',
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        registeredAt: '2020-01-11T23:44:04.824Z',
      };

      stubRequest.params.id = '72123b7d-0a7a-43a7-9433-8457849e840c';
      MockUser.findById = sinon.spy(() => user);

      await controller.getUser(stubRequest, stubResponse);

      expect(MockUser.findById.calledWith('72123b7d-0a7a-43a7-9433-8457849e840c')).to.equal(true);
      expect(stubResponse.json.calledWith(user)).to.equal(true);
    });

    it('should throw not found if the user does not exist', async () => {
      stubRequest.params.id = '72123b7d-0a7a-43a7-9433-8457849e840c';
      MockUser.findById = sinon.spy();

      expect(controller.getUser(stubRequest, stubResponse)).to.be.rejectedWith(HttpError, 'User \'72123b7d-0a7a-43a7-9433-8457849e840c\' could not be found');
      expect(MockUser.findById.calledWith('72123b7d-0a7a-43a7-9433-8457849e840c')).to.equal(true);
    });
  });

  describe('Delete User', () => {
    it('should delete user by id', async () => {
      const user = {
        _id: '72123b7d-0a7a-43a7-9433-8457849e840c',
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        registeredAt: '2020-01-11T23:44:04.824Z',
        remove: sinon.spy(),
      };

      stubRequest.params.id = '72123b7d-0a7a-43a7-9433-8457849e840c';
      MockUser.findById = sinon.spy(() => user);

      await controller.deleteUser(stubRequest, stubResponse);

      expect(MockUser.findById.calledWith('72123b7d-0a7a-43a7-9433-8457849e840c')).to.equal(true);
      expect(user.remove.called).to.equal(true);
      expect(stubResponse.status.calledWith(204)).to.equal(true);
    });

    it('should silently succeed when user does not exist', async () => {
      stubRequest.params.id = '72123b7d-0a7a-43a7-9433-8457849e840c';
      MockUser.findById = sinon.spy();

      await controller.deleteUser(stubRequest, stubResponse);

      expect(MockUser.findById.calledWith('72123b7d-0a7a-43a7-9433-8457849e840c')).to.equal(true);
      expect(stubResponse.status.calledWith(204)).to.equal(true);
    });
  });

  describe('Create User', () => {
    it('should create user', async () => {
      stubRequest.body = {
        name: 'Chief Hopper',
        email: 'chief.hopper@theupsidedown.com',
        password: 'foobarbaz',
      };

      MockUser.prototype.save = sinon.spy(() => stubRequest.body);

      await controller.create(stubRequest, stubResponse);

      expect(MockUser.prototype.save.called).to.equal(true);
      expect(stubResponse.status.calledWith(201)).to.equal(true);
      expect(stubResponse.json.calledWith(stubRequest.body)).to.equal(true);
    });
  });
});

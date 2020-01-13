const { expect } = require('chai');
const middleware = require('@middlewares/errorHandler');
const HttpError = require('@errors/HttpError');
const sinon = require('sinon');

describe('Error Handler', () => {
  let errorHandler;

  beforeEach(() => {
    errorHandler = middleware({ isProdEnv: () => true });
  });

  it('should handle HTTP errors for prod environment', () => {
    const error = HttpError.NotFound('Foo bar');

    const stubResponse = {
      json: sinon.spy(() => stubResponse),
      status: sinon.spy(() => stubResponse),
    };

    const result = errorHandler(error, {}, stubResponse, sinon.spy());

    expect(stubResponse.status.calledWith(404)).to.equal(true);

    expect(stubResponse.json.calledWith({ status: 404, description: 'Not Found', message: 'Foo bar' })).to.equal(true);
    expect(result).to.equal(stubResponse);
  });

  it('should handle non HTTP errors for prod environment', () => {
    const error = new Error('Some error with sensitive details');

    const stubResponse = {
      json: sinon.spy(() => stubResponse),
      status: sinon.spy(() => stubResponse),
    };

    const result = errorHandler(error, {}, stubResponse, sinon.spy());

    expect(stubResponse.status.calledWith(500)).to.equal(true);

    expect(stubResponse.json.calledWith({ status: 500, description: 'Internal Server Error', message: 'Sorry, something went wrong' })).to.equal(true);
    expect(result).to.equal(stubResponse);
  });
});

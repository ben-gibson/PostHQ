const dev = require('@config/env/dev');
const test = require('@config/env/test');

const ENV_TEST = 'test';
const ENV_DEV = 'development';
const ENV_PROD = 'production';

const env = process.env.NODE_ENV || 'development';

let config;

switch (env) {
  case ENV_PROD:
    config = {};
    break;
  case ENV_DEV:
    config = dev;
    break;
  case ENV_TEST:
    config = test;
    break;
  default:
    throw new Error('Failed to load enviroment configuration');
}

const defaults = {
  env,
  port: process.env.PORT || 3000,
  isProdEnv: () => env === ENV_PROD,
  isDevEnv: () => env === ENV_DEV,
  isTestEnv: () => env === ENV_TEST,
};

module.exports = { ...config, ...defaults };

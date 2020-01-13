module.exports = {
  // Integration tests should always be run against a separate database.
  database: {
    dsn: 'mongodb://posthqtest:posthqtest@db/posthqtest',
  },
};

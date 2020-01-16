module.exports = {
  database: {
    dsn: process.env.MONGODB_URL || 'mongodb://posthqdev:posthqdev@db/posthq',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
};

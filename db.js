const mongoose = require('mongoose');

module.exports = async (config) => {
  try {
    await mongoose.connect(config.database.dsn, { keepAlive: 1, useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }
};

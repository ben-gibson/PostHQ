const mongoose = require('mongoose');

module.exports = async () => {
  // Stops requests hanging indefinitely when the db is down.
  mongoose.set('bufferCommands', false);

  try {
    await mongoose.connect('mongodb://posthqdev:posthqdev@db/posthq', { keepAlive: 1, useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }
};

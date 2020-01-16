const bcrypt = require('bcryptjs');

const ROUNDS = 12;

module.exports.hash = async (value) => await bcrypt.hash(value, ROUNDS);
module.exports.compareHash = async (hash, value) => await bcrypt.compare(value, hash);

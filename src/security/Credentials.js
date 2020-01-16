class Credentials {
  constructor(email, password) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid credentials');
    }

    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}

module.exports = Credentials;

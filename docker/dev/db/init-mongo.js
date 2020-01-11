db.createUser({
  user: 'posthqdev',
  pwd: 'posthqdev',
  roles: [
    {
      role: 'readWrite',
      db: 'posthq',
    },
  ],
});

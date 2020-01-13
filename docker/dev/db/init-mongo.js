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


db = db.getSiblingDB('posthqtest');

db.createUser({
  user: 'posthqtest',
  pwd: 'posthqtest',
  roles: [
    {
      role: 'readWrite',
      db: 'posthqtest',
    },
  ],
});

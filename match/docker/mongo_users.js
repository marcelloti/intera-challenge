db.createUser({
  user: 'mongo_user',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'talents',
    },
    {
      role: 'readWrite',
      db: 'openings',
    },
  ],
});

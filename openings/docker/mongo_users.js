db.createUser({
  user: "mongo_user",
  pwd: "123456",
  roles: [
    {
      role: "readWrite",
      db: "openings"
    },
    {
      role: "readWrite",
      db: "openings"
    }
  ]
});

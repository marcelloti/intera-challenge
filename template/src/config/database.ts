import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = null;
if (process.env["NODE_ENV"] === "test") {
  mongod = new MongoMemoryServer();
}

async function connectToTestDatabase(): Promise<any> {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };

  return await mongoose.connect(uri, mongooseOpts);
}

async function connectToRealDatabase(): Promise<any> {
  const databaseName: string = process.env["MONGODB_DATABASE"];
  const host: string = process.env["MONGODB_CONNECTION_STRING"];
  const port = Number(process.env["MONGODB_PORT"]);
  // const username: string = process.env["MONGODB_USER"];
  // const password: string = process.env["MONGODB_PASSWORD"];

  //const connectionUrl = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  const connectionUrl = `mongodb://${host}:${port}/${databaseName}`;
  await mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    })
    .catch((err) => {
      console.error(err);
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));

  return db;
}

const connect = async (): Promise<void> => {
  if (process.env["NODE_ENV"] === "test") {
    return await connectToTestDatabase();
  }

  return await connectToRealDatabase();
};

async function closeRealDatabaseConnection(): Promise<void> {
  await mongoose.connection.close();
}

async function closeTestDatabaseConnection(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

const close = async (): Promise<void> => {
  if (process.env["NODE_ENV"] === "test") {
    return await closeTestDatabaseConnection();
  }
  closeRealDatabaseConnection();
};

export { connect, close };

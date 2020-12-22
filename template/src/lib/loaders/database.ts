import { connect } from "@src/config/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const databaseLoader = async (): Promise<any> => {
  const db = connect();

  return db;
};

export { databaseLoader };

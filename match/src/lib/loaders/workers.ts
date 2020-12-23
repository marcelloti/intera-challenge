import { checkMatchLoader } from "@src/workers/checkMatch";

const workersLoader = async (): Promise<void> => {
  checkMatchLoader();
};

export { workersLoader };

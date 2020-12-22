// eslint-disable-next-line @typescript-eslint/no-var-requires
const ZB = require("zeebe-node");
import { ZBClient } from "zeebe-node";

const workflowEngineLoader = async (): Promise<ZBClient> => {
  const zbc = new ZB.ZBClient(
    `${process.env["WORKFLOW_ENGINE_HOST"]}:${process.env["WORKFLOW_ENGINE_PORT"]}`
  );
  await zbc.topology();

  return zbc;
};

export { workflowEngineLoader };

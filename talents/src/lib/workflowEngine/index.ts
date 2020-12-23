import { workflowEngineLoader } from "../loaders/workflowEngine";
import * as path from "path";
import * as fs from "fs";
import { CompleteFn, Job } from "zeebe-node";

class workflowEngine {
  public static getCompleteWorkflowPath(filename: string): string {
    return path.join(__dirname, "..", "..", "saga", filename + ".bpmn");
  }

  public static async deploy(filename: string): Promise<boolean> {
    const zbc = await workflowEngineLoader();
    await zbc.deployWorkflow(workflowEngine.getCompleteWorkflowPath(filename));
    return true;
  }

  public static async undeploy(processId: string): Promise<boolean> {
    const undeployFile = workflowEngine.getCompleteWorkflowPath("undeploy");
    let bpmnData = await fs.readFileSync(`${undeployFile}`, "utf8");
    bpmnData = bpmnData.replace("ProcessUndeployId", processId);
    bpmnData = bpmnData.replace("ProcessUndeployName", processId);
    const bufferData = Buffer.from(bpmnData, "utf8");

    const zbc = await workflowEngineLoader();
    await zbc.deployWorkflow({
      definition: bufferData,
      name: "undeploy.bpmn"
    });

    return true;
  }

  public static async publishEvent(
    eventId: string,
    eventData: any
  ): Promise<boolean> {
    try {
      const zbc = await workflowEngineLoader();

      await zbc.createWorkflowInstance(eventId, {
        eventData
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static async createWorker(
    eventId: string,
    callback: Function
  ): Promise<boolean> {
    try {
      const zbc = await workflowEngineLoader();
      zbc.createWorker(eventId, async (job, complete) => {
        const respose = await callback(job.variables);
        complete.success(respose);
      });
    } catch (err) {
      return false;
    }

    return true;
  }
}
export { workflowEngine };

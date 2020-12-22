import { workflowEngine } from "@src/lib/workflowEngine";

it("Should deploy workflow file", async () => {
  const deployResult = await workflowEngine.deploy("workflowTest");

  expect(deployResult).toBe(true);
});

it("Should undeploy workflow", async () => {
  const deployResult = await workflowEngine.undeploy("workflowTest");
  expect(deployResult).toBe(true);
});

#!/usr/bin/env node
import program from "commander";
import Server from "@src/server";
import { workflowEngine } from "@src/lib/workflowEngine";
import * as dotenv from "dotenv";
dotenv.config();

program
  .version("0.1.0")
  .command("deploy-workflow [workflowName]")
  .action(async function (workflowName: string): Promise<void> {
    const result = await workflowEngine.deploy(workflowName);
    if (result) {
      console.info("Workflow deployed");
    } else {
      console.error("Workflow file not found");
    }
    return;
  });

program.parse(process.argv);

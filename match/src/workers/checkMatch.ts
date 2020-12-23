import { Mail } from "@src/lib/mail";
import { workflowEngine } from "@src/lib/workflowEngine";
import axios from "axios";

function firstLetterToUpper(text: string): string {
  return text.toLowerCase().replace(/\b[a-z]/g, (letter) => {
    return letter.toUpperCase();
  });
}

const checkMatchLoader = async (): Promise<boolean> => {
  const eventId = "talent:created";
  await workflowEngine.createWorker(eventId, async (eventVariables: any) => {
    const currentPosition = eventVariables.eventData["position"];
    try {
      const instance = axios.create({
        baseURL: process.env["TALENTS_ENDPOINT"] + "/",
        headers: {
          authorization: "Bearer " + process.env["API_ACCESS_TOKEN"],
          "Content-Type": "application/json"
        }
      });

      const response = await instance({
        method: "get",
        url: `/openings/findBy/position/${currentPosition}`
      });

      let message = `Hello ${firstLetterToUpper(
        eventVariables.eventData["first_name"]
      )}! We have found job matches for you: `;
      for await (const item of response["data"].map((job: any) => {
        let remoteJobType = "";
        // 0 - False | 1 - True | 2 - Mixed
        switch (job.remote_job + "") {
          case "0":
            remoteJobType = "NO";
            break;
          case "1":
            remoteJobType = "YES";
            break;
          case "2":
            remoteJobType = "MIXED";
            break;

          default:
            break;
        }

        message += `
          <p><b>${firstLetterToUpper(job.title)}</b></p>
          <p>Remote Job: ${remoteJobType}</p>
          <p>Seniority Level: ${firstLetterToUpper(job.seniority_level)}</p>
          <p>Location:  ${firstLetterToUpper(job.location)}</p>
          <p>Work Schedule: ${job.work_schedule}</p>
          <hr/>
        `;
      }));

      await Mail.send({
        message,
        to: eventVariables.eventData["email"],
        subject: "New jobs opportunities"
      });

      console.log("Email sent");
    } catch (err) {
      console.log(err);
    }
  });

  return true;
};

export { checkMatchLoader };

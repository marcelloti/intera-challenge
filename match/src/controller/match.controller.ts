import { Authorized, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { helloOAPI } from "./response/index.response";

@JsonController()
export class MatchController {
  @Authorized()
  @Get("/")
  @OpenAPI(helloOAPI)
  helloApi(): string {
    return "Hello from match service";
  }
}

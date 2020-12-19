import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { helloOAPI } from "./response/index.response";

@JsonController()
export class IndexController {
  @Get()
  @OpenAPI(helloOAPI)
  helloApi(): string {
    return "Hello API";
  }
}

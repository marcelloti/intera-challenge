import { Authorized, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { helloOAPI } from "./response/index.response";

@JsonController()
export class IndexController {
  @Authorized()
  @Get()
  @OpenAPI(helloOAPI)
  helloApi(): string {
    return "Hello API";
  }

  @Get("testa")
  @OpenAPI(helloOAPI)
  testeApi(): string {
    return "Teste API";
  }
}

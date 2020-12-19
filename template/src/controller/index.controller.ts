import { Controller, Get } from "routing-controllers";

@Controller()
export class IndexController {
  @Get("/")
  index(): string {
    return "Hello API";
  }
}

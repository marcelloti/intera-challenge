import {
  Authorized,
  Get,
  JsonController,
  Patch,
  Post
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import {
  updateTalent,
  getAllTalensResponse,
  getOneTalensResponse,
  saveTalent
} from "./response/talents.response";

@JsonController()
export class TalentsController {
  @Authorized()
  @Get("/talents")
  @OpenAPI(getAllTalensResponse)
  findAll(): string[] {
    return ["Hello API"];
  }

  @Get("/talents/:id")
  @OpenAPI(getOneTalensResponse)
  find(): string {
    return "Hello API";
  }

  @Post("/talents")
  @OpenAPI(saveTalent)
  save(): string {
    return "Hello API";
  }

  @Patch("/talents")
  @OpenAPI(updateTalent)
  update(): string {
    return "Hello API";
  }
}

import { TalentService } from "@src/service/talent.service";
import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import {
  updateTalentOAPI,
  getAllTalensOAPI,
  getOneTalensOAPI,
  saveTalentOAPI,
  deleteTalentOAPI
} from "./response/talents.response";

import { talentCreateRequest } from "./request/talent.request";

@JsonController()
@Authorized()
export class TalentsController {
  @Post("/talents")
  @OpenAPI(saveTalentOAPI)
  async create(@Body() talent: talentCreateRequest): Promise<{}> {
    return await TalentService.create(talent);
  }

  @Get("/talents")
  @OpenAPI(getAllTalensOAPI)
  async findAll(): Promise<{}> {
    const talentsResult = await TalentService.findAll();
    return talentsResult;
  }

  @Get("/talents/:id")
  @OpenAPI(getOneTalensOAPI)
  async findById(@Param("id") id: string): Promise<{}> {
    const talent = await TalentService.findById(id);
    return talent;
  }

  @Put("/talents/:id")
  @OpenAPI(updateTalentOAPI)
  async update(
    @Param("id") id: string,
    @Body() talent: talentCreateRequest
  ): Promise<{}> {
    const result = await TalentService.update(id, talent);
    return result;
  }

  @Delete("/talents/:id")
  @OpenAPI(deleteTalentOAPI)
  async delete(@Param("id") id: string): Promise<{}> {
    await TalentService.delete(id);
    return `Talent ${id} removed`;
  }
}

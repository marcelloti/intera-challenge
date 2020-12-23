import { OpeningService } from "@src/service/opening.service";
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
  updateOpeningOAPI,
  getAllOpeningsOAPI,
  getOneOpeningsOAPI,
  saveOpeningOAPI,
  deleteOpeningOAPI
} from "./response/openings.response";

import { openingCreateRequest } from "./request/opening.request";

@JsonController()
@Authorized()
export class OpeningsController {
  @Post("/openings")
  @OpenAPI(saveOpeningOAPI)
  async create(@Body() opening: openingCreateRequest): Promise<{}> {
    return await OpeningService.create(opening);
  }

  @Get("/openings")
  @OpenAPI(getAllOpeningsOAPI)
  async findAll(): Promise<{}> {
    const openingsResult = await OpeningService.findAll();
    return openingsResult;
  }

  @Get("/openings/:id")
  @OpenAPI(getOneOpeningsOAPI)
  async findById(@Param("id") id: string): Promise<{}> {
    const opening = await OpeningService.findById(id);
    return opening;
  }

  @Put("/openings/:id")
  @OpenAPI(updateOpeningOAPI)
  async update(
    @Param("id") id: string,
    @Body() opening: openingCreateRequest
  ): Promise<{}> {
    const result = await OpeningService.update(id, opening);
    return result;
  }

  @Delete("/openings/:id")
  @OpenAPI(deleteOpeningOAPI)
  async delete(@Param("id") id: string): Promise<{}> {
    await OpeningService.delete(id);
    return `Opening ${id} removed`;
  }

  @Get("/openings/findBy/:field/:value")
  @OpenAPI(getAllOpeningsOAPI)
  async findOpeningsByPosition(
    @Param("field") field: string,
    @Param("value") value: string
  ): Promise<{}> {
    const openingsResult = await OpeningService.findByField(field, value);
    return openingsResult;
  }
}

import { openingCreateRequest } from "@src/controller/request/opening.request";
import { OpeningsRepository } from "@src/repository/openings.repository";

class OpeningService {
  public static async create(opening: openingCreateRequest): Promise<{}> {
    const response = await OpeningsRepository.insert(opening);
    return response;
  }

  public static async findAll(): Promise<{}> {
    const response = await OpeningsRepository.findAll();
    return response;
  }

  public static async findById(id: string): Promise<{}> {
    const response = await OpeningsRepository.findById(id);
    return response;
  }

  public static async update(
    id: string,
    opening: openingCreateRequest
  ): Promise<{}> {
    const response = await OpeningsRepository.update(id.toLowerCase(), opening);
    return response;
  }

  public static async delete(id: string): Promise<{}> {
    const response = await OpeningsRepository.delete(id.toLowerCase());
    return response;
  }

  public static async findByField(field: string, value: string): Promise<{}> {
    const response = await OpeningsRepository.findByField(
      field.toLowerCase(),
      value.toLowerCase()
    );
    return response;
  }
}

export { OpeningService };

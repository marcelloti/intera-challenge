import { talentCreateRequest } from "@src/controller/request/talent.request";
import { TalentsRepository } from "@src/repository/talents.repository";

class TalentService {
  public static async create(talent: talentCreateRequest): Promise<{}> {
    const response = await TalentsRepository.insert(talent);
    return response;
  }

  public static async findAll(): Promise<{}> {
    const response = await TalentsRepository.findAll();
    return response;
  }

  public static async findById(id: string): Promise<{}> {
    const response = await TalentsRepository.findById(id);
    return response;
  }

  public static async update(
    id: string,
    talent: talentCreateRequest
  ): Promise<{}> {
    const response = await TalentsRepository.update(id, talent);
    return response;
  }

  public static async delete(id: string): Promise<{}> {
    const response = await TalentsRepository.delete(id);
    return response;
  }
}

export { TalentService };

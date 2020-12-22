import { talentCreateRequest } from "@src/controller/request/talent.request";
import Talent from "@src/schema/talents";

class TalentsRepository {
  public static async insert(talent: talentCreateRequest): Promise<{}> {
    const talentRegistry = new Talent(talent);

    const result = await talentRegistry.save();

    return result.toObject();
  }

  public static async findAll(): Promise<{}> {
    const results = await Talent.find().lean().exec();

    return results;
  }

  public static async findById(id: string): Promise<{}> {
    const response = await Talent.findById(id).lean().exec();
    return response;
  }

  public static async update(
    id: string,
    talent: talentCreateRequest
  ): Promise<{}> {
    const newTalent = await Talent.findByIdAndUpdate(id, talent, { new: true })
      .lean()
      .exec();
    return newTalent;
  }

  public static async delete(id: string): Promise<{}> {
    return await Talent.findOneAndDelete({ _id: id }).exec();
  }
}

export { TalentsRepository };

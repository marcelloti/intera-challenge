import { openingCreateRequest } from "@src/controller/request/opening.request";
import Opening from "@src/schema/openings";

class OpeningsRepository {
  public static async insert(opening: openingCreateRequest): Promise<{}> {
    const openingRegistry = new Opening(opening);

    const result = await openingRegistry.save();

    return result.toObject();
  }

  public static async findAll(): Promise<{}> {
    const results = await Opening.find().lean().exec();

    return results;
  }

  public static async findById(id: string): Promise<{}> {
    const response = await Opening.findById(id).lean().exec();
    return response;
  }

  public static async findByField(field: string, value: string): Promise<{}> {
    const response = await Opening.find({})
      .where(field)
      .equals(value)
      .lean()
      .exec();
    return response;
  }

  public static async update(
    id: string,
    opening: openingCreateRequest
  ): Promise<{}> {
    const newOpening = await Opening.findByIdAndUpdate(id, opening, {
      new: true
    })
      .lean()
      .exec();
    return newOpening;
  }

  public static async delete(id: string): Promise<{}> {
    return await Opening.findOneAndDelete({ _id: id }).exec();
  }
}

export { OpeningsRepository };

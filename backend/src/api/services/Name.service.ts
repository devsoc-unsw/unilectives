import { IPostNameRequestBody, IPostNameSuccessResponse } from "IApiResponses";
import { inspect } from "util";
import { v4 as uuidv4 } from "uuid";
import { getLogger } from "../../utils/Logger";

export class NameService {
  private logger = getLogger();

  async getName(
    nameDetails: IPostNameRequestBody
  ): Promise<IPostNameSuccessResponse | undefined> {
    const nameId = uuidv4();
    const payload = {
      nameId: nameId,
      name: nameDetails.name,
    };

    const result = this.handleSuccessResponse(payload);
    return result;
  }

  async handleSuccessResponse(payload: any): Promise<IPostNameSuccessResponse> {
    this.logger.debug(
      `In handleSucccessResponse for payload ${inspect(payload)}`
    );
    return {
      nameId: payload.nameId,
      fullName: payload.name,
    };
  }
}

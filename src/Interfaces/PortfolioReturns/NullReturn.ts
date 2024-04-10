import { Dictionary } from "console-table-printer/dist/src/models/common";
import {
  HttpStatusMessage,
  SuccessfulReturn,
  SuccessfulReturnRowDict,
} from "./SuccessfulReturn.interface";
import { RowOptionsRaw } from "console-table-printer/dist/src/utils/table-helpers";
import { logger } from "../../logger/logger";

export class NullReturn implements SuccessfulReturn {
  constructor(
    public name: string,
    public pricePerShare: null = null,
    public numberOfShares: null = null,
    public statusMessage: HttpStatusMessage,
    public statusCode: number
  ) {}
  public calculateSharePrice = (): void => {
    logger.debug(
      "Invalid return found, cannot perform calculations on these stocks"
    );
  };

  public generateTableRow(): SuccessfulReturnRowDict {
    const rowObject = {
      name: this.name,
      share_price: this.pricePerShare,
      number_of_shares: this.numberOfShares,
      total_shares_value: null,
    };
    return { rowObject, colour: "red" };
  }
}

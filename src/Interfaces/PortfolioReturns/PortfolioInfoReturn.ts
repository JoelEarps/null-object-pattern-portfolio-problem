import { Dictionary } from "console-table-printer/dist/src/models/common";
import {
  HttpStatusMessage,
  SuccessfulReturn,
  SuccessfulReturnRowDict,
} from "./SuccessfulReturn.interface";
import { RowOptionsRaw } from "console-table-printer/dist/src/utils/table-helpers";
import { logger } from "../../logger/logger";

export class PortfolioReturn implements SuccessfulReturn {
  private totalShareValue: number;
  constructor(
    public name: string,
    public pricePerShare: number,
    public numberOfShares: number,
    public statusMessage: HttpStatusMessage,
    public statusCode: number
  ) {
    this.totalShareValue = this.pricePerShare * this.numberOfShares;
  }
  public calculateSharePrice = (): number => {
    logger.debug("Valid Portfolio Item found, calculating");
    return this.totalShareValue;
  };

  public generateTableRow(): SuccessfulReturnRowDict {
    const rowObject = {
      name: this.name,
      share_price: this.pricePerShare,
      number_of_shares: this.numberOfShares,
      total_shares_value: Math.round(this.totalShareValue).toFixed(2),
    };
    return { rowObject, colour: "green" };
  }
}

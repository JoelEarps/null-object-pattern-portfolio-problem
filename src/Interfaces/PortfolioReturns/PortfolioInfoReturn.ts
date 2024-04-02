import { Dictionary } from "console-table-printer/dist/src/models/common";
import {
  HttpStatusMessage,
  SuccessfulReturn,
  SuccessfulReturnRowDict,
} from "./SuccessfulReturn.interface";
import { RowOptionsRaw } from "console-table-printer/dist/src/utils/table-helpers";

export class PortfolioReturn implements SuccessfulReturn {
  constructor(
    public name: string,
    public pricePerShare: number,
    public numberOfShares: number,
    public statusMessage: HttpStatusMessage,
    public statusCode: number
  ) {}
  public calculateSharePrice = (): number => {
    console.info("Valid Portfolio Item found, calculating");
    return this.pricePerShare * this.numberOfShares;
  };
  public generateTableRow(): SuccessfulReturnRowDict {
    const rowObject = {
      name: this.name,
      value: this.pricePerShare,
      number_of_shares: this.numberOfShares,
    };
    return { rowObject, colour: "green" };
  }
}

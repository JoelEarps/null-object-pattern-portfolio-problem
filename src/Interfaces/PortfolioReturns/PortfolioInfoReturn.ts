import {
  HttpStatusMessage,
  SuccessfulReturn,
} from "./SuccessfulReturn.interface";

export class PortfolioReturn implements SuccessfulReturn {
  constructor(
    public name: string,
    public pricePerShare: number,
    public numberOfShares: number,
    public totalShareValue: number,
    public statusMessage: HttpStatusMessage,
    public statusCode: number
  ) {}
  public calculateSharePrice = (): void => {
    console.info("Valid Portfolio Item found, calculating");
  };
}

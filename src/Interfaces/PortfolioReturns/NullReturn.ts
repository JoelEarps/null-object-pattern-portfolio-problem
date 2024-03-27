import {
  HttpStatusMessage,
  SuccessfulReturn,
} from "./SuccessfulReturn.interface";

class NullReturn implements SuccessfulReturn {
  constructor(
    public name: string,
    public pricePerShare: number,
    public numberOfShares: number,
    public totalShareValue: number,
    public statusMessage: HttpStatusMessage,
    public statusCode: number
  ) {}
  public calculateSharePrice = (): void => {
    console.error(
      "Invalid return found, cannot perform calculations on these stocks"
    );
  };
}

export interface SuccessfulReturn {
  name: string;
  pricePerShare: number;
  numberOfShares: number;
  totalShareValue: number;
  statusMessage: HttpStatusMessage;
  statusCode: Number;
  calculateSharePrice(): void;
}

export enum HttpStatusMessage {
  SUCCESS,
  REDIRECTION,
  CLIENT_ERROR,
  SERVER_ERROR,
}

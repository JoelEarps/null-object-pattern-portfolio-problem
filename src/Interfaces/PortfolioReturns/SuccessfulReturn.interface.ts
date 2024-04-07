import { Dictionary } from "console-table-printer/dist/src/models/common";

export interface SuccessfulReturn {
  name: string;
  pricePerShare: number | null;
  numberOfShares: number | null;
  statusMessage: HttpStatusMessage;
  statusCode: Number;
  calculateSharePrice(): void;
  generateTableRow(): Dictionary;
}

export enum HttpStatusMessage {
  SUCCESS,
  REDIRECTION,
  CLIENT_ERROR,
  SERVER_ERROR,
}

export type SuccessfulReturnRowDict = {
  rowObject: SuccessfulReturnRowInfo;
  colour: string;
};

type SuccessfulReturnRowInfo = {
  name: string;
  share_price: number | null;
  number_of_shares: number | null;
  total_shares_value: string | null;
};

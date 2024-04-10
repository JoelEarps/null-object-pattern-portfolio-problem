import { PortfolioReturn } from "../Interfaces/PortfolioReturns/PortfolioInfoReturn";
import { SharePriceSubscriptionManager } from "../SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { NullReturn } from "../Interfaces/PortfolioReturns/NullReturn";
import { Table, printTable } from "console-table-printer";
import { HttpStatusMessage } from "../Interfaces/PortfolioReturns/SuccessfulReturn.interface";
import { logger } from "../logger/logger";

export class PortfolioManager {
  private subscriptionRawDataSet!: Set<PortfolioReturn | NullReturn>;
  private partialAverage!: number;
  private totalNumberOfStocksInPartialAverage!: number;
  private nullNumber!: number;

  constructor(private shareSubscriptionManager: SharePriceSubscriptionManager) {
    this.initialisePortfolionManager();
  }
  private initialisePortfolionManager(): void {
    // Make initial request to subscribe to service and mark as online
    this.shareSubscriptionManager.markAsOnline();
    this.subscriptionRawDataSet =
      this.shareSubscriptionManager.fetchPortfolioData();
    this.calculatePortfolioValue();
  }

  private calculatePortfolioValue(): void {
    let total: number = 0;
    let totalNotNull: number = 0;
    let totalNull: number = 0;
    // Loop through the set and calculate the portfolio value
    this.subscriptionRawDataSet.forEach((rawData) => {
      const tmp = rawData.calculateSharePrice();
      if (tmp != null) {
        total += tmp;
        totalNotNull++;
      } else {
        totalNull++;
      }
    });
    this.partialAverage = total / totalNotNull;
    this.totalNumberOfStocksInPartialAverage = totalNotNull;
    this.nullNumber = totalNull;
  }
  public printPortfolio(): void {
    logger.info("--- GENERAL INFO ---");
    logger.info(
      `Total Stocks Returned: ${this.totalNumberOfStocksInPartialAverage}`
    );
    logger.info(`Average Portfolio Value: ${this.partialAverage}`);
    logger.info("--------------------");
    logger.info("--- UNKNOWN STOCK RETURNS ---");
    logger.info(
      `Number of Stocks that could not be calculated: ${this.nullNumber}`
    );
  }

  public checkStockExists = (stockName: string): boolean => {
    logger.debug("Checking stock exists");
    let stockFound: boolean = false;
    this.subscriptionRawDataSet.forEach((rawDataItem) => {
      if (rawDataItem.name == stockName) stockFound = true;
    });
    return stockFound;
  };

  public updatePortfolioValue = (
    stockName: string,
    price: number,
    amount: number
  ): void => {
    const updatedSetItem = new PortfolioReturn(
      stockName,
      price,
      amount,
      HttpStatusMessage.SUCCESS,
      204
    );
    this.subscriptionRawDataSet.forEach((rawDataItem) => {
      if (rawDataItem.name == stockName) {
        logger.debug("Found item in set, updating...");
        this.subscriptionRawDataSet.delete(rawDataItem);
      }
    });
    this.subscriptionRawDataSet.add(updatedSetItem);
    logger.debug("Data Set Updated");
    this.calculatePortfolioValue();
  };

  public printAllPortfolioInfo(): void {
    let rows = [];
    const table = new Table();

    this.subscriptionRawDataSet.forEach((rawItem) => {
      const { rowObject, colour } = rawItem.generateTableRow();
      table.addRow(rowObject, { color: colour });
    });

    table.printTable();
  }
}

import { PortfolioReturn } from "../Interfaces/PortfolioReturns/PortfolioInfoReturn";
import { SharePriceSubscriptionManager } from "../SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { NullReturn } from "../Interfaces/PortfolioReturns/NullReturn";
import { Table, printTable } from "console-table-printer";

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

  private receiveSharePriceUpdate(): void {
    // Part receive an update changing one of the null values/ receive a periodic update
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
    console.log("Printing Portfolio");
    console.log("--- GENERAL INFO ---");
    console.log(
      `Total Stocks Returned: ${this.totalNumberOfStocksInPartialAverage}`
    );
    console.log(`Average Portfolio Value: ${this.partialAverage}`);
    console.log("--------------------");
    console.log("--- UNKNOWN STOCK RETURNS ---");
    console.log(
      `Number of Stocks that could not be calculated: ${this.nullNumber}`
    );
  }

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

import { SharePriceSubscriptionManager } from "../SharePriceSubscriptionManger/SharePriceSubscriptionManager";

export class PortfolioManager {
  constructor(
    private shareSubscriptionManager: SharePriceSubscriptionManager
  ) {}
  private initialisePortfolionManager(): void {}
  private recieveSharePriceUpdate(): void {}
  private calculatePortfolioValue(): number {
    return 1;
  }
  public printPortfolio(): void {
    this.shareSubscriptionManager.sayHello();
    console.log("Printing Portfolio");
  }
}

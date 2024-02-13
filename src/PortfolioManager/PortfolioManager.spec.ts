import { SharePriceSubscriptionManager } from "../SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { PortfolioManager } from "./PortfolioManager";

describe("PortfolioManager", () => {
  it("Should be an easy mock", () => {
    SharePriceSubscriptionManager.prototype.sayHello = jest
      .fn()
      .mockImplementation(() => {
        console.log("Hello, someone other than Joel");
      });
    const shareSub = new SharePriceSubscriptionManager("hello", "password123");
    const test = new PortfolioManager(shareSub);
    test.printPortfolio();
  });
});

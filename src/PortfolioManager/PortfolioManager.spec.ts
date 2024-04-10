import { NullReturn } from "../Interfaces/PortfolioReturns/NullReturn";
import { PortfolioReturn } from "../Interfaces/PortfolioReturns/PortfolioInfoReturn";
import { HttpStatusMessage } from "../Interfaces/PortfolioReturns/SuccessfulReturn.interface";
import { SharePriceSubscriptionManager } from "../SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { logger } from "../logger/logger";
import { PortfolioManager } from "./PortfolioManager";

describe("PortfolioManager", () => {
  it("Should be an easy mock", () => {
    SharePriceSubscriptionManager.prototype.fetchPortfolioData = jest
      .fn()
      .mockImplementation(() => {
        logger.info("Creating Fake Data for Test");
        const nullReturn = new NullReturn(
          "stock1",
          null,
          null,
          HttpStatusMessage.CLIENT_ERROR,
          101
        );
        const successfulReturn = new PortfolioReturn(
          "stock2",
          100,
          100,
          HttpStatusMessage.SUCCESS,
          204
        );
        let testReturnSet = new Set<NullReturn | PortfolioReturn>([
          nullReturn,
          successfulReturn,
        ]);
        return testReturnSet;
      });
    const shareSub = new SharePriceSubscriptionManager("test-user");
    const test = new PortfolioManager(shareSub);
    test.printPortfolio();
  });
});

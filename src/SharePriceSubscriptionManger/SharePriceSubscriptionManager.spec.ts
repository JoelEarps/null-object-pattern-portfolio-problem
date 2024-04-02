import { SharePriceSubscriptionManager } from "./SharePriceSubscriptionManager";

describe("ShareServiceSubscriptionManager", () => {
  it("should say hello", () => {
    const test = new SharePriceSubscriptionManager("test-user");
    const returnSet = test.fetchPortfolioData();
    expect(returnSet.size).toBeGreaterThanOrEqual(3);
  });
});

import { SharePriceSubscriptionManager } from "./SharePriceSubscriptionManager";

describe("ShareServiceSubscriptionManager", () => {
  it("should say hello", () => {
    const test = new SharePriceSubscriptionManager("hello", "password123");
    test.sayHello();
  });
});

import { faker } from "@faker-js/faker";
import { PortfolioReturn } from "../Interfaces/PortfolioReturns/PortfolioInfoReturn";
import { NullReturn } from "../Interfaces/PortfolioReturns/NullReturn";
import { HttpStatusMessage } from "../Interfaces/PortfolioReturns/SuccessfulReturn.interface";

export class SharePriceSubscriptionManager {
  public userOnline: boolean;
  randomDataAmount: number;
  private url: string = "www.example-trading.com";
  constructor(private userName: String) {
    this.userOnline = false;
    console.log("Waiting for user to come online");
    this.randomDataAmount = faker.number.int({ min: 3, max: 10 });
  }

  public markAsOnline() {
    this.userOnline = true;
  }

  public fetchPortfolioData(): Set<PortfolioReturn | NullReturn> {
    const returnSet = new Set<PortfolioReturn | NullReturn>();
    for (
      let fetchFakeIterator: number = 0;
      fetchFakeIterator < this.randomDataAmount;
      fetchFakeIterator++
    ) {
      if (fetchFakeIterator % 3 == 0) {
        console.log("Null Return Triggered");
        returnSet.add(
          new NullReturn(
            faker.company.name(),
            null,
            null,
            HttpStatusMessage.SERVER_ERROR,
            503
          )
        );
      } else {
        returnSet.add(
          new PortfolioReturn(
            faker.company.name(),
            faker.number.float({ fractionDigits: 2 }),
            faker.number.int({ min: 1, max: 100 }),
            HttpStatusMessage.SERVER_ERROR,
            503
          )
        );
      }
    }
    return returnSet;
  }
}

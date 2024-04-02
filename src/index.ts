import { SharePriceSubscriptionManager } from "./SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { PortfolioManager } from "./PortfolioManager/PortfolioManager";

const subscriptionManager = new SharePriceSubscriptionManager("joel.earps");
const portfolioManager = new PortfolioManager(subscriptionManager);

portfolioManager.printPortfolio();
portfolioManager.printAllPortfolioInfo();

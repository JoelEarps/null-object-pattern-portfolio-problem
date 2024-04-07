import { SharePriceSubscriptionManager } from "./SharePriceSubscriptionManger/SharePriceSubscriptionManager";
import { PortfolioManager } from "./PortfolioManager/PortfolioManager";
import { createInterface, Interface } from "readline";
import { TerminalQuestionsThatCanBeAsked } from "./Enums/TerminalQuestions/TerminalQuestion.enum";

const subscriptionManager = new SharePriceSubscriptionManager("joel.earps");
const portfolioManager = new PortfolioManager(subscriptionManager);

portfolioManager.printPortfolio();
portfolioManager.printAllPortfolioInfo();

const questionsToBeAsked: TerminalQuestionsThatCanBeAsked[] = [
  TerminalQuestionsThatCanBeAsked.UPDATE_WHICH_STOCK,
  TerminalQuestionsThatCanBeAsked.UPDATE_SHARE_PRICE,
  TerminalQuestionsThatCanBeAsked.UPDATE_SHARE_AMOUNT,
];

let questionPointer: number = 0;

// Imitates data streaming directly rather than constant request refreshing
const terminalInterface: Interface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let updatedName: string;
let updatedSharePrice: number, updatedShareAmount: number;

terminalInterface.addListener("line", (userUpdateInput: string) => {
  console.log("Input is: " + userUpdateInput);

  switch (questionPointer) {
    case 0:
      portfolioManager.checkStockExists(userUpdateInput)
        ? questionPointer++
        : console.warn("Invalid stock selected please present a valid one");

      updatedName = userUpdateInput;
      terminalInterface.setPrompt(questionsToBeAsked[questionPointer]);
      terminalInterface.prompt();
      break;
    case 1:
      console.log("Stock exists, continuing..");
      questionPointer++;
      updatedSharePrice = parseFloat(userUpdateInput);
      terminalInterface.setPrompt(questionsToBeAsked[questionPointer]);
      terminalInterface.prompt();
      break;
    case 2:
      questionPointer = 0;
      updatedShareAmount = parseFloat(userUpdateInput);
      portfolioManager.updatePortfolioValue(
        updatedName,
        updatedSharePrice,
        updatedShareAmount
      );
      portfolioManager.printPortfolio();
      portfolioManager.printAllPortfolioInfo();
      terminalInterface.setPrompt(questionsToBeAsked[questionPointer]);
      terminalInterface.prompt();
      break;
    default:
      console.error("Exceeded boundary and therefore invalid question");
  }
});

terminalInterface.addListener("SIGINT", () => {
  if (questionPointer > 0) {
    console.warn("Please be aware you are leaving whilst in a question loop");
  }
  console.log("Thanks for trying");
  terminalInterface.close();
});

// Using Terminal interface here would simulate the user updating the price, or potentially buying a new stock.
// However to make this more realistic you could periodically update the subscription manager to get updated prices
// However as faker is used, this would then add circular dependencies and as the purpose is to demonstrate the null object pattern, how the data is updated is not important.
terminalInterface.setPrompt(questionsToBeAsked[questionPointer]);
terminalInterface.prompt();

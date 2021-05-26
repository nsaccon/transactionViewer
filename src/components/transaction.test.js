import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Transaction from './transaction'

const transactionData = {
    id: "100000",
    amountInUSDCents: 100,
    amountInCADCents: 100,
    date: "5/20/2021",
    merchantNetworkId: "700000",
    cardId: "sk_100000000",
  };

  const merchants = [
      {
        currency: "USD",
        name: "Company 1",
        networkId: "700000"
      },
      {
        currency: "CAD",
        name: "Company 2",
        networkId: "200000"
      }];

it("Transaction renders with merchant name", () => {
    render(<Transaction transactionData={transactionData} merchants={merchants} isUSD={true} />);
    const transactionElement = screen.getByTestId('transaction_nameMerchant_test');
    expect(transactionElement).toHaveTextContent('Company 1');
});

it("Transaction renders with date", () => {
    render(<Transaction transactionData={transactionData} merchants={merchants} isUSD={true} />);
    const transactionElement = screen.getByTestId('transaction_date_test');
    expect(transactionElement).toHaveTextContent('5/20/2021');
});

it("Transaction renders with amount", () => {
    render(<Transaction transactionData={transactionData} merchants={merchants} isUSD={true} />);
    const transactionElement = screen.getByTestId('transaction_amount_test');
    expect(transactionElement).toHaveTextContent('$1.00 USD');
});
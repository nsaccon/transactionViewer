import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import User from "./user";

const userData = {
  id: 3,
  firstName: "John",
  lastName: "Dough",
  cardId: "sk_100000000",
};

const transactionData = [
  {
    id: "100000",
    amountInUSDCents: 100,
    amountInCADCents: 200,
    date: "5/20/2021",
    merchantNetworkId: "700000",
    cardId: "sk_100000000",
  },
  {
    id: "100001",
    amountInUSDCents: 900,
    amountInCADCents: 1000,
    date: "5/21/2021",
    merchantNetworkId: "200000",
    cardId: "sk_100000000",
  },
];

const merchants = [
  {
    currency: "USD",
    name: "Company 1",
    networkId: "700000",
  },
  {
    currency: "CAD",
    name: "Company 2",
    networkId: "200000",
  },
];

it("User renders with name showing", () => {
  render(<User userData={userData} transactionData={transactionData} merchantData={merchants} isUSD={true} />);
  const userElement = screen.getByTestId("user_name_test");
  expect(userElement).toHaveTextContent("John Dough");
});

it("User renders with total showing", () => {
  render(<User userData={userData} transactionData={transactionData} merchantData={merchants} isUSD={true} />);
  const userElement = screen.getByTestId("user_total_test");
  expect(userElement).toHaveTextContent("Total: $10.00 USD");
});

it("User renders with total showing in CAD", () => {
  render(<User userData={userData} transactionData={transactionData} merchantData={merchants} isUSD={false} />);
  const userElement = screen.getByTestId("user_total_test");
  expect(userElement).toHaveTextContent("Total: $12.00 CAD");
});

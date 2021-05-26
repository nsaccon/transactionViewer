// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

it("App renders without crashing", () => {
  const app = document.createElement("div");
  ReactDOM.render(<App />, app);
});

it("App renders with users showing", () => {
  render(<App />);
  setTimeout(() => {
    const users = screen.getAllByTestId("user_test");
    expect(users.length).toBeGreaterThanOrEqual(2);
  }, 3500);
});

it("App renders without any transactions showing", () => {
  render(<App />);

  setTimeout(() => {
    const transactions = screen.getAllByTestId("transaction_details_test");
    expect(transactions.length).toBeLessThanOrEqual(0);
  }, 3500);
});

it("App renders transactions after user clicks name", () => {
  render(<App />);

  setTimeout(() => {
    const user1 = screen.getAllByTestId("user_test")[0];
    fireEvent.click(user1);
    const transactions = screen.getAllByTestId("transaction_details_test");
    expect(transactions.length).toBeGreaterThan(0);
  }, 3500);
});

it("App renders with USD currency chosen", () => {
  render(<App />);
  const currency = screen.getByTestId("header_currencyType_test");
  expect(currency).toHaveTextContent("Currency: USD");
});

it("App renders changes to CAD currency upon click", () => {
  render(<App />);
  const currencyToggle = screen.getByTestId("header_currencyToggle_test");
  fireEvent.click(currencyToggle);
  const currency = screen.getByTestId("header_currencyType_test");
  expect(currency).toHaveTextContent("Currency: CAD");
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from './header'

it("App renders with user transaction title", () => {
    render(<Header />)
    const element = screen.getByTestId('header_title_test');
    expect(element).toHaveTextContent('User Transactions');
});

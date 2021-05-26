import React from "react";
import "./header.css";
import Toggle from "react-toggle";
import "../css/toggle.css";
import { FaCanadianMapleLeaf, FaFlagUsa } from "react-icons/fa";

const Header = ({ isUSD, currencyChange }) => {
  return (
    <div className="header">
      <h1 className="header_title" data-testid="header_title_test">
        User Transactions
      </h1>
      <div className="header_currency">
        <label>
          <Toggle
            className="header_currencyToggle"
            data-testid="header_currencyToggle_test"
            defaultChecked={isUSD}
            icons={{
              checked: <FaFlagUsa color="darkred" />,
              unchecked: <FaCanadianMapleLeaf color="white" />,
            }}
            onChange={currencyChange}
          />
        </label>
        <span
          className="header_currencyType"
          data-testid="header_currencyType_test"
        >
          Currency: {isUSD ? "USD" : "CAD"}
        </span>
      </div>
    </div>
  );
};

export default Header;

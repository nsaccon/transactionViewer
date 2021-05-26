import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.css";
import Transaction from "./transaction";

const User = ({ userData, transactionData, merchantData, isUSD }) => {
  transactionData = transactionData.filter((t) => t.cardId == userData.cardId);

  let totalCents = 0;
  for (let i = 0; i < transactionData.length; i++) {
    if(isUSD){
      totalCents += transactionData[i].amountInUSDCents;
    }else{
      totalCents += transactionData[i].amountInCADCents;
    }
    
  }
  totalCents = (totalCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  function currencyString() {
    if (isUSD) {
      return "USD";
    } else {
      return "CAD";
    }
  }

  return (
    <div className="user" data-testid="user_test">
      {userData ? (
        <Accordion defaultActiveKey="1">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="text" eventKey="0">
                <div className="user_detail" data-testid="user_detail_test">
                  <div className="user_name" data-testid="user_name_test">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div className="user_total" data-testid="user_total_test">
                    Total: {totalCents} {currencyString()}
                  </div>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <table
                  className="user_transactionTable"
                  data-testid="user_transactionTable_test"
                >
                  <tbody>
                    <tr>
                      <th
                        className="user_tableHeaderDate"
                        data-testid="user_tableHeaderDate_test"
                      >
                        Date
                      </th>
                      <th
                        className="user_tableHeaderMerchant"
                        data-testid="user_tableHeaderMerchant_test"
                      >
                        Merchant
                      </th>
                      <th
                        className="user_tableHeaderAmount"
                        data-testid="user_tableHeaderAmount_test"
                      >
                        Amount
                      </th>
                    </tr>
                    {transactionData ? (
                      transactionData.map((transaction) => (
                        <Transaction
                        isUSD={isUSD}
                          transactionData={transaction}
                          merchants={merchantData}
                        />
                      ))
                    ) : (
                      <tr>
                        <td
                          className="user_tableHeaderDate"
                          data-testid="user_tableHeaderDate_test"
                        >
                          Date
                        </td>
                        <td
                          className="user_tableHeaderMerchant"
                          data-testid="user_tableHeaderMerchant_test"
                        >
                          Merchant
                        </td>
                        <td
                          className="user_tableHeaderAmount"
                          data-testid="user_tableHeaderAmount_test"
                        >
                          Amount
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default User;

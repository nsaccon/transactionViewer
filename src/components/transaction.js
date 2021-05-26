import React from "react";
import "./transaction.css";

const Transaction = ({ transactionData, merchants, isUSD }) => {
  let merchant = merchants.find(
    (val) => val.networkId === transactionData.merchantNetworkId
  );
  let amountStr;
  if(isUSD){
    amountStr = (transactionData.amountInUSDCents / 100).toLocaleString("en-US",{ style: "currency", currency: "USD" });
  }else{
    amountStr = (transactionData.amountInCADCents / 100).toLocaleString("en-US",{ style: "currency", currency: "USD" });
  }
  
  return (
    <tr key={transactionData.id} className='transaction_details' data-testid="transaction_details_test">
      <td className='transaction_date' data-testid="transaction_date_test">{transactionData.date.toLocaleString().split(',')[0]}</td>
      <td className='transaction_nameMerchant' data-testid="transaction_nameMerchant_test">{merchant.name}</td>
      <td className='transaction_amount' data-testid="transaction_amount_test">{amountStr} {isUSD ? "USD" : "CAD"}</td>
    </tr>
  );
};

export default Transaction;

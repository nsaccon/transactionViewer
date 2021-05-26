import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { getMerchants, getTransactions, getUsers } from "./utils/GraphQLData";
import Header from "./components/header";
import User from "./components/user";
import './App.css'

const Content = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;

function App() {
  let fetched = false;
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isUSD, setIsUSD] = useState(true);

  async function fetchUsers() {
    const request = await getUsers();
    setUsers(request);
    return request;
  }
  async function fetchMerchants() {
    const request = await getMerchants();
    setMerchants(request);
    return request;
  }
  async function fetchTransactions() {
    let request = await getTransactions();
    request = request.sort((a, b) => b.date - a.date);
    transactionsAddCAD(request);
    setTransactions(request);
    return request;
  }

  function onCurrencyChange(){
    setIsUSD(!isUSD);
  }

  function transactionsAddCAD(transactionsLst){
    for (let i = 0; i < transactionsLst.length; i++) {
      transactionsLst[i].amountInCADCents = transactionsLst[i].amountInUSDCents * 1.2;
    }
  }

  useEffect(() => {
    if (!fetched) {
      fetchUsers();
      fetchTransactions();
      fetchMerchants();
    }
    return () => {
      fetched = true;
    };
  });

  return (
    <Content>
      <Header isUSD={isUSD} currencyChange={onCurrencyChange} />
      <div className="app_users">
      {users.length > 0 ? (
        users.map((user) => (
          <User key={user.id}
            userData={user}
            transactionData={transactions}
            merchantData={merchants}
            isUSD={isUSD}
          />
        ))
      ) : (
        <div>No Users found</div>
      )}
      </div>
      
    </Content>
  );
}

export default App;

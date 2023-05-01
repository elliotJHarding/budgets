import React, {Component, createContext, useContext, useEffect, useState} from "react";
import './Transactions.css'
import axios, {create} from "axios";
import {AuthContext} from "../Auth/AuthContext";
import Config from "../../Config";
import TransactionList from "./TransactionList";
import {useNavigate} from "react-router-dom";
import AccountList from "../Accounts/AccountList";
import TransactionFilter from "./TransactionFilter";

export const FilterContext = createContext()

export default function Transactions(props) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);

    const [accounts, setAccounts] = useState([]);

    const [filter, setFilter] = useState({
        value: {
            min: null,
            max: null,
        },
        activeAccounts: [],
        inOut: 0
    })

    const navigate = useNavigate();

    const token = authContext.token
    const authorized = authContext.authorized()

    const filterTransactions = (transactionList) => {
        let result = [];
        result = transactionList.sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime())
        result = result.filter(transaction => filter.activeAccounts.includes(transaction.accountId))
        result = result.filter(transaction => {
            switch (filter.inOut) {
                case 0:
                    return true
                case 1:
                    return transaction.value.amount > 0
                case -1:
                    return transaction.value.amount < 0
            }
        })
        result = result.filter(transaction => {
            if
            ((filter.value.min == null || transaction.value.amount > filter.value.min) &&
                (filter.value.max == null || transaction.value.amount < filter.value.max))
            { return true } else { return false}
        })
        return result;
    }

    const getTransactionData = async () => {
        axios
            .get(
                Config.Endpoints.Transactions,
                { headers: { Authorization: `Token ${token}`}}
            )
            .then((response) => {
                setTransactions(transformTransactionData(response.data.accounts))
                setAccounts(response.data.accounts)
                setFilter({...filter, activeAccounts: response.data.accounts.map(account => account.accountId)})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const transformTransactionData = (transactionData) => {
        let transactions = []
        transactionData.forEach((account) => {
            account.transactions.forEach((transaction) => {
                transaction.itemType = 'TRANSACTION'
                transaction.accountId = account.accountId
                transaction.accountName = account.accountName
                transaction.bankName = account.bankName
                transaction.logo = account.logo
                transactions.push(transaction)
            })
           })

        return transactions
    }

    useEffect(() => {
        if(authorized) {
           getTransactionData()
        } else {
            navigate("/")
        }
    }, [])

    return (
       <div className="page transactions">
           <FilterContext.Provider value={{filter, setFilter}}>
               <div className="filters">
                   <AccountList accounts={accounts} />
                   <TransactionFilter/>
               </div>
               <TransactionList transactions={filterTransactions(transactions)}/>
           </FilterContext.Provider>
       </div>
    )
}

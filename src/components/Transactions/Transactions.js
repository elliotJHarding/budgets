import React, {Component, createContext, useContext, useEffect, useState} from "react";
import './Transactions.css'
import axios, {create} from "axios";
import {AuthContext} from "../Auth/AuthContext";
import Config from "../../Config";
import TransactionList from "./TransactionList";
import {useNavigate} from "react-router-dom";
import AccountList from "../Accounts/AccountList";
import TransactionFilter from "./TransactionFilter";
import Tags from "./Tags";

export const FilterContext = createContext();
export const TagContext = createContext();
export const TransactionsContext = createContext();

export default function Transactions(props) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true)

    const [filter, setFilter] = useState({
        value: {
            min: null,
            max: null,
        },
        activeAccounts: [],
        inOut: 0
    })

    const [tagContext, setTagContext] = useState({
        filter: '',
        tags: [],
        selectedTransaction: null
    })

    const navigate = useNavigate();

    const token = authContext.token
    const authorized = authContext.authorized()

    const filterTransactions = (transactionList) => {
        let result = [];
        let links = transactionList.filter(transaction => transaction.itemType == 'LINK')
        let linkedTransactions = []
        links.forEach((link) => {
            linkedTransactions.push(link.fromTransactionId)
            linkedTransactions.push(link.toTransactionId)
        })

        result = result.concat(transactionList)

        if (filter.activeAccounts.length > 0) {
            result = result.filter(transaction => filter.activeAccounts.includes(transaction.accountId))
        }

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
        result = result.filter(transaction => !linkedTransactions.includes(transaction.transactionId))
        result = result.sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime())
        return result;
    }

    const getTransactionData = async () => {
        axios
            .get(
                Config.Endpoints.Transactions.get,
                { headers: { Authorization: `Token ${token}`}}
            )
            .then((response) => {
                setTransactions(transformTransactionData(response.data))
                setAccounts(response.data.accounts)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const transformTransactionData = (transactionData) => {
        let transactions = []
        transactionData.accounts.forEach((account) => {
            account.transactions.forEach((transaction) => {
                transaction.itemType = 'TRANSACTION'
                transaction.accountId = account.accountId
                transaction.accountName = account.accountName
                transaction.bankName = account.bankName
                transaction.logo = account.logo
                transactions.push(transaction)
            })
           })

        transactionData.links.forEach((link) => {
            link.itemType = 'LINK'
            link.from_logo = transactionData.accounts.find(account => account.accountId == link.fromAccountId).logo
            link.to_logo = transactionData.accounts.find(account => account.accountId == link.toAccountId).logo
            transactions.push(link)
        })

        setTagContext({...tagContext, tags: transactionData.tags})

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
               <TagContext.Provider value={{tagContext, setTagContext}}>
                   <TransactionsContext.Provider value={{transactions, setTransactions}}>
                       <div className="filters">
                           <AccountList loading={loading} accounts={accounts} />
                           <Tags/>
                       </div>
                       <div className="filters">
                           <TransactionFilter/>
                           <TransactionList loading={loading} transactions={filterTransactions(transactions)}/>
                       </div>
                   </TransactionsContext.Provider>
               </TagContext.Provider>
           </FilterContext.Provider>
       </div>
    )
}


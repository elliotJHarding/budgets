import React, {Component, createContext, useContext, useEffect, useState} from "react";
import './Transactions.css'
import {AuthContext} from "../Auth/AuthContext";
import TransactionList from "./TransactionList";
import {useNavigate} from "react-router-dom";
import AccountList from "../Accounts/AccountList";
import TransactionFilter from "./TransactionFilter";
import Tags from "../Tag/Tags";
import {Repository} from "../../Repository";

export const FilterContext = createContext();
export const TagContext = createContext();
export const TransactionsContext = createContext();

export default function Transactions(props) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true)

    const [filter, setFilter] = useState({
        reference: '',
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
        holidays: [],
        selectedTransactions:[]
    })

    const navigate = useNavigate();

    const authorized = authContext.authorized()

    const filterTransactions = (transactionList) => {
        let result = [];
        let links = transactionList.filter(transaction => transaction.itemType === 'LINK')
        let linkedTransactions = []
        links.forEach((link) => {
            linkedTransactions.push(link.fromTransactionId)
            linkedTransactions.push(link.toTransactionId)
        })

        result = result.concat(transactionList)

        if (filter.activeAccounts.length > 0) {
            result = result.filter(transaction => filter.activeAccounts.includes(transaction.accountId))
        }

        if (filter.reference !== '') {
            result = result.filter(transaction => transaction.reference.includes(filter.reference) || (transaction.tag != null && transaction.tag.name.toLowerCase() === filter.reference.toLowerCase()))
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
        result = result.sort((a, b) => a.bookingDateTime !== b.bookingDateTime ? new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime(): a.id - b.id)
        return result;
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
                transaction.colour = account.colour
                transactions.push(transaction)
            })
           })

        transactionData.links.forEach((link) => {
            link.itemType = 'LINK'
            let from_account =  transactionData.accounts.find(account => account.accountId === link.fromAccountId)
            link.from_logo = from_account.logo
            link.from_colour = from_account.colour
            let to_account = transactionData.accounts.find(account => account.accountId === link.toAccountId)
            link.to_logo = to_account.logo
            link.to_colour = to_account.colour
            transactions.push(link)
        })

        setTagContext({...tagContext, tags: transactionData.tags, holidays: transactionData.holidays})

        return transactions
    }

    useEffect(() => {
        if(authorized) {
            Repository.getTransactions(authContext, (response) => {
                setTransactions(transformTransactionData(response.data))
                setAccounts(response.data.accounts)
                setLoading(false)
            });
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
                           <input placeholder="Search Transactions" className="transaction-search" onChange={e => setFilter({...filter, reference: e.target.value})}/>
                           <TransactionList loading={loading} transactions={filterTransactions(transactions)} setTransactions={setTransactions}/>
                       </div>
                   </TransactionsContext.Provider>
               </TagContext.Provider>
           </FilterContext.Provider>
       </div>
    )
}


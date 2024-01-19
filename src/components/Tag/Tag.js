import React, {useContext} from "react";
import '../Transactions/Transactions.css'
import {TransactionsContext} from "../Transactions/Transactions";
import {AuthContext} from "../Auth/AuthContext";
import {Repository} from "../../Repository";

function updateTransaction(transactions, transactionId) {

    let new_transactions = transactions.filter(transaction => transaction.transactionId != transactionId);
    let transaction = transactions.find(transaction => transaction.transactionId == transactionId);
    transaction.tag = null
    new_transactions.push(transaction);
    return new_transactions;
}

export default function Tag({transactionId, tag}) {

    const {authContext, setAuthContext} = useContext(AuthContext)
    const {transactions, setTransactions} = useContext(TransactionsContext)

    const tag_icon = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/label/default/48px.svg"
    if (tag === undefined || tag === null) {
        return (
            <div className="tagButton" >
                <img src={tag_icon}/>
            </div>)
    } else {
        return (
            <div className="tagChip" onClick={() => {
                Repository.removeTag(transactionId, authContext)
                setTransactions(updateTransaction(transactions, transactionId))
            }}>
               <img src={tag.icon}/>
                <p>{tag.name}</p>
            </div>
        )
    }
}
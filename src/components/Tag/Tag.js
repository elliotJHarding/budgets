import React, {useContext} from "react";
import '../Transactions/Transactions.css'
import {motion} from "framer-motion";
import {FilterContext, TagContext, TransactionsContext} from "../Transactions/Transactions";
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";


function removeTag(token, transactionId) {

    axios
        .post(
            Config.Endpoints.Transactions.tag,
            {
                transactionId: transactionId,
            },
            {headers: {Authorization: `Token ${token}`}}
        )
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

function updateTransaction(transactions, transactionId) {

    let new_transactions = transactions.filter(transaction => transaction.transactionId != transactionId);
    let transaction = transactions.find(transaction => transaction.transactionId == transactionId);
    transaction.tag = null
    new_transactions.push(transaction);
    return new_transactions;
}

export default function Tag(props) {

    const {tagContext, setTagContext} = useContext(TagContext)
    const {authContext, setAuthContext} = useContext(AuthContext)
    const {transactions, setTransactions} = useContext(TransactionsContext)
    const {filter, setFilter} = useContext(FilterContext)

    const tag_icon = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/label/default/48px.svg"
    if (props.tag == undefined) {
        return (
            <div className="tagButton" >
                <img src={tag_icon}/>
            </div>)
    } else {
        return (
            <div className="tagChip" onClick={() => {
                removeTag(authContext.token, props.transactionId)
                setTransactions(updateTransaction(transactions, props.transactionId))
            }}
            >
               <img src={props.tag.icon}/>
                <p>{props.tag.name}</p>
            </div>
        )
    }
}
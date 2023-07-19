import React, {useContext} from "react";
import '../Transactions/Transactions.css'
import {motion} from "framer-motion";
import {TagContext, TransactionsContext} from "../Transactions/Transactions";
import './Tag.css'
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";

function updateTag(token, transactionId, tagId) {

    axios
        .post(
            Config.Endpoints.Transactions.tag,
            {
                transactionId: transactionId,
                tagId: tagId
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

function updateTransaction(transactions, transactionId, tags, tagId) {

    let new_transactions = transactions.filter(transaction => transaction.transactionId != transactionId);
    let transaction = transactions.find(transaction => transaction.transactionId == transactionId);
    let child_tags = tags.map(tag => tag.childTags)
    let tags_expanded = tags.concat(child_tags.flat());
    transaction.tag = tags_expanded.find(tag => tag.id == tagId)
    new_transactions.push(transaction);
    return new_transactions;
}

function ChildTag(props) {
    const {authContext, setAuthContext} = useContext(AuthContext)
    const {tagContext, setTagContext} = useContext(TagContext)
    const {transactions, setTransactions} = useContext(TransactionsContext)

    return (
        <div className="childTag" onClick={event => {
            event.stopPropagation()
            updateTag(authContext.token, props.selectedTransactionId, props.tag.id)
            setTransactions(updateTransaction(transactions, props.selectedTransactionId, tagContext.tags, props.tag.id))
        }}>
            <img src={props.tag.icon}/>
            <p>{props.tag.name}</p>
        </div>
    )
}

function Tag(props) {
    const {authContext, setAuthContext} = useContext(AuthContext)
    const {tagContext, setTagContext} = useContext(TagContext)
    const {transactions, setTransactions} = useContext(TransactionsContext)

    const childTagItems = props.tag.childTags
        .filter(tagItem => tagItem.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map(tagItem => <ChildTag tag={tagItem} selectedTransactionId={tagContext.selectedTransaction}/>)

    return (
        <div className="tag" onClick={() => {
            updateTag(authContext.token, props.selectedTransactionId, props.tag.id)
            setTransactions(updateTransaction(transactions, props.selectedTransactionId, tagContext.tags, props.tag.id))
        }}>
            <div className="parent">
                <img src={props.tag.icon}/>
                <p>{props.tag.name}</p>
            </div>
            <div className="childTags">
                {childTagItems}
            </div>
        </div>
    )
}

export default function TagList(props) {

    const {tagContext, setTagContext} = useContext(TagContext)

    const tagItems = tagContext.tags
        .filter(tagItem => filterTag(tagItem, tagContext.filter))
        .map(tagItem => <Tag tag={tagItem} filter={tagContext.filter} selectedTransactionId={tagContext.selectedTransaction}/>)

    return (
        <div layout="position" className={`tagList`}>{tagItems}</div>
    )
}

function filterTag(tag, filter) {

    if (tag.name.toLowerCase().includes(filter.toLowerCase())) {
        return true
    }

    for (let i = 0; i < tag.childTags.length; i++) {
        if (tag.childTags[i].name.toLowerCase().includes(filter.toLowerCase())) {
            return true
        }
    }

    return false;
}

import React, {useContext, useState} from "react";
import '../Transactions/Transactions.css'
import {motion} from "framer-motion";
import {FilterContext, TagContext, TransactionsContext} from "../Transactions/Transactions";
import TagList from "./TagList";
import Icon from "../Common/Icon";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Config from "../../Config";
import {Auth, AuthContext} from "../Auth/AuthContext";
import TagItem from "./TagItem";

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
            // console.log(response)
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


export default function Tags({selectedTransaction}) {

    const {transactions, setTransactions} = useContext(TransactionsContext);
    const {authContext, setAuthContext} = useContext(AuthContext);
    const {tagContext, setTagContext} = useContext(TagContext);
    const {filter, setFilter} = useContext(FilterContext);

    const [labelIcon, setLabelIcon] = useState('label')

    const navigate = useNavigate();

    const toggleTagEditor = () => {
        navigate('/tags')
    }

    return (
        <motion.div layout="position" className="card tagCard">
            <div className="search--container">
                <div onClick={() => toggleTagEditor()} onMouseEnter={() => setLabelIcon('new_label')} onMouseLeave={() => setLabelIcon('label')}>
                    <Icon name={labelIcon} hover={true}/>
                </div>
                <input placeholder="Search tags" onInput={e => setTagContext({...tagContext, filter: e.target.value})}/>
            </div>
            <TagList
                tags={tagContext.tags
                    .filter(tagItem => filterTag(tagItem, tagContext.filter))
                }
                tagOnClick={(event, tag) => {
                    event.stopPropagation()
                    updateTag(authContext.token, tagContext.selectedTransaction, tag.id)
                    setTransactions(updateTransaction(transactions, tagContext.selectedTransaction, tagContext.tags, tag.id))
                }}
                tagOnDoubleClick={(event, tag) => {
                    event.stopPropagation()
                    if (filter.reference != '') {
                        transactions.forEach(transaction => {
                            transaction.itemType == 'TRANSACTION' && setTransactions(updateTransaction(transactions, transaction, tagContext.tags, tag.id))
                        })
                    }
                }
                }
                filter={tagContext.filter}
                includeSubTags={true}/>
        </motion.div>
    )
}
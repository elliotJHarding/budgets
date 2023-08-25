import React, {useContext, useState} from "react";
import TagList from "./TagList";
import Icon from "../Common/Icon";
import {TagContext, TransactionsContext} from "../Transactions/Transactions";
import RuleList from "./RuleList";
import TransactionList from "../Transactions/TransactionList";
import {motion} from "framer-motion";
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";

export default function TagDetails({tag, setTag}) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const {tagContext, setTagContext} = useContext(TagContext);
    const {transactions, setTransactions} = useContext(TransactionsContext);

    const [newRule, setNewRule] = useState('')

    const [newTagName, setNewTagName] = useState('')
    const [newTagIcon, setNewTagIcon] = useState('')

    if (tag == null) {
        return null
    }

    const hasSubTags = tag.childTags != null

    const back = () => {
        console.log(tagContext)
        let parentTag = tagContext.tags.find(upperTag => upperTag.childTags.includes(tag))
        setTag(parentTag)
    }

    const addTag = async () => {
       axios
           .put(
               Config.Endpoints.Tags,
               {
                   name: newTagName,
                   icon: newTagIcon,
                   parentTag: tag.id
               },
               { headers: authContext.header() }
           )
           .then()
           .catch(error => console.log(error))
    }

    const addRule = async () => {
        if (newRule.length > 0 && tag.rules.filter(rule => rule.expression == newRule).length == 0) {
            setTag({...tag, rules: tag.rules.concat([{expression: newRule}])})
            axios
                .put(
                    Config.Endpoints.Rules,
                    {
                        tagId: tag.id,
                        expression: newRule,
                    },
                    { headers: authContext.header()}
                )
                .then((response) => {

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const filterTransactions = (txs) => {
        let result = [];

        if (newRule != '' | tag.rules.length == 0) {
            result = result.concat(txs.filter(tx => tx.reference.toLowerCase().includes(newRule.toLowerCase())));
        }

        tag.rules.forEach( rule => {
            result = result.concat(txs.filter(tx => tx.reference.toLowerCase().includes(rule.expression.toLowerCase())))
        })

        result = [...new Set(result)]
        result = result.sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime())

        return result;
    }

    const newTagInputRow =
        <div className="newTag inputRow">
            <input placeholder='Name' onChange={e => setNewTagName(e.target.value)}/>
            <input placeholder='Icon' onChange={e => setNewTagIcon(e.target.value)}/>
            <button className='hover' onClick={addTag}>
                <Icon name='add'/>
            </button>
        </div>

    const newRuleInputRow =
        <div className="inputRow">
            <input placeholder='Rule' onChange={(e) => setNewRule(e.target.value)}/>
            <button className='hover' onClick={addRule}>
                <Icon name='add'/>
            </button>
        </div>


    const subTags =
        <div className="card">
            <h2>Sub Tags</h2>
            { newTagInputRow }
            <TagList tags={tag.childTags} includeSubTags={false} editable={true} tagOnClick={(event, newTag) => setTag(newTag)}/>
        </div>

    const ruleList =
        <motion.div layout="position" className="card">
            { newRuleInputRow }
            <RuleList rules={tag.rules}/>
        </motion.div>

    const matchingTransactions =
        <div className="column">
            <TransactionList transactions={filterTransactions(transactions)}/>
        </div>


    return (
        <div className="tagDetails">
            <div className="column">
                <div className="tagHeader card">
                    <img src={tag.icon}/>
                    <h1>{tag.name}</h1>
                    <div className="spacer"/>
                    <button className="minimal" onClick={back}><Icon name="arrow_back_ios_new"/></button>
                </div>
                { hasSubTags && subTags}
                { ruleList }
            </div>
            { matchingTransactions }
        </div>
    )
}
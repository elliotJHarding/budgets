import React, {useContext, useState} from "react";
import TagList from "./TagList";
import Icon from "../Common/Icon";
import {TagContext, TransactionsContext} from "../Transactions/Transactions";
import RuleList from "./RuleList";
import TransactionList from "../Transactions/TransactionList";
import {motion} from "framer-motion";
import {AuthContext} from "../Auth/AuthContext";
import Modal from "../Common/Modal";
import {Repository} from "../../Repository";

export default function TagDetails({tag, setTag, categories}) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const {tagContext, setTagContext} = useContext(TagContext);
    const {transactions, setTransactions} = useContext(TransactionsContext);

    const [newRule, setNewRule] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(tag != null && tag.category != null ? tag.category.code : null)

    const [newTagName, setNewTagName] = useState('')
    const [newTagIcon, setNewTagIcon] = useState('')

    const [addModalVisible, setAddModalVisible] = useState(false)

    const tagIconUrl = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/new_label/default/48px.svg'

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
        if (newTagIcon === '' || newTagName === '') { return }
        Repository.addTag(authContext,
            {
                name: newTagName,
                icon: newTagIcon,
                parentTag: tag.id
            })
    }

    const addRule = async () => {
        if (newRule.length > 0 && tag.rules.filter(rule => rule.expression === newRule).length === 0) {
            setTag({...tag, rules: tag.rules.concat([{expression: newRule}])})
            Repository.addRule(authContext,
                {
                    tagId: tag.id,
                    expression: newRule,
                })
        }
    }

    const setTagCategory = async (code) => {
        if (code != null) {
            Repository.setTagCategory(authContext, tag.id, code)
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
            <div className="column">
                <input placeholder='Name' onChange={e => setNewTagName(e.target.value)}/>
                <input placeholder='Icon' onChange={e => setNewTagIcon(e.target.value)}/>
            </div>
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
            <div className="row">
                <h2>Sub Tags</h2>
                <div className="spacer"/>
                <button onClick={() =>  {setAddModalVisible(true);console.log(addModalVisible)}}><Icon name="add" /></button>
                <Modal visible={addModalVisible} setVisible={setAddModalVisible}>
                    <div className="tagHeader">
                        <img src={newTagIcon.includes('.svg') ? newTagIcon : tagIconUrl}/>
                        <h2>{newTagName === '' ? 'New Tag': newTagName}</h2>
                    </div>
                    <input placeholder='Name' onChange={e => setNewTagName(e.target.value)}/>
                    <input placeholder='Icon' onChange={e => setNewTagIcon(e.target.value)}/>
                    <div className="row">
                        <div className="spacer"/>
                        <button className='hover negative' onClick={() => {
                            setAddModalVisible(false)
                            setNewTagName('')
                            setNewTagIcon('')
                        }}>
                            <Icon name='close'/>
                        </button>
                        <button className='hover positive' onClick={addTag}>
                            <Icon name='done'/>
                        </button>
                    </div>

                </Modal>
            </div>
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

    const categoryOptions = categories != null ? categories.map(category => <option value={category.code}>{category.name}</option>) : [];

    const categorySelect =
        <div className="card">
            { tag.category != null && <div className="chip primary padding"><p>{tag.category.name}</p></div> }
            <select value={selectedCategory} onChange={event => {
                setSelectedCategory(event.target.value);
                setTagCategory(event.target.value);
            }}>
                <option value={null}>Category</option>
                {categoryOptions}
            </select>
        </div>

    return (
        <div className="tagDetails">
            <div className="column gap">
                <div className="tagHeader card">
                    <img src={tag.icon}/>
                    <h1>{tag.name}</h1>
                    <div className="spacer"/>
                    <button className="minimal" onClick={back}><Icon name="arrow_back_ios_new"/></button>
                </div>
                <div className="tag-settings scroll column gap">
                    { hasSubTags && categorySelect}
                    { hasSubTags && subTags}
                    { ruleList }
                </div>
            </div>
            { matchingTransactions }
        </div>
    )
}
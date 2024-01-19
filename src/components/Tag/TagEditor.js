import React, {useContext, useEffect, useState} from "react";
import TagList from "./TagList";
import {FilterContext, TagContext, TransactionsContext} from "../Transactions/Transactions";
import './Tag.css'
import {AuthContext} from "../Auth/AuthContext";
import TagDetails from "./TagDetails";
import Icon from "../Common/Icon";
import {motion} from "framer-motion";
import Modal from "../Common/Modal";
import {Repository} from "../../Repository";

export default function TagEditor(props) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [tagContext, setTagContext] = useState({
        filter: '',
        tags: [],
        selectedTransactions: [],

    })

    const [categories, setCategories] = useState([])

    const [filter, setFilter] = useState({})

    const [transactions, setTransactions] = useState([])

    const [selectedTag, setSelectedTag] = useState(null);

    const [newTagName, setNewTagName] = useState('')
    const [newTagIcon, setNewTagIcon] = useState('')
    const [addModalVisible, setAddModalVisible] = useState(false)
    const tagIconUrl = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/new_label/default/48px.svg'

    const addTag = async () => {
        if (newTagIcon === '' || newTagName === '') { return }
        Repository.addTag(authContext, {
            name: newTagName,
            icon: newTagIcon
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

        return transactions
    }

    useEffect(() => {
        Repository.loadTags(authContext, (response) => {
            setTagContext({...tagContext, tags: response.data.tags})
            setCategories(response.data.categories)
        })
        Repository.getTransactions(authContext, (response) => {
            setTransactions(transformTransactionData(response.data))
        })
    }, [])

    return (
        <motion.div layout="position" className="page tags">
            <TagContext.Provider value={{tagContext, setTagContext}}>
                <FilterContext.Provider value={{filter, setFilter}}>

                    <div className="card scroll">
                        <div className="row">
                            <h1>Tags</h1>
                            <div className="spacer"/>
                            <button onClick={() => setAddModalVisible(true)}><Icon name='add'/></button>
                            <Modal visible={addModalVisible} setVisible={setAddModalVisible}>
                                <div className="tagHeader">
                                    <img src={newTagIcon.includes('.svg') ? newTagIcon : tagIconUrl}/>
                                    <h2>{newTagName === '' ? 'New Tag' : newTagName}</h2>
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
                        <TagList tags={tagContext.tags}
                                 editable={true}
                                 tagOnClick={(event, tag) => {
                                     setSelectedTag(tag)
                                 }}/>
                    </div>

                    <TransactionsContext.Provider value={{transactions, setTransactions}}>
                        <TagDetails tag={selectedTag} setTag={setSelectedTag} categories={categories}/>
                    </TransactionsContext.Provider>

                </FilterContext.Provider>
            </TagContext.Provider>
        </motion.div>
    )

}
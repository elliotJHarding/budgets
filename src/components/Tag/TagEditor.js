import React, {useContext, useEffect, useState} from "react";
import TagList from "./TagList";
import {FilterContext, TagContext, TransactionsContext} from "../Transactions/Transactions";
import './Tag.css'
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";
import TagDetails from "./TagDetails";
import Icon from "../Common/Icon";
import {motion} from "framer-motion";

export default function TagEditor(props) {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [tagContext, setTagContext] = useState({
        filter: '',
        tags: [],
        selectedTransaction: null
    })

    const [transactions, setTransactions] = useState([])

    const [selectedTag, setSelectedTag] = useState(null);

    const [newTagName, setNewTagName] = useState('')
    const [newTagIcon, setNewTagIcon] = useState('')


    const addTag = async () => {
        axios
            .put(
                Config.Endpoints.Tags,
                {
                    name: newTagName,
                    icon: newTagIcon
                },
                { headers: authContext.header() }
            )
            .then()
            .catch(error => console.log(error))
    }

    const loadTags = async () => {
        axios
            .get(
                Config.Endpoints.Tags,
                {headers: authContext.header()}
            )
            .then((response) => {
                setTagContext({...tagContext, tags: response.data.tags})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadTransactions = async () => {
        axios
            .get(
                Config.Endpoints.Transactions.get,
                {headers: authContext.header()}
            )
            .then((response) => {
                setTransactions(transformTransactionData(response.data))
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

        return transactions
    }

    const getParentTags = (tags) => tags.map(tag => {return({...tag, childTags: []})})


   useEffect(() => {
       loadTags();
       loadTransactions();
   }, [])

   return (
      <motion.div layout="position" className="page tags">
         <TagContext.Provider value={{tagContext, setTagContext}}>

             <div className="card scroll">
                 <h1>Tags</h1>
                 <div className="newTag inputRow">
                     <input placeholder='Name' onChange={e => setNewTagName(e.target.value)}/>
                     <input placeholder='Icon' onChange={e => setNewTagIcon(e.target.value)}/>
                     <button className='hover' onClick={addTag}>
                         <Icon name='add'/>
                     </button>
                 </div>
                 <TagList tags={tagContext.tags}
                          editable={true}
                          tagOnClick={(event, tag) => {
                              setSelectedTag(tag)
                          }}/>
             </div>
             <TransactionsContext.Provider value={{transactions, setTransactions}}>
                 <TagDetails tag={selectedTag} setTag={setSelectedTag}/>
             </TransactionsContext.Provider>

         </TagContext.Provider>
   </motion.div>
   )

}
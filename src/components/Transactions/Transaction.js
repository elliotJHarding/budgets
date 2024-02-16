import React, {useContext} from "react";
import './Transactions.css'
import {motion} from "framer-motion";
import Tag from "../Tag/Tag";
import {TagContext} from "./Transactions";
import Icon from "../Common/Icon";
import AccountLogo from "../Accounts/AccountLogo";


export default function Transaction({transaction}) {

    const {tagContext, setTagContext} = useContext(TagContext);

    const select = () => {
        let transactionSelected = tagContext.selectedTransactions.includes(transaction.transactionId)
        if (transactionSelected) {
            setTagContext({...tagContext, selectedTransactions: tagContext.selectedTransactions.filter(id => id !== transaction.transactionId)})
        } else {
            setTagContext({...tagContext, selectedTransactions: tagContext.selectedTransactions.concat(transaction.transactionId)})
        }
    }

    return (
        <div key={transaction.transactionId} className={`transaction ${tagContext.selectedTransactions.includes(transaction.transactionId) ? 'selected' : ''}`} onClick={select}>
            <AccountLogo url={transaction.logo} colour={transaction.colour}/>
            <p>{transaction.reference}</p>
            {/*<p>{transaction.bookingDateTime}</p>*/}
            <div className="spacer"></div>
            {transaction.holiday != null && <div className="tagChip holiday"><Icon name="travel"/><p>{transaction.holiday.name}</p></div>}
            <Tag tag={transaction.tag} transactionId={transaction.transactionId}/>
            <p className='sign'>{parseFloat(transaction.value.amount) > 0 ? '+': '-'}</p>
            <p className={`value ${transaction.value.amount > 0 ? 'positive': 'negative'}`}>{`£${Math.abs(transaction.value.amount).toFixed(2)}`}</p>
        </div>
    )
}
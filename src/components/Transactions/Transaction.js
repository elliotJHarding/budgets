import React, {useContext} from "react";
import './Transactions.css'
import {motion} from "framer-motion";
import Tag from "../Tag/Tag";
import {TagContext} from "./Transactions";


export default function Transaction(props) {

    const {tagContext, setTagContext} = useContext(TagContext);
    return (
        <div key={props.transaction.transactionId} className={`transaction ${tagContext.selectedTransaction == props.transaction.transactionId ? 'selected' : ''}`} onClick={() => {setTagContext({...tagContext, selectedTransaction: props.transaction.transactionId})}}>
            <img className="logo" src={props.transaction.logo}/>
            <p>{props.transaction.reference}</p>
            {/*<p>{props.transaction.bookingDateTime}</p>*/}
            <div className="spacer"></div>
            <Tag tag={props.transaction.tag} transactionId={props.transaction.transactionId}/>
            <p className='sign'>{parseFloat(props.transaction.value.amount) > 0 ? '+': '-'}</p>
            <p className={`value ${props.transaction.value.amount > 0 ? 'positive': 'negative'}`}>{`£${Math.abs(props.transaction.value.amount).toFixed(2)}`}</p>
        </div>
    )
}
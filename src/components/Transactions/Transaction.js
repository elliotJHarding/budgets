import React from "react";
import './Transactions.css'
import {motion} from "framer-motion";


export default function Transaction(props) {

    return (
        <div key={props.transaction.id} className="transaction">
            <img src={props.transaction.logo}/>
            <p>{props.transaction.reference}</p>
            {/*<p>{props.transaction.bookingDateTime}</p>*/}
            <div className="spacer"></div>
            <p className='sign'>{parseFloat(props.transaction.value.amount) > 0 ? '+': '-'}</p>
            <p className={`value ${props.transaction.value.amount > 0 ? 'positive': 'negative'}`}>{`£${Math.abs(props.transaction.value.amount).toFixed(2)}`}</p>
        </div>
    )
}
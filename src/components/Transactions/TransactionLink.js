import React from "react";
import './Transactions.css'
import {motion} from "framer-motion";


export default function TransactionLink(props) {
    const arrow = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/chevron_right/default/48px.svg"
    return (
        <div key={props.link.id} className="transaction link">
            <img className="logo" src={props.link.from_logo}/>
            <img src={arrow}/>
            <img className="logo" src={props.link.to_logo}/>
            <p>{props.link.reference}</p>
            <div className="spacer"></div>
            <p className={`value`}>{`£${props.link.amount.toFixed(2)}`}</p>
        </div>
    )
}
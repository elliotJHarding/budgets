import React from "react";
import './Transactions.css'
import {motion} from "framer-motion";
import AccountLogo from "../Accounts/AccountLogo";


export default function TransactionLink({link}) {
    const arrow = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/chevron_right/default/48px.svg"
    return (
        <div key={link.id} className="transaction link">
            <AccountLogo url={link.from_logo} colour={link.from_colour}/>
            <img src={arrow}/>
            <AccountLogo url={link.to_logo} colour={link.to_colour}/>
            <p>{link.reference}</p>
            <div className="spacer"></div>
            <p className={`value`}>{`£${link.amount.toFixed(2)}`}</p>
        </div>
    )
}
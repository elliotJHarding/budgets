import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import Account from "./Account";
import {motion} from "framer-motion";

export default function AccountList(props) {

    const accountItems = props.accounts.map((account) => {
        return (<Account account={account}/>)
    })

    return (
        <motion.div layout className="accountList-container">
            <div className="accountList">{accountItems}</div>
        </motion.div>
    )
}



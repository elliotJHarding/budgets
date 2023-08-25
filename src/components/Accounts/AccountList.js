import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import Account from "./Account";
import {motion} from "framer-motion";
import {BarLoader} from "react-spinners";

export default function AccountList(props) {

    const accountItems = props.accounts.map((account) => {
        return (<Account key={account.id} account={account}/>)
    })

    return (
        <motion.div layout className="accountList-container">
            <div className="accountList">
                <BarLoader className="loader" loading={props.loading}/>
                {accountItems}
            </div>
        </motion.div>
    )
}



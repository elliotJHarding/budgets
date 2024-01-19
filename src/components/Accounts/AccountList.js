import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import Account from "./Account";
import {motion} from "framer-motion";
import {BarLoader} from "react-spinners";

export default function AccountList({loading, accounts}) {

    const accountItems = accounts.map((account) => {
        return (<Account key={account.id} account={account}/>)
    })

    return (
        <motion.div layout className="accountList-container">
            <div className="accountList">
                <BarLoader className="loader" loading={loading}/>
                {accountItems}
            </div>
        </motion.div>
    )
}



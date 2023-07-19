import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {motion} from "framer-motion";
import LinkedAccount from "./LinkedAccount";
import {Link} from "react-router-dom";

export default function LinkedAccountList(props) {
    const accountItems = props.accounts.map((account) => {
        return (<LinkedAccount account={account}/>)
    })

    return (
        <motion.div layout className="accountList-container">
            <p>Linked Accounts</p>
            <div className="linkedAccountList">
                {accountItems}
                <Link to="/bankselect">
                    <div className="add-account">
                        <span className="material-symbols-outlined">add</span>
                        <p>Account</p>
                    </div>
                </Link>
            </div>
        </motion.div>
    )
}

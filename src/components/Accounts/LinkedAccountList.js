import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {motion} from "framer-motion";
import LinkedAccount from "./LinkedAccount";
import {Link} from "react-router-dom";

export default function LinkedAccountList({accounts, updateAction}) {
    const accountItems = accounts.map((account) => {
        return (<LinkedAccount account={account}/>)
    })

    return (
        <motion.div layout='position' className="accountList-container column gap">
            <p>Linked Accounts</p>
            <div className="row gap">
                <Link to="/bankselect">
                    <div className="add-account">
                        <span className="material-symbols-outlined">add</span>
                        <p>Account</p>
                    </div>
                </Link>
                <div className="add-account" onClick={updateAction}>
                    <span className="material-symbols-outlined">sync</span>
                    <p>Update</p>
                </div>
            </div>
            <table className="linkedAccountList rounded">
                {accountItems}
            </table>
        </motion.div>
    )
}

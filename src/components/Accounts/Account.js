import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {FilterContext} from "../Transactions/Transactions";
import AccountLogo from "./AccountLogo";


export default function Account({account}) {
    const {filter, setFilter} = useContext(FilterContext)

    const isDisabled = () => !filter.activeAccounts.includes(account.accountId) && filter.activeAccounts.length > 0;

    const accountOnClick = (event) => {
        if (!filter.activeAccounts.includes(account.accountId)) {
            setFilter({...filter, activeAccounts: filter.activeAccounts.concat([account.accountId])})
        } else {
            setFilter({...filter, activeAccounts: filter.activeAccounts.filter(accountId => accountId !== account.accountId)})
        }
    }




    return (
        <div className="row gap">
            <div className={`account ${isDisabled() ? 'disabled': ''}`} onClick={accountOnClick}>
                <div className="info">
                    <AccountLogo url={account.logo} colour={account.colour}/>
                    <div className="details">
                        <p>{account.name}</p>
                        <p>{account.bankName}</p>
                    </div>
                </div>
                <div className={`balance ${account.balance < 0 ? 'negative': 'positive'}`}>
                    <p>{`£${Math.abs(account.balance).toFixed(2)}`}</p>
                </div>
            </div>
        </div>
)
}

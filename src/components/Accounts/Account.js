import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {FilterContext} from "../Transactions/Transactions";


export default function Account(props) {
    const {filter, setFilter} = useContext(FilterContext)

    const isDisabled = () => !filter.activeAccounts.includes(props.account.accountId) && filter.activeAccounts.length > 0;

    const accountOnClick = (event) => {
        if (!filter.activeAccounts.includes(props.account.accountId)) {
            setFilter({...filter, activeAccounts: filter.activeAccounts.concat([props.account.accountId])})
        } else {
            setFilter({...filter, activeAccounts: filter.activeAccounts.filter(accountId => accountId != props.account.accountId)})
        }
    }

    return (
        <div className={`account ${isDisabled() ? 'disabled': ''}`} onClick={accountOnClick}>
            <div className="info">
                <img src={props.account.logo}/>
                <div className="details">
                    <p>{props.account.name}</p>
                    <p>{props.account.bankName}</p>
                </div>
            </div>
            <div className="balance">
                <p>{`£${Math.abs(props.account.balance).toFixed(2)}`}</p>
            </div>
        </div>
    )
}

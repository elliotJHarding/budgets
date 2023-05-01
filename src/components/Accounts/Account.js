import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {FilterContext} from "../Transactions/Transactions";


export default function Account(props) {
    const [disabled, setDisabled] = useState(false)

    const {filter, setFilter} = useContext(FilterContext)

    const accountOnClick = (event) => {
        if (disabled) {
            setFilter({...filter, activeAccounts: filter.activeAccounts.concat([props.account.accountId])})
        } else {
           setFilter({...filter, activeAccounts: filter.activeAccounts.filter(accountId => accountId != props.account.accountId)})
        }
        setDisabled(!disabled)

    }

    return (
        <div className={`account ${disabled ? 'disabled': ''}`} onClick={accountOnClick}>
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

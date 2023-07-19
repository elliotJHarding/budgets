import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'



export default function LinkedAccount(props) {

    return (
        <div className={`account-linked`}>
            <div className="info">
                <img src={props.account.logo}/>
                <div className="details">
                    <p>{props.account.name}</p>
                    <p>{props.account.bankName}</p>
                </div>
            </div>
        </div>
    )
}

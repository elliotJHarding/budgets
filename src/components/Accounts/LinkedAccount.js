import React, {Component, useContext, useEffect, useState} from "react";
import './Accounts.css'
import {AuthContext} from "../Auth/AuthContext";
import {Repository} from "../../Repository";
import Icon from "../Common/Icon";

export default function LinkedAccount({account}) {

    const {authContext, setAuthContext} = useContext(AuthContext)

    const createRequisition = async () => {
        Repository.createRequisition(account.bankCode, authContext, response => {
            window.location.href = response.data.link
        })
    }

    const relink = <button className="row gap" onClick={createRequisition}><Icon name={account.expired ? 'sync_problem' : 'sync'}/>Relink</button>
    const expiry = <p>{account.expires}</p>

    return (
        <tr>
            <td>
                <img src={account.logo}/>
            </td>
            <td>
                <p>{account.name}</p>
            </td>
            <td>
                <p>{account.bankName}</p>
            </td>
            <td>
                <div className="row gap">
                    <span className="material-symbols-outlined">{account.expired ? 'warning' : 'timer'}</span>
                    {expiry}
                </div>
            </td>
            <td>
                {relink}
            </td>
        </tr>

)
}

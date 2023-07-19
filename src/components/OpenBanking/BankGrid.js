import React from 'react'
import Bank from "./Bank";

export default function BankGrid(props) {
    const banks = props.banks.map(bank => {
        return <Bank bank={bank} selected={props.selectedBank != null && bank.code == props.selectedBank.code} setSelected={props.setSelected} />
    })

    return(
        <div className="bank-grid">
            {banks}
        </div>
    )
}
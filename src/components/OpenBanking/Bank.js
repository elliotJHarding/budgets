import React, {useState} from 'react'
import './BankSelect.css'

export default function Bank(props) {


    return(
        <div className={`bank card ${props.selected ? 'selected' : ''}`} onClick={() => props.setSelected(props.bank)}>
            <img src={props.bank.logo}/>
            <p>{props.bank.name}</p>
        </div>
    )
}
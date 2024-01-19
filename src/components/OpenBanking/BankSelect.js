import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";
import {useNavigate} from "react-router-dom";
import Bank from "./Bank";
import BankGrid from "./BankGrid";
import {Repository} from "../../Repository";

export default function BankSelect(props) {
    const {authContext, setAuthContext} = useContext(AuthContext)
    const token = authContext.token
    const authorized = authContext.authorized()

    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);
    const [selected, setSelected] = useState(null);

    const createRequisition = async () => {
        Repository.createRequisition(selected.code, authContext, response => {
            window.location.href = response.data.link
        })
    }

    useEffect(() => {
        if (authorized) {
            Repository.getBanks(authContext, response => {
                setBanks(response.data.institutions)
            })
        } else {
            navigate('/login')
        }
    }, [])

    return(
        <div className="page">
            {selected != null ? <div className="row"><img className="logo" src={selected.logo}/><h1>{selected.name}</h1><div style={{flexGrow: 1}}/><button onClick={createRequisition}>Next</button></div> : <h1>Select a Bank</h1>}
            <BankGrid banks={banks} selectedBank={selected} setSelected={setSelected}/>
        </div>
    )
}
import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";
import {useNavigate} from "react-router-dom";
import Bank from "./Bank";
import BankGrid from "./BankGrid";

export default function BankSelect(props) {
    const {authContext, setAuthContext} = useContext(AuthContext)
    const token = authContext.token
    const authorized = authContext.authorized()

    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);
    const [selected, setSelected] = useState(null);

    const createRequisition = async () => {
        axios
            .post(
                Config.Endpoints.Requisition,
                {
                    "bankCode": selected.code
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )
            .then(response => {
                window.location.href = response.data.link
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getBanks = async () => {
        axios
            .get(
                Config.Endpoints.Banks,
                {
                    headers: {
                        Authorization: `Token ${token}`
                }
            })
            .then(response => {
                setBanks(response.data.institutions)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (authorized) {
            getBanks()
        } else {
            navigate('/login')
        }
    }, [])

    return(
        <div className="page">
            {selected != null ? <div className="row"><img className="logo" src={selected.logo}/><h1>{selected.name}</h1><div style={{flexGrow: 1}}/><button onClick={() => createRequisition()}>Next</button></div> : <h1>Select a Bank</h1>}
            <BankGrid banks={banks} selectedBank={selected} setSelected={setSelected}/>
        </div>
    )
}
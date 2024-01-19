import React, {useCallback, useContext, useEffect, useState} from 'react'
import './User.css'
import {AuthContext} from "../AuthContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import LinkedAccountList from "../../Accounts/LinkedAccountList";
import {Repository} from "../../../Repository";


export default function User() {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const authorized = authContext.authorized();

    const updateAccounts = async () => {
        Repository.updateAccounts(authContext, response => {
            navigate('/user')
        })
    }

    useEffect(() => {
        console.log(authContext)
        if (authorized) {
            Repository.getProfileData(authContext, response => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setLinkedAccounts(response.data.accounts)
            })

            let ref = searchParams.get("ref")
            if (ref != null) {
                let error = searchParams.get("error")
                if (error != null && error === 'UserCancelledSession') {
                    Repository.deleteRequisition(authContext, ref)
                } else {
                    Repository.updateRequisition(authContext, ref, () => updateAccounts())
                }
            }

        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div className="page column gap">
            <h1>Hello {firstName} {lastName}</h1>
            <LinkedAccountList accounts={linkedAccounts} updateAction={updateAccounts}/>
        </div>
    );
}
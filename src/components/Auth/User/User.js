import React, {useCallback, useContext, useEffect, useState} from 'react'
import './User.css'
import Config from "../../../Config";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import {redirect, useNavigate, useNavigation, useSearchParams} from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import LinkedAccountList from "../../Accounts/LinkedAccountList";


export default function User() {
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const authorized = authContext.authorized();

    const updateAccounts = async () => {
        axios
            .get(
                Config.Endpoints.UpdateAccounts,
                {
                    headers:authContext.header()
                }
            )
            .then(response => {
               navigate('/user')
            })
    }

    const updateRequisition = async (clientReference) => {
        axios({
            method: 'PATCH',
            url: Config.Endpoints.Requisition,
            headers: authContext.header(),
            data: {"clientRef": clientReference, "status": "ACTIVE"}
        })
        .then(response => {
            console.log(`Successfully updated requisition with id: ${clientReference}`)
            updateAccounts()
        })
        .catch(error => {
            console.log(`Error updating requisition with id: ${clientReference}`)
            console.log(error)
        })
    }

    const deleteRequisition = async (clientReference) => {
        axios({
            method: 'DELETE',
            url: Config.Endpoints.Requisition,
            headers: authContext.header(),
            data: {clientRef: clientReference}
        })
        .then(response => console.log(`Successfully deleted requisition with id: ${clientReference}`))
        .catch(error => {
            console.log(`Error deleting requisition with id: ${clientReference}`)
            console.log(error)
        })
    }

    const getProfileData = async () => {
       axios
           .get(
               Config.Endpoints.ProfileData,
               {
                   headers: authContext.header()
               }
           )
           .then(response => {
               setFirstName(response.data.firstName)
               setLastName(response.data.lastName)
               setLinkedAccounts(response.data.accounts)
           })
           .catch((error) => {
               console.log(error)
           });
    }

    useEffect(() => {
        console.log(authContext)
        if (authorized) {
            getProfileData()

            let ref = searchParams.get("ref")
            if (ref != null) {
                let error = searchParams.get("error")
                if (error != null && error == 'UserCancelledSession') {
                    deleteRequisition(ref)
                } else {
                    updateRequisition(ref)
                }
            }

        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <h1>Hello {firstName} {lastName}</h1>
            <LinkedAccountList accounts={linkedAccounts}/>
        </div>
    );
}
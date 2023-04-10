import React, {useCallback, useContext, useEffect, useState} from 'react'
import './User.css'
import Config from "../../../Config";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import {redirect, useNavigate, useNavigation} from "react-router-dom";
import NavBar from "../../NavBar/NavBar";


export default function User() {
    const {authContext, setAuthContext} = useContext(AuthContext);
    const navigate = useNavigate();
    const authorized = authContext.authorized();
    const token = authContext.token

    const getProfileData = async () => {
       axios
           .get(
           Config.Endpoints.ProfileData,
           {
               headers: {
                   Authorization: `Token ${token}`
               }
           })
           .then((response) => {
               console.log(response)
           })
           .catch((error) => {
               console.log(error)
           });
    }

    useEffect(() => {
        console.log(authContext)
        if (authorized) {
            getProfileData()
        } else {
            console.log("not Authorized")
        }
    })



    return (
        <div>
            <h1>User</h1>
        </div>
    );
}
import React, {Component, useContext, useEffect, useState} from "react";
import './Reports.css'
import YearlyReports from "./YearlyReports";
import {motion} from "framer-motion";
import {AuthContext} from "../Auth/AuthContext";
import {Repository} from "../../Repository";


export default function Reports(props) {

    const {authContext, _ } = useContext(AuthContext)

    useEffect(() => {
        Repository.getReports(authContext, response => setReports(response.data))
    }, [])

    const [reports, setReports] = useState({})

    return (
       <motion.div className="page reports">
            <YearlyReports reports={reports}/>
       </motion.div>
    )
}


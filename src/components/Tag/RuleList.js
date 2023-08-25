import React, {useContext} from "react";
import {motion} from "framer-motion";
import './Tag.css'
import RuleItem from "./RuleItem";
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";



export default function RuleList({rules}) {
    const ruleItems = rules
        .map(rule => <RuleItem key={rule.id} rule={rule}/>);

    const {authContext, setAuthContext} = useContext(AuthContext);

    return (
        <motion.div layout="position" className={`tagList`}>{ruleItems}</motion.div>
    )
}

import React, {useContext} from "react";
import './Transactions.css'
import {motion} from "framer-motion";
import {TagContext} from "./Transactions";


export default function Modal(props) {

    const {tagContext, setTagContext} = useContext(TagContext);

    return (
        <div className={`modal__background ${tagContext.tagModalVisible ? '': 'hidden'}`} onClick={() => setTagContext({...tagContext, tagModalVisible: false})}>
            {children}
        </div>
    )

}
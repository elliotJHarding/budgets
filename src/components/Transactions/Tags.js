import React, {useContext} from "react";
import './Transactions.css'
import {motion} from "framer-motion";
import {TagContext} from "./Transactions";
import TagList from "../Tag/TagList";
import Icon from "../Common/Icon";


export default function Tags(props) {

    const {tagContext, setTagContext} = useContext(TagContext);

    return (
        <motion.div layout="position" className="card tagCard">
            <div className="search--container">
                <Icon name="label"/>
                <input placeholder="Search tags" onInput={e => setTagContext({...tagContext, filter: e.target.value})}/>
            </div>
            <TagList filter={tagContext.filter} display={tagContext.filter.length > 0}/>
        </motion.div>
    )
}
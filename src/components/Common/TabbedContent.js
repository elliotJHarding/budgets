import React, {Component, useState} from "react";
import Tab from "./Tab";
import {motion} from "framer-motion";



export default function TabbedContent({children, tabs, defaultSelected}) {

    const [selected, setSelectedTab] = useState(defaultSelected != null ? defaultSelected: 0)
    const tabItems = tabs.map(tab => <Tab text={tab.text} selected={tab.id === selected} onClick={() => setSelectedTab(tab.id)}/>)
    const content = tabs.find(tab => tab.id === selected).content;

    return (
        <motion.div className="tabbed-content">
            <div className="tabs">
                {tabItems}
            </div>
            <hr/>
            <div className="content">
                {content}
            </div>
        </motion.div>
    )
}
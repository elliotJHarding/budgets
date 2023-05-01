import React, {Component, useContext, useEffect, useState} from "react";
import "./Transactions.css"
import {motion} from "framer-motion";
import {FilterContext} from "./Transactions";

export default function TransactionFilter(props) {

    const {filter, setFilter} = useContext(FilterContext);

    return (
        <motion.div layout className="transactionFilter-container">
            <div className="transactionFilters card">
                <div className="inOutFilter">
                    <button className={filter.inOut == 0 ? "primary" : ''} onClick={event => setFilter({...filter, inOut: 0})}>All</button>
                    <button className={filter.inOut > 0 ? "positive" : ''} onClick={event => setFilter({...filter, inOut: 1})}>In</button>
                    <button className={filter.inOut < 0 ? "negative" : ''} onClick={event => setFilter({...filter, inOut: -1})}>Out</button>
                </div>
                <div className="valueFilter">
                    <input placeholder="min" type={"number"} onInput={event =>  setFilter({
                        ...filter,
                        value: {...filter.value, min: event.target.value == 0 ? null : event.target.value}
                    })}/>
                    <p>to</p>
                    <input placeholder="max" type={"number"} onInput={event => setFilter({
                        ...filter,
                        value: {...filter.value, max: event.target.value == 0 ? null : event.target.value}
                    })}/>
                </div>
            </div>
        </motion.div>
    )
}



import React, {Component, useContext, useEffect, useState} from "react";
import './Transactions.css'
import Transaction from "./Transaction";
import { motion } from "framer-motion";
import TransactionLink from "./TransactionLink";


export default function TransactionList(props) {

    const addDateItems = (transactionList) => {
        let result = []
        let date = null;
        let month = null;
        for (let i = 0; i < transactionList.length; i++) {
            const excludeTypes = ['TRANSACTION', 'LINK']
            if (!excludeTypes.includes(transactionList[i].itemType)) {
                break;
            }

            if (month == null) {
                month = new Date(transactionList[i].bookingDate).getMonth();
                result.push({itemType: 'MONTH_HEADER', month: month})
            } else {
                let transactionMonth = new Date(transactionList[i].bookingDate).getMonth()

                if (transactionMonth != month) {
                    month = transactionMonth;
                    result.push({itemType: 'MONTH_HEADER', month: month})
                }
            }

            if (date == null) {
                date = new Date(transactionList[i].bookingDate)
                result.push({itemType: 'DATE_HEADER', date: date})
            } else {
                let transactionDate = new Date(transactionList[i].bookingDate)

                if (transactionDate.toDateString() != date.toDateString()) {
                    date = transactionDate
                    result.push({itemType: 'DATE_HEADER', date: date})
                }
            }

            result.push(transactionList[i])
        }
        return result
    }

    const transactionItems = addDateItems(props.transactions).map(transactionItem => {
       switch (transactionItem.itemType) {
           case 'TRANSACTION':
               return(<Transaction transaction={transactionItem}/>)
           case 'DATE_HEADER':
               return(<DateHeader date={transactionItem.date}/>)
           case 'MONTH_HEADER':
               return(<MonthHeader month={transactionItem.month}/>)
           case 'LINK':
               return(<TransactionLink link={transactionItem}/>)
       }

    }
)

    return (
        <motion.div layout="position" className="transactionList-container">
            { transactionItems.length > 0 && <div className="transactionList">{transactionItems}</div> }
            { transactionItems.length == 0 && <p className="noTransactions">No matching transactions...</p> }
        </motion.div>
    )
}

function DateHeader(props) {
    const d = props.date
    return (
        <div className="date-header">
            <p>{`${d.toDateString()}`}</p>
        </div>
    )
}

function MonthHeader(props) {
    const m = props.month
    return (
        <div className="month-header">
            <p>{`${new Date(2000, m, 1).toLocaleDateString('en-gb', {month: 'long'})}`}</p>
        </div>
    )
}



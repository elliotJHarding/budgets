import React, {useContext, useEffect, useState} from "react";
import './Transactions.css'
import {BarLoader} from "react-spinners";
import Transaction from "./Transaction";
import {motion} from "framer-motion";
import TransactionLink from "./TransactionLink";
import Icon from "../Common/Icon";
import Modal from "../Common/Modal";
import {TagContext, TransactionsContext} from "./Transactions";
import HolidayList from "../Holidays/HolidayList";
import {Repository} from "../../Repository";
import {AuthContext} from "../Auth/AuthContext";


function updateTransaction(transactions, transactionIds, holidays, holidayId) {

    let new_transactions = transactions.filter(transaction => !transactionIds.includes(transaction.transactionId));
    let transaction_list = transactionIds.map(transactionId => transactions.find(transaction => transaction.transactionId === transactionId));
    let holidays_flat = holidays.flatMap(holidayYear => holidayYear.holidays)
    transaction_list.forEach(transaction => transaction.holiday = holidays_flat.find(holiday => holiday.id === holidayId));
    transaction_list.forEach(transaction => new_transactions.push(transaction));
    return new_transactions;
}

export default function TransactionList({transactions, setTransactions, loading}) {

    const {tagContext, setTagContext} = useContext(TagContext);
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [holidayModalVisible, setHolidayModalVisible] = useState(false)

    const [holidayYears, setHolidayYears] = useState([])

    useEffect(() => {
        Repository.loadHolidays(authContext, (response) => {
            setHolidayYears(response.data.holidays)
        })

    }, [])

    const setTransactionsHoliday = (transactionIds, holidayId)  => {
        console.log(transactionIds)
        const tagUpdates = transactionIds.map(transactionId => {
            let tagUpdate = {};
            tagUpdate.transactionId = transactionId
            tagUpdate.holidayId = holidayId
            return tagUpdate
        })
        Repository.updateTransactions(authContext, tagUpdates)
    }

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

                if (transactionMonth !== month) {
                    month = transactionMonth;
                    result.push({itemType: 'MONTH_HEADER', month: month})
                }
            }

            if (date == null) {
                date = new Date(transactionList[i].bookingDate)
                result.push({itemType: 'DATE_HEADER', date: date})
            } else {
                let transactionDate = new Date(transactionList[i].bookingDate)

                if (transactionDate.toDateString() !== date.toDateString()) {
                    date = transactionDate
                    result.push({itemType: 'DATE_HEADER', date: date})
                }
            }

            result.push(transactionList[i])
        }
        return result
    }

    const transactionItems =  addDateItems(transactions).map(transactionItem => {
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
    })

    const selected =
        <div className="row gap">
            <p>{tagContext.selectedTransactions.length} Selected</p>
            <button onClick={() => setTagContext({...tagContext, selectedTransactions: []})}><Icon name="clear"/></button>
        </div>

    return (
        <motion.div layout="position" className="transactionList-container">
            <div className="trans-actions row gap">
                {tagContext.selectedTransactions.length > 0 && selected}
                <button onClick={() => setHolidayModalVisible(true)}><Icon name="travel"/></button>
                <Modal visible={holidayModalVisible} setVisible={setHolidayModalVisible}>
                    <HolidayList holidays={holidayYears}
                    holidayOnClick={(event, holiday) => {
                        event.stopPropagation()
                        setHolidayModalVisible(false)
                        setTransactions(updateTransaction(transactions, tagContext.selectedTransactions, holidayYears, holiday.id))
                        setTransactionsHoliday(tagContext.selectedTransactions, holiday.id)
                    }}/>
                </Modal>
                <button><Icon name="link"/></button>
            </div>
            { transactionItems.length > 0 && <div className="transactionList">{transactionItems}</div> }
            { transactionItems.length === 0 && !loading && <p className="noTransactions">No matching transactions...</p> }
            { loading && <BarLoader className="loader" loading={loading}/>}
        </motion.div>
    )
}

function DateHeader({date}) {
    return (
        <div className="date-header">
            <p>{`${date.toDateString()}`}</p>
        </div>
    )
}

function MonthHeader({month}) {
    return (
        <div className="month-header">
            <p>{`${new Date(2000, month, 1).toLocaleDateString('en-gb', {month: 'long'})}`}</p>
        </div>
    )
}



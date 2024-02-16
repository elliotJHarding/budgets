import React, {Component} from "react";
import './Reports.css'
import Months from "../../domain/Months";
import Icon from "../Common/Icon";

export default function MonthlyReport({month, report, selectedReport, setSelectedReport}) {

    const noReport = report == null;
    const noReportText = '----'

    const selected = report !== null && report === selectedReport;

    const handleClick = () => setSelectedReport(selectedReport === report ? null : report);

    return (
        <div onClick={handleClick} className={`monthly-report ${report == null ? 'disabled': '' } ${selected ? 'selected' : ''} ${Months.monthList[new Date().getMonth()] === month ? 'currentMonth' : '' }`}>
            <div className="row">
                <p>{month}</p>
                <div className="spacer"/>
                {<Icon name="label_off" />}
                {<p>{noReport ? '?' : report.untagged}</p>}
            </div>
            <div className="chip positive"><Icon name="stat_2"/><p>£{noReport ? noReportText : Math.round(Math.abs(report["INCOME"]["total"]))}</p></div>
            <div className="chip negative"><Icon name="stat_minus_2"/><p>£{noReport ? noReportText :  Math.round(Math.abs(report["SPEND"]["total"]))}</p></div>
            <div className="chip giving"><Icon name="volunteer_activism"/><p>£{noReport ? noReportText :  Math.round(Math.abs(report["GIVING"]["total"]))}</p></div>
            <div className="chip savings"><Icon name="savings"/><p>£{noReport ? noReportText : Math.round(Math.abs(report["SAVINGS"]["total"]))}</p></div>
            <div className="chip investments"><Icon name="trending_up"/><p>£{noReport ? noReportText :  Math.round(Math.abs(report["INVEST"]["total"]))}</p></div>
        </div>
    )
}


import React, {Component} from "react";
import './Reports.css'
import Report from "./Report";

export default function ReportList({reports}) {

    const reportItems = reports.map(report => <Report report={report}/>)

    return (
        <div className="reportList">
            {reportItems}
        </div>
    )
}
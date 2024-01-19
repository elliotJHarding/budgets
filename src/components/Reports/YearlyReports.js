import React, {Component, useState} from "react";
import './Reports.css'
import Report from "./Report";
import YearPicker from "../Common/YearPicker";

export default function YearlyReports({reports}) {

    const [year, setYear] = useState(parseInt(new Date(Date.now()).toLocaleDateString('en-gb', {year: 'numeric'})))

    return (
        <>
            <YearPicker selectedYear={year} setSelectedYear={setYear}/>
            {reports.hasOwnProperty(year.toString()) && <Report report={reports[year.toString()]}/>}
        </>
    )
}


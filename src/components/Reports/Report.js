import React, {Component, useState} from "react";
import './Reports.css'
import MonthlyReport from "./MonthlyReport";
import Months from "../../domain/Months";
import {ResponsiveStream} from '@nivo/stream'
import Breakdown from "./Breakdown";
export default function Report({report}) {

    const monthlyReports = Months.monthList.map(month =>
        <MonthlyReport month={month} report={month in report ? report[month]: null}/>);

    // const [selectedReport, setSelectedReport] = useState(report)
    const selectedReport = report

    const data = Months.monthList.map(month => {
        let hasData = month in report

        let result =             {
            "Spend": "",
            "Savings": "",
            "Income": "",
            "Investments": "",
            "Giving": "",
        }

        if (hasData) {
            let monthlyReport = report[month];
            let spend = Math.abs(monthlyReport["SPEND"]["total"]);
            let savings = Math.abs(monthlyReport["SAVINGS"]["total"]);
            let giving = Math.abs(monthlyReport["GIVING"]["total"]);
            let investments = Math.abs(monthlyReport["INVEST"]["total"]);
            let leftOverIncome = Math.round(monthlyReport["INCOME"]["total"] - (spend + savings + giving + investments));

            result = {
                "Spend": spend,
                "Savings": savings,
                "Income": leftOverIncome,
                "Investments": investments,
                "Giving": giving,
            }
        }

        return result;

    })

    return (
        <div className="column gap">
            <div className="report">
                <div className="chart">
                    <ResponsiveStream
                        data={data}
                        keys={["Spend", "Giving", "Savings", "Investments", "Income"]}
                        margin={{ top: 10, right: 60, bottom: 10, left: 60 }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendOffset: -40,
                            format: (value) => (`£${Number(value)}`),
                        }}
                        enableGridX={true}
                        enableGridY={false}
                        curve="linear"
                        offsetType="none"
                        colors={["rgba(255, 105, 97, 0.6)","#f3cd57", "#A7C7E7", "#C3B1E1", "rgba(119, 221, 119, 0.6)" ]}
                        fillOpacity={0.85}
                        borderColor={{ theme: 'background' }}
                        valueFormat={(value) => (`£${Number(value).toFixed(2)}`)}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#2c998f',
                                size: 4,
                                padding: 2,
                                stagger: true
                            },
                            {
                                id: 'squares',
                                type: 'patternSquares',
                                background: 'inherit',
                                color: '#e4c912',
                                size: 6,
                                padding: 2,
                                stagger: true
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'Paul'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Marcel'
                                },
                                id: 'squares'
                            }
                        ]}
                        dotSize={8}
                        dotColor={{ from: 'color' }}
                        dotBorderWidth={2}
                        dotBorderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.7
                                ]
                            ]
                        }}
                        legends={[
                        ]}
                    />
                </div>
                <div className="monthly-reports">
                    {monthlyReports}
                </div>
            </div>
            <Breakdown report={selectedReport}/>
        </div>
)
}

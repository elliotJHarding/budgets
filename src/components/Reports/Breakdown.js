import React, {Component} from "react";
import './Reports.css'
import MonthlyReport from "./MonthlyReport";
import Months from "../../domain/Months";
import Icon from "../Common/Icon";
import {ResponsiveSunburst, Sunburst} from "@nivo/sunburst";

export default function Breakdown({report}) {

    const transformReport = (node, name) => {
        let result = {}
        console.log(node)
        result.id = name
        result.value = node.total

        if (node.categories != null) {
            result.children = Object.values(node.categories).map(cat => transformReport(cat, cat.tag.name))
            result.value -= result.children.reduce((total, value) => total + value, 0)
        }

        return result;
    }

    const categories = ['SPEND', 'GIVING', 'SAVINGS', 'INVEST']
    const colors = ['rgba(255, 105, 97, 0.6)', '#f3cd57', '#A7C7E7', '#C3B1E1']
    const chartData = {
        id: 'out',
        children: Object.entries(report)
            .filter(entry => categories.includes(entry[0]))
            .map(entry => transformReport(entry[1], entry[0]))
            // .map(entry => {
            //     return {
            //         id: entry[0],
            //         value: entry[1].total,
            //         children: Object.entries(entry[1].categories).map(entry => {
            //             return {
            //                 id: entry[1].tag.name,
            //                 value: entry[1].total,
            //                 children: entry[1].categories == null ? null : Object.entries(entry[1].categories).map(entry => {
            //                     return {
            //                         id: entry[1].tag.name,
            //                         value:entry[1].total
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // })
    }

    console.log(chartData)

    return (
        <div className="">
            <div className="card row gap">
                <table className="column">
                    <tbody>
                    <tr>
                        <td><h3>Income</h3></td>
                        <td>
                            <div className="chip positive"><Icon name="stat_2"/>
                                <p>£{Math.round(Math.abs(report["INCOME"]["total"]))}</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>Spend</h3></td>
                        <td>
                            <div className="chip negative"><Icon name="stat_minus_2"/>
                                <p>£{Math.round(Math.abs(report["SPEND"]["total"]))}</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>Giving</h3></td>
                        <td>
                            <div className="chip giving"><Icon name="volunteer_activism"/>
                                <p>£{Math.round(Math.abs(report["GIVING"]["total"]))}</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>Savings</h3></td>
                        <td>
                            <div className="chip savings"><Icon name="savings"/>
                                <p>£{Math.round(Math.abs(report["SAVINGS"]["total"]))}</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>Invested</h3></td>
                        <td>
                            <div className="chip investments"><Icon name="trending_up"/>
                                <p>£{Math.round(Math.abs(report["INVEST"]["total"]))}</p></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Sunburst
                    data={chartData}
                    width={270} height={270}
                    cornerRadius={5}
                    valueFormat=" >-$,.2f"
                    colors={colors}
                    borderWidth={2}
                    borderColor={'rgba(0,0,0,0.05)'}
                    childColor={{
                        from: 'color',
                        modifiers: [['brighter', 0.2]]
                    }}
                />
            </div>
            <div className="card column">
                
            </div>
        </div>
    );
}

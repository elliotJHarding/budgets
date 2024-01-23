import React, {Component} from "react";
import './Reports.css'
import MonthlyReport from "./MonthlyReport";
import Months from "../../domain/Months";
import Icon from "../Common/Icon";
import {ResponsiveSunburst, Sunburst} from "@nivo/sunburst";

export default function Breakdown({report}) {

    const transformReportData = () => {
        let categories = ['SPEND', 'GIVING', 'SAVINGS', 'INVEST']
        let result = {
            id: 'out',
            children: Object.entries(report)
                .filter(entry => categories.includes(entry[0]))
                .map(entry => {
                    return {
                        id: entry[0],
                        value: entry[1].total,
                        children: Object.entries(entry[1].categories).map(entry => {
                            return {id: entry[1].tag.name, value: entry[1].total}
                        })
                    }
                })
        }

        console.log(result)
        return result;

    }

    return (
        <div className="card">
            <div className="row gap">
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
                    data={transformReportData()}
                    width={250} height={250}
                    cornerRadius={10}
                    valueFormat=" >-$,.2f"
                    childColor={{
                        from: 'color',
                        modifiers: [['brighter', 0.13]]
                    }}
                />
            </div>
        </div>
    );
}

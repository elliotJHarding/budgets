import React, {Component, useState} from "react";
import './Reports.css'
import MonthlyReport from "./MonthlyReport";
import Months from "../../domain/Months";
import Icon from "../Common/Icon";
import {ResponsiveSunburst, Sunburst} from "@nivo/sunburst";

export default function Breakdown({report}) {

    const transformReport = (node, name, color) => {
        let result = {}
        console.log(node)
        result.id = name
        result.value = node.total
        result.total = node.total
        result.color = color == null ? colors[categories.indexOf(name)] : color;

        if (node.categories != null) {
            result.children = Object.values(node.categories).map(cat => transformReport(cat, cat.tag.name, color))
            result.value -= result.children.reduce((total, child) => total + child.total, 0)
        }

        return result;
    }

    const getChartData = () => {
        return {
            id: 'out',
                children: Object.entries(report)
                .filter(entry => categories.includes(entry[0]))
                .map(entry => transformReport(entry[1], entry[0]))
        }
    }

    const categories = ['SPEND', 'GIVING', 'SAVINGS', 'INVEST']
    const colors = ['rgba(255, 105, 97, 0.6)', '#f3cd57', '#A7C7E7', '#C3B1E1']
    const [chartData, setChartData] = useState(getChartData())

    console.log(chartData)

    return (
        <div className="row gap">
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
                    valueFormat={(number) => number > 0 ? '' : '-' + '£' + Math.abs(number).toFixed(2)}
                    colors={colors}
                    borderWidth={2}
                    borderColor={'rgba(0,0,0,0.05)'}
                    // childColor={{
                    //     from: 'color',
                    //     modifiers: [['brighter', 0.2]]
                    // }}
                    onClick={(event) => event.data.children != null && setChartData(event.data)}
                />
            </div>
            <div className="card column gap">
                <table>
                    <tbody>

                {Object.entries(report["SPEND"]["categories"])
                    .sort((a,b) => a[1].total - b[1].total)
                    .slice(0, 5)
                    .map(x => x[1])
                    .map(row =>
                    <tr className="tag">
                        <td><img src={row.tag.icon}/></td>
                        <td><p>{row.tag.name}</p></td>
                        <td><p>£{Math.abs(row.total.toFixed(2))}</p></td>
                    </tr>
                )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

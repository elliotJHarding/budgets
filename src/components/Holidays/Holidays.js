import React, {Component, useContext, useEffect, useState} from "react";
import YearPicker from "../Common/YearPicker";
import './Holidays.css'
import {Repository} from "../../Repository";
import {AuthContext} from "../Auth/AuthContext";
import Icon from "../Common/Icon";
import { ResponsivePie } from '@nivo/pie'


export default function Holidays(props) {

    const {authContext, _} = useContext(AuthContext);

    const [year, setYear] = useState(parseInt(new Date(Date.now()).toLocaleDateString('en-gb', {year: 'numeric'})))

    const [holidayYears, setHolidayYears] = useState([
        {
            year: 2023,
            holidays: []
        }
    ])

    const holidayYear = holidayYears.find(hy => hy.year === year)

    useEffect(() => {
        Repository.loadHolidays(authContext, (response) => {
            setHolidayYears(response.data.holidays)
        })

    }, [])

    const formatDate = (date) => new Date(Date.parse(date)).toLocaleDateString('en-gb', {month:'short', day:'numeric'})

    const data = [
        {
            "id": "haskell",
            "label": "haskell",
            "value": 348,
            "color": "hsl(200, 70%, 50%)"
        },
        {
            "id": "erlang",
            "label": "erlang",
            "value": 366,
            "color": "hsl(10, 70%, 50%)"
        },
        {
            "id": "javascript",
            "label": "javascript",
            "value": 348,
            "color": "hsl(98, 70%, 50%)"
        },
        {
            "id": "css",
            "label": "css",
            "value": 594,
            "color": "hsl(258, 70%, 50%)"
        },
        {
            "id": "java",
            "label": "java",
            "value": 118,
            "color": "hsl(278, 70%, 50%)"
        }
    ]

    const holidayItems = holidayYear == null ? [] : holidayYear.holidays.map(holiday =>
        <div className="holiday column gap">
            <div className="column gap">
                <div className="row gap">
                    <p className="title">{holiday.name}</p>
                    <p className="dates">{formatDate(holiday.startDate)} - {formatDate(holiday.endDate)}</p>
                </div>
            </div>
            <div className="row gap">

                <img src={holiday.img}/>
                <div className="card">
                    <div className="chip negative big">
                        <Icon name="stat_minus_2"/>
                        <p>£{Math.abs(holiday.total)}</p>
                    </div>
                    <div className="chip big">
                        <Icon name="travel"/>
                        <p>£{Math.abs(holiday.travel)}</p>
                    </div>
                    <div className="chip big">
                        <Icon name="hotel"/>
                        <p>£{Math.abs(holiday.hotels)}</p>
                    </div>
                    <div className="chip big">
                        <Icon name="restaurant"/>
                        <p>£{Math.abs(holiday.food)}</p>
                    </div>
                </div>
            </div>
        </div>)

    return (
        <div className="page">
            <YearPicker selectedYear={year} setSelectedYear={setYear}/>
            <div className="column gap">
                {holidayItems}
            </div>

        </div>
    )
}

